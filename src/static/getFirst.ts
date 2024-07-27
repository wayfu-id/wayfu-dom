import DOM from "../../index";

const getFirst: PropertyDescriptor = {
    value: function getFirst(query: any): HTMLElement | undefined {
        return DOM.get(query)?.first;
    },
    enumerable: true,
    configurable: false,
};

export { getFirst };
