import DOM from "../../index";

const childNodes: PropertyDescriptor & ThisType<DOM> = {
    get: function childNodes(): DOM | undefined {
        let children = this.first?.childNodes;
        return children && children.length != 0 ? DOM.get(children) : undefined;
    },
    configurable: false,
};

export { childNodes };
