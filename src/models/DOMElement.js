import MyArray from "./MyArray";

export default class ElementInit {
    constructor(selector) {
        this.element = new MyArray();
        this.init(selector);
    }

    init(selector) {
        if (selector instanceof ElementInit) {
            return selector;
        }
        if (selector instanceof HTMLElement) {
            this.element = MyArray.create([selector]);
        } else if (selector instanceof NodeList) {
            this.element = MyArray.create(selector);
        } else if (typeof selector == "string") {
            let ele = ((s) => {
                if (s === "document") return [document];
                if (s === "window") return [window];
                return document.querySelectorAll(s);
            })(selector);
            if (ele.length == 0) return this.create(selector);
            this.element = MyArray.create(ele);
        }

        return this;
    }

    create(selector) {}

    each(callback) {
        return this.element.forEach(callback);
    }

    extend(target, object) {
        if (arguments.length == 1) {
            object = target;
            target = ElementInit.prototype;
        }
        Object.assign(target, object);
        return this;
    }
}
