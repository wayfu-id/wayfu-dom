import DOM from "../../index";
import { setProperties } from "./setProperties";

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
}

export { createElement };
