import DOM from "../../index";

const createList: PropertyDescriptor = {
    value: function createList(items: any[], type?: string, opt?: DOM.elementOptions): DOM {
        let Lists = DOM.create(type ?? "ol", opt);
        if (Array.isArray(items)) {
            items.forEach((e) => {
                if (typeof e === "string") {
                    Lists.insert({ tag: "li", html: e });
                } else {
                    let { title, type, content } = e,
                        item = DOM.create("li", { html: title });

                    if (Array.isArray(content)) {
                        DOM.createList(content, type ?? "ol").insertTo(item);
                    }
                    Lists.insert(item);
                }
            });
        }
        return Lists;
    },
    enumerable: true,
    configurable: false,
};

export { createList };
