import DOM from "../../index";

const replace: PropertyDescriptor & ThisType<DOM> = {
    value: function replace(target: any) {
        const { parent, first } = DOM.get(target);
        if (!this.first || !first) return this;

        parent?.first?.replaceChild(this.first, first);

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { replace };
