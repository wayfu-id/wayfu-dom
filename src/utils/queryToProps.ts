import { toKebab } from "./toKebab";

/**
 * Advanched function to destruct query string to Element Properties object
 * @param query
 */
function queryToProps(query: string) {
    let baseRgx = /([a-z]*)\#?([a-zA-Z-]*)?(?:\.?([\.a-zA-Z-]*))*(?:[\[]?([\w=\'\"\[\]\:,-]+))*/g,
        rgxResult: RegExpExecArray | null = baseRgx.exec(query);

    if (!rgxResult) return null;

    let [_, _tag, _id, _class, _attr] = rgxResult;

    function getClasses(query: string): string[] {
        return query.split(".").map((e) => toKebab(e));
    }
    function getAttributes(query: string) {
        let rgx = /^([\w-]+)\=(?:(?:\'|\")+([\w\:,-]+)(?:\'|\")+)[\]]$/g;
        return query.split("[").reduce((o, e) => {
            let obj: { [k: string]: any } = {};
            e.replace(rgx, function (_, g1, g2) {
                if (g1 !== "" && g2 !== "") {
                    obj[g1] = g1 === "style" ? getStyles(g2) : g2;
                }
                return _;
            });
            return Object.assign({}, o, obj);
        }, {});
    }
    function getStyles(query: string) {
        return query.split(",").reduce((o, e) => {
            let [key, val] = e.split(":");
            return Object.assign(o, { [key]: val.replace(/\'\"/g, "") });
        }, {});
    }

    return {
        tag: _tag ?? "div",
        ...(_class ? { classid: getClasses(_class) } : {}),
        ...(_id ? { id: _id } : {}),
        ...(_attr ? getAttributes(_attr) : {}),
    };
}

export { queryToProps };
