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

export { toKebab };
