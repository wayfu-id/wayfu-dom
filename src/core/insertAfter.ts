import DOM from "../../index";

const insertAfter: PropertyDescriptor & ThisType<DOM> = {
    value: function insertAfter(target: any) {
        const { parent, nextSibling } = DOM.get(target);

        if (!this.first || !nextSibling?.first) return this;

        parent?.first?.insertBefore(this.first, nextSibling.first);
        return this;
    },
    enumerable: true,
    configurable: false,
};

export { insertAfter };
