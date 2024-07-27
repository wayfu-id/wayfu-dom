import DOM from "../../index";

const classList: PropertyDescriptor & ThisType<DOM> = {
    get: function classList(): DOMTokenList | undefined {
        return this.first?.classList;
    },
    configurable: false,
};

export { classList };
