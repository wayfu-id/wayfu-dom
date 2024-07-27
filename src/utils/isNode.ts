/**
 * Check the given query is belongs to Node type or not
 * @param query
 */
function isNode(query: any) {
    return query instanceof Document || query instanceof Window || query instanceof HTMLElement;
}

export { isNode };
