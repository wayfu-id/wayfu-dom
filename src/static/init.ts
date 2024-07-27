import DOM from "../../index";
import { _token } from "../constant";

const init: PropertyDescriptor = {
    value: function init(): DOM {
        return new DOM(_token).init();
    },
    enumerable: true,
    configurable: false,
};

export { init };
