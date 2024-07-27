import DOM from "../../index";

const insertBefore: PropertyDescriptor & ThisType<DOM> = {
    value: function insertBefore(target: any, prepend: boolean = false) {
        const { first, parent, childNodes } = DOM.get(target);

        if (!this.first) return this;

        if (!prepend && first) {
            parent?.first?.insertBefore(this.first, first);
        } else {
            if (childNodes && childNodes.length) {
                first?.insertBefore(this.first, childNodes[0]);
            } else {
                this.insertTo(target);
            }
        }

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { insertBefore };
