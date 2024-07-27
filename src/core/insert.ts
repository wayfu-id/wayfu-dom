import DOM from "../../index";

const insert: PropertyDescriptor & ThisType<DOM> = {
    value: function insert(query: any) {
        query = Array.isArray(query) ? query : [query];

        query.forEach((q: any) => {
            const { first: elm } = ((e, fn) => {
                if (e instanceof DOM) return e;
                if (typeof e === "object") return fn.create(e);
                return fn.get(e).isEmpty ? fn.create(e) : fn.get(e);
            })(q, DOM);

            if (elm) this.first?.appendChild(elm);
        });

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { insert };
