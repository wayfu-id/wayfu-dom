import DOM from "../../index";

const matches: PropertyDescriptor & ThisType<DOM> = {
    value: function matches(query: any) {
        let elms = DOM.get(query),
            { length: i } = elms;

        if (elms.isEmpty) return false;
        while (--i >= 0 && elms.at(i) !== this.first) {}
        return i > -1;
    },
    enumerable: true,
    configurable: false,
};

export { matches };
