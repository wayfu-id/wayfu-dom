import DOM from "../../index";

const dispatch: PropertyDescriptor & ThisType<DOM> = {
    value: function dispatch(event: Event) {
        if (this.first) {
            this.first.dispatchEvent(event);
        }

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { dispatch };
