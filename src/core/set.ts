import DOM from "../../index";
import { toCamel } from "../utils/index";
import { setProperties, setStyles } from "../fn/index";

const set: PropertyDescriptor & ThisType<DOM> = {
    value: function set(key: any, value?: any) {
        if (typeof key === "object") {
            for (let name in key) {
                this.set(name, key[name]);
            }
            return this;
        }

        if (this.isEmpty) return this;

        const [isStyleKey, props] = ((k, v) => {
            if (!this.first) return [false, undefined];
            let keys = Object.getOwnPropertyNames(this.first.style);
            return [
                keys.some((e) => e === k),
                { [k]: v } as DOM.elementStyles | DOM.elementOptions,
            ];
        })(toCamel(key), value);

        if (!props) return this;
        return isStyleKey
            ? setStyles(props as DOM.elementStyles, this)
            : setProperties(props as DOM.elementOptions, this);
    },
    enumerable: true,
    configurable: false,
};

export { set };
