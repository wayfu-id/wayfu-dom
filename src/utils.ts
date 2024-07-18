/**
 * Check the given query is belongs to Node type or not
 * @param query
 */
function isNode(query: any) {
    return query instanceof Document || query instanceof Window || query instanceof HTMLElement;
}

/**
 * Convert string to array of string
 * @param input
 */
function strToArr(input: string[]): string[];
/**
 * Convert string to array of string
 * @param input
 * @param delimiter by default using space
 */
function strToArr(input: string, delimiter?: string): string[];
function strToArr(input: string | string[], delimiter: string = " ") {
    return Array.isArray(input) ? input : typeof input === "string" ? input.split(delimiter) : [];
}

/**
 * Convert `snake_case` or `kebab-case` to `camelCase` string
 * @param string
 */
function toCamel(string: string) {
    let snaKebab = /([-_][a-z])/g;
    if (!snaKebab.test(string)) return string;

    string = string.toLowerCase();
    return string.replace(snaKebab, (m) => {
        return m.toUpperCase().replace("-", "").replace("_", "");
    });
}

/**
 * Convert `camelCase` to `kebab-case` string
 * @param string
 */
function toKebab(string: string) {
    let camelCase = /[A-Z]/g;
    if (!camelCase.test(string)) return string;

    return string.replace(camelCase, (m) => {
        return `-${m.toLocaleLowerCase()}`;
    });
}

export { isNode, strToArr, toCamel, toKebab };
