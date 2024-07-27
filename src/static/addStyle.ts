import DOM from "../../index";

const addStyle: PropertyDescriptor = {
    value: function addStyle(css: string, props?: DOM.elementOptions) {
        let opt = { tag: "style", html: css, append: "head" },
            query = Object.assign({}, opt, props);

        return DOM.create(query);
    },
    enumerable: true,
    configurable: false,
};

export { addStyle };
