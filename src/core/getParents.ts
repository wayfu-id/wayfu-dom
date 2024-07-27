import DOM from "../../index";

const getParents: PropertyDescriptor & ThisType<DOM> = {
    value: function getParents(query: any) {
        const setParent = (elm: DOM) => elm.parent as DOM;
        const isPeek = (elm: DOM) => {
            let { isEmpty, first } = elm;
            return !isEmpty && first && !(first instanceof Document);
        };

        let elem: DOM = this,
            results = DOM.init();

        for (; isPeek(elem); elem = setParent(elem)) {
            console.log(elem);
            if (query) {
                if (elem.matches(query)) results = elem;
                continue;
            }
            results.unshift(elem.first);
        }
        return results;
    },
    enumerable: true,
    configurable: false,
};

export { getParents };
