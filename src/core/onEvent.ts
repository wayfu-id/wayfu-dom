import DOM from "../../index";

const onEvent: PropertyDescriptor & ThisType<DOM> = {
    value: function onEvent(type: string, listener: EventListener, bubbles: boolean = false) {
        (this.first || window).addEventListener(type, listener, bubbles);
        return this;
    },
    enumerable: true,
    configurable: false,
};

export { onEvent };
