import DOM from "../index";
import { toKebab, strToArr } from "./utils";

/**
 * Actual method for creating Element(s)
 * and Collect it into DOM Object
 * @param {DOM | DOM.elementOptions | DOM.svgElementOptions} props
 * @param {DOM?} dom_
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
 * @param {string} query
 * @param {DOM} dom_
 * @returns
 */
function getElement(query: string, dom_: DOM) {
    let _dom = dom_ ? dom_ :  DOM.init();

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
 * @param {DOM.elementOptions} props
 * @param {DOM} dom
 */
function setProperties(props: DOM.elementOptions, dom: DOM) {
    let { namespace } = props;

    delete props.namespace;
    const setProp = (node: HTMLElement & HTMLTitleElement & Node & HTMLInputElement) => {
        for (const name in props) {
            if (props.hasOwnProperty(name)) {
                if (!namespace) {
                    let val: any | undefined = "";
                    switch (name) {
                        case "text":
                            let text =
                                "innerText" in document ? "innerText" : "textContent";
                                
                            val = props[name] as any;
                            node[name] = val ? val : node[name];
                            break;
                        case "html":
                            node.innerHTML = props[name] ? props[name] :  node.innerHTML;
                            break;
                        case "class":
                        case "classid":
                        case "addClass":
                            val = props[name];
                            let val2 = val ? strToArr(val) : [];

                            if (val2.length) {
                                for (let cls of val2) {
                                    node.classList.add(cls);
                                }
                            }
                            break;
                        case "removeClass":
                            val = props[name];
                            node.classList.remove(val);
                            break;
                        case "toggleClass":
                            val = props[name];
                            node.classList.toggle(val);
                            break;
                        case "disabled":
                            val = props[name];
                            node.disabled = val;
                            break;
                        case "append":
                            val = props[name];
                            DOM.get(node).insertTo(val);
                            break;
                        case "prepend":
                            val = props[name];
                            DOM.get(node).insertBefore(val, true);
                            break;
                        case "before":
                            val = props[name];
                            DOM.get(node).insertBefore(val);
                            break;
                        case "after":
                            val = props[name];
                            DOM.get(node).insertAfter(val);
                            break;
                        case "value":
                            node.value = props[name];
                            break;
                        case "dispatch":
                            node.dispatchEvent(props[name]);
                            break;
                        case "replace":
                            val = props[name];
                            DOM.get(node).replace(val);
                            break;
                        case "event":
                            val = props[name];
                            if(val){
                                for (const evName in val) {
                                    if (val.hasOwnProperty(evName)) {
                                        DOM.get(node).onEvent(evName, val[evName]);
                                    }
                                }
                            }
                            break;
                        case "callback":
                            if(props[name] && typeof props[name] === "function") {
                                props[name](node);
                            }
                            break;
                        case "readonly":
                        case "readOnly":
                            val = props[name];
                            node.readOnly = val;
                            break;
                        default:
                            val = props[name];
                            node.setAttribute(name, val);
                    }
                } else {
                    let key = name === "viewBox" ? name : toKebab(name);
                    node.setAttributeNS(null, key, props[name]);
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
 * @param {DOM.elementStyles} styles
 * @param {DOM} dom
 */
function setStyles(styles: DOM.elementStyles, dom: DOM) {
    const setStyle = (node: HTMLElement | undefined, props: CSSStyleDeclaration) => {
        if (!node) return dom;
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                switch (key) {
                    case "zIndex":
                        node.style.zIndex = props[key];
                        break;
                    case "margin":
                        node.style.margin = props[key];
                        break;
                    case "padding":
                        node.style.padding = props[key];
                        break;
                    case "display":
                        node.style.display = props[key];
                        break;
                    default:
                        node.style[key] = props[key];
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
