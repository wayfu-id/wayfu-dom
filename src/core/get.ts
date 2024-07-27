import DOM from "../../index";
import { isNode } from "../utils/index";
import { getElements } from "../fn/index";

const get: PropertyDescriptor & ThisType<DOM> = {
    value: function get(query: any) {
        if (!query) return this;
        if (typeof query === "string") return getElements(query, this);
        if (query instanceof DOM) return query;

        if (isNode(query)) {
            this.push(query);
        } else if (query instanceof NodeList) {
            if (query.length === 0) return this;
            query.forEach((node) => this.push(node));
        }

        return this;
    },
    enumerable: true,
    configurable: false,
};

export { get };
