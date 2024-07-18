import DOM from "../index";
import { toKebab, strToArr } from "./utils";

/**
 * Actual method for creating Element(s)
 * and Collect it into DOM Object
 * @param props
 * @param dom_
 */
function createElement(props: DOM | DOM.elementOptions, dom_?: DOM): DOM;
function createElement(props: DOM | DOM.svgElementOptions, dom_?: DOM): DOM;
function createElement(props: any, dom_?: DOM) {
    let _dom = dom_ ? dom_ : DOM.init();

    const element = (({ tag, namespace }) => {
        if (namespace) return document.createElementNS(namespace, tag ?? "div");
        return document.createElement(tag ?? "div");
    })(props);

    delete props.tag;

    _dom.unshift(element);

    return setProperties(props, _dom);
    // return _dom.setProperties(props);
}

/**
 * Method for geting Element(s)
 * and Collect it into DOM Object
 * @param query
 * @param dom_
 * @returns
 */
function getElement(query: string, dom_: DOM) {
    let _dom = dom_ ? dom_ : DOM.init();

    if (!_dom.first) {
        if (/^(?:document|window)$/g.test(query)) {
            return _dom.get(/^document$/g.test(query) ? document : window);
        }
    }

    if (_dom.first) return DOM.get(_dom.first.querySelectorAll(query));

    let res = document.querySelectorAll(query);
    if (!res.length) return _dom;

    res.forEach((node) => _dom.push(node));
    return _dom;
}

/**
 * Set properties for current HTML Element
 * @param props
 * @param dom
 */
function setProperties(props: DOM.elementOptions, dom: DOM) {
    let { namespace } = props;

    delete props.namespace;
    const setProp = (node: HTMLElement & HTMLTitleElement & Node & HTMLInputElement) => {
        for (const name in props) {
            if (props.hasOwnProperty(name)) {
                let val: any | null = props[name];
                if (!namespace) {
                    switch (name) {
                        case "text":
                            let text =
                                "innerText" in document
                                    ? ("innerText" as "innerText")
                                    : ("textContent" as "textContent");

                            node[text] = val ? val : node[name];
                            break;
                        case "html":
                            node.innerHTML = props[name] ? props[name] : node.innerHTML;
                            break;
                        case "class":
                            if (typeof val === "string" && !/ /g.test(val)) {
                                node.setAttribute(name, val);
                                break;
                            }
                        case "classid":
                        case "addClass":
                            let classes = val ? strToArr(val) : [];
                            if (classes.length > 1) {
                                for (let cls of classes) {
                                    node.classList.add(cls);
                                }
                            } else {
                                node.setAttribute(name, classes[0]);
                            }
                            break;
                        case "removeClass":
                            node.classList.remove(val);
                            break;
                        case "toggleClass":
                            node.classList.toggle(val);
                            break;
                        case "disabled":
                            node.disabled = val;
                            break;
                        case "append":
                            DOM.get(node).insertTo(val);
                            break;
                        case "prepend":
                            DOM.get(node).insertBefore(val, true);
                            break;
                        case "before":
                            DOM.get(node).insertBefore(val);
                            break;
                        case "after":
                            DOM.get(node).insertAfter(val);
                            break;
                        case "value":
                            node.value = val;
                            break;
                        case "dispatch":
                            node.dispatchEvent(val);
                            break;
                        case "replace":
                            DOM.get(node).replace(val);
                            break;
                        case "event":
                            if (val) {
                                for (const evName in val) {
                                    if (val.hasOwnProperty(evName)) {
                                        DOM.get(node).onEvent(evName, val[evName]);
                                    }
                                }
                            }
                            break;
                        case "callback":
                            if (val && typeof val === "function") {
                                val(node);
                            }
                            break;
                        case "readonly":
                        case "readOnly":
                            node.readOnly = val;
                            break;
                        default:
                            node.setAttribute(name, val);
                    }
                } else {
                    let key = name === "viewBox" ? name : toKebab(name);
                    node.setAttributeNS(null, key, val);
                }
            }
        }
    };

    if (dom.isEmpty) return dom;

    dom.forEach((e) => setProp(e));

    return dom;
}

/**
 * Set Element(s) styles. Can process multiple element
 * @param styles
 * @param dom
 */
function setStyles(styles: DOM.elementStyles, dom: DOM) {
    const setStyle = (node: HTMLElement | undefined, props: CSSStyleDeclaration) => {
        if (!node) return;
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                let val: any | null = props[key];
                switch (key) {
                    case "zIndex":
                        node.style.zIndex = val;
                        break;
                    case "margin":
                        node.style.margin = val;
                        break;
                    case "padding":
                        node.style.padding = val;
                        break;
                    case "display":
                        node.style.display = val;
                        break;
                    default:
                        node.style[key] = val;
                }
            }
        }
    };

    if (Array.isArray(styles)) {
        styles.forEach(({ elm, props }) => {
            setStyle(DOM.getFirst(elm), props);
        });

        return dom;
    }

    if (dom.isEmpty) return dom;

    dom.forEach((e) => setStyle(e, styles));

    return dom;
}

export { createElement, getElement, setProperties, setStyles };
