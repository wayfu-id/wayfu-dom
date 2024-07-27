import DOM from "../../index";
import { queryToProps } from "../utils/index";
import { _token } from "../constant";

const create: PropertyDescriptor = {
    value: function create(query: any, opt?: any) {
        if (query instanceof DOM) return query;

        const props = (tag?: string | DOM.elementOptions, opt?: DOM.elementOptions) => {
            return Object.assign(
                {},
                !!tag ? (typeof tag == "string" ? queryToProps(tag) : tag) : { tag: "div" },
                opt
            ) as DOM.elementOptions;
        };

        if (Array.isArray(query)) {
            query.map((e) => {
                let { tag: t, ...prop } = e;
                return !!prop
                    ? props(t, props(prop, opt as DOM.elementOptions))
                    : props(e, opt as DOM.elementOptions);
            });
            return new DOM(_token, query, true);
        }
        return new DOM(_token, props(query, opt as DOM.elementOptions), true);
    },
    enumerable: true,
    configurable: false,
};

export { create };
