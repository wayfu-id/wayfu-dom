/**
 * @typedef {import("../types").kindOfNode} kindOfNode
 */

const rgx = {
    snaKebab: /([-_][a-z])/g,
    camelCase: /[A-Z]/g,
};

/**
 * Convert string to array of string
 * @param {string | string[]} input
 * @param {string=} delimiter by default using space
 * @returns
 */
function strToArr(input, delimiter = " ") {
    return Array.isArray(input)
        ? input
        : typeof input === "string"
        ? input.split(delimiter)
        : [];
}

/**
 * Convert `snake_case` or `kebab-case` to `camelCase` string
 * @param {String} string
 * @returns
 */
function toCamel(string) {
    let { snaKebab } = rgx;
    if (!snaKebab.test(string)) return string;

    string = string.toLowerCase();
    return string.replace(snaKebab, (m) => {
        return m.toUpperCase().replace("-", "").replace("_", "");
    });
}

/**
 * Convert `camelCase` to `kebab-case` string
 * @param {String} string
 * @returns
 */
function toKebab(string) {
    let { camelCase } = rgx;
    if (!camelCase.test(string)) return string;

    return string.replace(camelCase, (m) => {
        return `-${m.toLocaleLowerCase()}`;
    });
}

/**
 * Check the given query is belongs to Node type or not
 * @param {kindOfNode | Object} query
 * @returns
 */
function isNode(query) {
    return (
        query instanceof Document ||
        query instanceof Window ||
        query instanceof HTMLElement
    );
}

export { toCamel, toKebab, isNode, strToArr };
