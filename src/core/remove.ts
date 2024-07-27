import DOM from "../../index";

const remove: PropertyDescriptor & ThisType<DOM> = {
    value: function remove(query?: any) {
        let ele: HTMLElement | undefined = query ? DOM.getFirst(query) : this.first;

        if (ele) {
            query ? this.first?.removeChild(ele) : DOM.getFirst("body")?.removeChild(ele);
        }

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { remove };
