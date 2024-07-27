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

export { toCamel };
