import DOM from "../../index";
/**
 * Method for geting Element(s)
 * and Collect it into DOM Object
 * @param query
 * @param dom_
 * @returns
 */
function getElements(query: string, dom_: DOM) {
    let _dom = dom_ ? dom_ : DOM.init();

    if (!_dom.first) {
        if (/^(?:document|window)$/g.test(query)) {
            return _dom.get(/^document$/g.test(query) ? document : window);
        }
    }

    if (_dom.first) return DOM(_dom.first.querySelectorAll(query));

    let res = document.querySelectorAll(query);
    if (!res.length) return _dom;

    res.forEach((node) => _dom.push(node));
    return _dom;
}

export { getElements };
