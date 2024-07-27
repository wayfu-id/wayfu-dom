import DOM from "../../index";

const nextSibling: PropertyDescriptor & ThisType<DOM> = {
    get: function nextSibling(): DOM | undefined {
        let next = this.first?.nextSibling as HTMLElement;
        return next ? DOM.get(next) : undefined;
    },
    configurable: false,
};

export { nextSibling };
