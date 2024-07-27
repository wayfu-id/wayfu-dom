import DOM from "../../index";

const init: PropertyDescriptor & ThisType<DOM> = {
    value: function init() {
        return this;
    },
    enumerable: true,
    configurable: false,
};

export { init };
