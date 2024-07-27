import DOM from "../../index";
import { queryToProps, isNode } from "../utils/index";
import { createElement } from "../fn/index";

const create: PropertyDescriptor & ThisType<DOM> = {
    value: function create(props: any) {
        if (!props) return this;
        if (props instanceof NodeList || isNode(props)) {
            props = DOM.get(props);
        }

        if (this.first) {
            return DOM.create(props).insertTo(this);
        }

        const _opt = (query?: string | DOM.elementOptions) => {
            if (!query) return {};
            return {
                ...(typeof query === "string" ? queryToProps(query) : query),
            } as DOM.elementOptions;
        };

        if (Array.isArray(props)) {
            if (props instanceof DOM) return DOM.get(props);

            for (let opt of props as string[] | DOM.elementOptions[]) {
                opt = _opt(opt);
                opt["tag"] = opt.tag ?? "div";

                createElement(opt, this);
            }

            return this;
        }

        return createElement(_opt(props), this);
    },
    enumerable: true,
    configurable: false,
};

export { create };
