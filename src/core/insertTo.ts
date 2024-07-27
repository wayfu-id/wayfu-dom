import DOM from "../../index";

const insertTo: PropertyDescriptor & ThisType<DOM> = {
    value: function insertTo(target: any) {
        if (!this.isEmpty) {
            for (let ele of this) {
                DOM.getFirst(target)?.appendChild(ele);
            }
        }
        return this;
    },
    enumerable: true,
    configurable: false,
};

export { insertTo };
