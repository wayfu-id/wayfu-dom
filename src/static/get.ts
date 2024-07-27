import DOM from "../../index";
import { _token } from "../constant";

const get: PropertyDescriptor = {
    value: function get(query: any): DOM {
        if (query instanceof DOM) return query;
        return new DOM(_token, query);
    },
    enumerable: true,
    configurable: false,
};

export { get };
