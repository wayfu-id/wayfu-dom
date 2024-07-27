import DOM from "../../index";

const parent: PropertyDescriptor & ThisType<DOM> = {
    get: function parent(): DOM | undefined {
        let parent = this.first?.parentNode as HTMLElement;
        return parent ? DOM.get(parent) : undefined;
    },
    configurable: false,
};

export { parent };
