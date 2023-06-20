import DOM from "../index.js";
import { toKebab } from "./utils.js";

/**
 * @typedef {import("../types.js").elemenOptions} elemenOptions
 * @typedef {import("../types.js").kindOfNode} kindOfNode
 * @typedef {import("../types.js").listElementOptions} listElementOptions
 * @typedef {import("../types.js").svgElemenOptions} svgElemenOptions
 */

/**
 * Actual method for creating Element(s)
 * and Collect it into DOM Object
 * @param {elemenOptions | svgElemenOptions} props
 * @param {DOM?} dom_
 * @returns
 */
function createElement(props, dom_) {
    let _dom = dom_ ? dom_ : new DOM();

    const element = (({ tag, namespace }) => {
        if (namespace) return document.createElementNS(namespace, tag);
        return document.createElement(tag);
    })(props);

    delete props.tag;

    _dom.unshift(element);

    return setProperties(props, _dom);
    // return _dom.setProperties(props);
}

/**
 * Method for geting Element(s)
 * and Collect it into DOM Object
 * @param {String} query
 * @param {DOM} dom_
 * @returns
 */
function getElement(query, dom_) {
    let _dom = dom_ ? dom_ : new DOM();

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
 * @param {elemenOptions} props
 * @param {DOM} dom
 * @returns
 */
function setProperties(props, dom) {
    let { namespace } = props;

    delete props.namespace;
    /** @type {(node: HTMLElement) => void} */
    const setProp = (node) => {
        for (const name in props) {
            if (props.hasOwnProperty(name)) {
                if (!namespace) {
                    switch (name) {
                        case "text":
                            let text =
                                "innerText" in document ? "innerText" : "textContent";
                            node[text] = props[name];
                            break;
                        case "html":
                            node.innerHTML = props[name];
                            break;
                        case "class":
                        case "classid":
                            if (typeof props[name] === "array") {
                                for (let cls of props[name]) {
                                    node.classList.add(cls);
                                }
                            } else if (typeof props[name] === "string") {
                                node.className = props[name];
                            }
                            break;
                        case "addClass":
                            node.classList.add(props[name]);
                            break;
                        case "removeClass":
                            node.classList.remove(props[name]);
                            break;
                        case "toggleClass":
                            node.classList.toggle(props[name]);
                            break;
                        case "disabled":
                            node.disabled = props[name];
                            break;
                        case "append":
                            DOM.get(node).insertTo(props[name]);
                            break;
                        case "prepend":
                            DOM.get(node).insertBefore(props[name], true);
                            break;
                        case "before":
                            DOM.get(node).insertBefore(props[name]);
                            break;
                        case "after":
                            DOM.get(node).insertAfter(props[name]);
                            break;
                        case "value":
                            node.value = props[name];
                            break;
                        case "dispatch":
                            node.dispatchEvent(props[name]);
                            break;
                        case "replace":
                            DOM.get(node).replace(props[name]);
                            break;
                        case "event":
                            for (const evName in props.event) {
                                if (props.event.hasOwnProperty(evName)) {
                                    DOM.get(node).onEvent(evName, props.event[evName]);
                                }
                            }
                            break;
                        case "callback":
                            props[name](node);
                            break;
                        case "readonly":
                        case "readOnly":
                            node.readOnly = props[name];
                            break;
                        default:
                            node.setAttribute(name, props[name]);
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
 * @param {elementStyles} styles
 * @param {DOM} dom
 * @returns
 */
function setStyles(styles, dom) {
    /** @type {(node: HTMLElement | undefined, props: CSSStyleDeclaration) => void} */
    const setStyle = (node, props) => {
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
    /** @type {(query: String | kindOfNode) => HTMLElement | undefined} */
    const getEle = (query) => DOM.get(query).first;

    if (Array.isArray(styles)) {
        styles.forEach(({ elm, props }) => {
            setStyle(getEle(elm), props);
        });

        return dom;
    }

    if (dom.isEmpty) return dom;

    dom.forEach((e) => setStyle(e, styles));

    return dom;
}

export { createElement, getElement, setProperties, setStyles };
