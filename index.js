import Base from "./src/baseClass.js";
import { toCamel, isNode } from "./src/utils.js";
import { createElement, getElement, setProperties, setStyles } from "./src/helpers.js";

/**
 * @typedef {import("./types.js").elemenOptions} elemenOptions
 * @typedef {import("./types.js").kindOfNode} kindOfNode
 * @typedef {import("./types.js").listElementOptions} listElementOptions
 * @typedef {import("./types.js").svgElementDetails} svgElementDetails
 * @typedef {import("./types.js").svgElemenOptions} svgElemenOptions
 */

const DOM = (function () {
    const _token = Symbol();

    /**
     * Just a DOM Class using extended custom Array
     * @extends {Base<HTMLElement>}
     */
    return class DOM extends Base {
        /**
         * Create new Empty DOM Object
         * @overload
         * @param {symbol} token
         */ /**
         * Create new DOM with matched Element(s) from query
         * @overload
         * @param {symbol} token
         * @param {String | kindOfNode | NodeList} query
         */ /**
         * Return the current DOM
         * @overload
         * @param {symbol} token
         * @param {DOM} query
         */ /**
         * Create new DOM with created Element(s) from given properties
         * @overload
         * @param {symbol} token
         * @param {(elemenOptions | elemenOptions[])} query
         * @param {boolean} [true] create
         */
        constructor(token, query, create) {
            if (_token !== token) {
                throw new TypeError(
                    "DOM is not constructable. " +
                        "Use DOM.create(), DOM.createList(), DOM.createIcon(), " +
                        "DOM.get(), DOM.has(), or DOM.addStyle()."
                );
            }
            super();
            return create ? this.create(query) : this.get(query);
        }

        /** Get current element childNodes */
        get childNodes() {
            return !this.isEmpty ? this.first.childNodes : undefined;
        }

        /** Get current element parent */
        get parent() {
            return !this.isEmpty ? this.first.parentNode : undefined;
        }

        /** Get current next sibling element */
        get nextSibling() {
            return !this.isEmpty ? this.first.nextSibling : undefined;
        }

        /** Get current element classList*/
        get classList() {
            return !this.isEmpty ? this.first.classList : undefined;
        }

        /**
         * Create new HTMLElement(s) and
         * Collect it into DOM Object
         * @param {elemenOptions | elemenOptions[] | null} props
         * @returns
         */
        create(props) {
            if (!props) return this;

            if (this.first) return DOM.create(props, { append: this.first });

            if (Array.isArray(props)) {
                for (let opt of props) {
                    if (typeof opt !== "object" && !opt.tag) continue;

                    createElement(props, this);
                }

                return this;
            }

            return createElement(props, this);
        }

        /**
         * Get some HTMLElement(s) and
         * Collect it into DOM Object
         * @param {String | kindOfNode | NodeList | DOM | null} query
         * @returns
         */
        get(query) {
            if (!query) return this;
            if (typeof query === "string") return getElement(query, this);
            if (query instanceof DOM) return query;

            if (isNode(query)) {
                this.push(query);
            } else if (query instanceof NodeList) {
                if (query.length === 0) return this;
                query.forEach((node) => this.push(node));
            }

            return this;
        }

        /**
         * Is current element matches with given query?
         * @param {String | kindOfNode | NodeList | DOM} query
         * @returns
         */
        matches(query) {
            let elms = DOM.get(query),
                { length: i } = elms;

            if (elms.isEmpty) return false;
            while (--i >= 0 && elms.at(i) !== this.first) {}
            return i > -1;
        }

        /**
         * Get some HTMLElement(s) that are parent for current element
         * and Collect it into DOM Object
         * @param {String | kindOfNode | NodeList | DOM | null} query
         * @returns
         */
        getParents(query) {
            /** @type {(elm: DOM) => DOM} */
            const setParent = (elm) => DOM.get(elm.parent);
            /** @type {(elm: DOM) => boolean} */
            const isPeek = (elm) => {
                let { isEmpty, first } = elm;
                return !isEmpty && first !== document;
            };

            let elem = this,
                parents = setParent(elem);

            for (; isPeek(elem); elem = setParent(elem)) {
                if (query) {
                    if (elem.matches(query)) parents = elem;
                    continue;
                }
                parents.unshift(elem.first);
            }
            return parents;
        }

        /**
         * Set single properties. Can be attributes or stylesheet
         * @param {String | {[k: String]: String | Number | Boolean}} key
         * @param {String | Number | Boolean | null} value
         * @returns
         */
        set(key, value) {
            if (typeof key === "object") {
                for (let name in key) {
                    this.set(name, key[name]);
                }
                return this;
            }

            if (this.isEmpty) return this;

            const [isStyleKey, props] = ((k, v) => {
                let keys = Object.getOwnPropertyNames(this.first.style);
                return [keys.some((e) => e === k), { [k]: v }];
            })(toCamel(key), value);

            return isStyleKey ? setStyles(props, this) : setProperties(props, this);
        }

        /**
         * Remove current element from body
         * @overload
         * @returns {DOM}
         */ /**
         * Remove given element from current element
         * @overload
         * @param {string | kindOfNode | DOM} query
         * @returns {DOM}
         */
        remove(query) {
            const getEle = (query) => DOM.get(query).first;

            if (query) {
                this.first.removeChild(getEle(query));
            } else {
                getEle("body").removeChild(this.first);
            }
            return this;
        }

        /**
         * Insert an element into current element
         * if it's non exist element, then create one
         * @param {String | kindOfNode | DOM | elemenOptions} element
         * @returns
         */
        insert(element) {
            const { first: elm } = ((e, fn) => {
                if (e instanceof DOM) return e;
                if (typeof e === "object") return fn.create(e);
                return fn.get(e).isEmpty ? fn.create(e) : fn.get(e);
            })(element, DOM);

            this.first.appendChild(elm);

            return this;
        }

        /**
         * Insert current element into target element
         * @param {String | kindOfNode | DOM} target
         * @returns
         */
        insertTo(target) {
            const getEle = (query) => DOM.get(query).first;
            getEle(target).appendChild(this.first);

            return this;
        }

        /**
         * Insert current element into first child of target element
         * @param {String | kindOfNode | DOM} target
         * @param {Boolean?} prepend
         * @returns
         */
        insertBefore(target, prepend = false) {
            const { first, parent, childNodes } = DOM.get(target);

            if (!prepend) {
                parent.insertBefore(this.first, first);
            } else {
                if (childNodes.length) {
                    first.insertBefore(this.first, childNodes[0]);
                } else {
                    this.insertTo(target);
                }
            }

            return this;
        }

        /**
         * Insert current element after target element
         * @param {String | kindOfNode | DOM} target
         * @returns
         */
        insertAfter(target) {
            const { parent, nextSibling } = DOM.get(target);
            parent.insertBefore(this.first, nextSibling);

            return this;
        }

        /**
         * Replace target element with current element
         * @param {String | kindOfNode | DOM} target
         * @returns
         */
        replace(target) {
            const { parent, first } = DOM.get(target);
            parent.replaceChild(this.first, first);

            return this;
        }

        /**
         * Add event listener to an element
         * @param {string} type type of event
         * @param {EventListener} listener event listener
         * @param {boolean} bubbles bubbling
         * @returns
         */
        onEvent(type, listener, bubbles = false) {
            if (window.addEventListener) {
                (this.first || window).addEventListener(type, listener, bubbles);
            }
            return this;
        }

        /**
         * Added since `v0.2.x`.
         *
         * Dispatch Event manualy to the current event
         * @param {Event} event
         * @returns
         */
        dispatch(event) {
            if (this.first) {
                this.first.dispatchEvent(event);
            }

            return this;
        }

        /**
         * Static method for creating new DOM instance with new Element(s)
         * @param {String | DOM | elemenOptions | elemenOptions[]} tag
         * @param {elemenOptions} opt
         * @returns
         */
        static create(tag, opt = {}) {
            if (tag instanceof DOM) return tag;

            /** @type {(tag: String | elemenOptions, opt: elemenOptions) => elemenOptions} */
            const props = (tag, opt) => {
                return Object.assign(typeof tag == "string" ? { tag } : tag, opt);
            };

            if (Array.isArray(tag)) {
                tag.map((e) => {
                    let { tag: t, ...prop } = e;
                    return !!prop ? props(t, props(prop, opt)) : props(e, opt);
                });
                return new DOM(_token, tag, true);
            }

            return new DOM(_token, props(tag, opt), true);
        }

        /**
         * Static method for creating new DOM instance with new Element(s)
         * @param {Array<listElementOptions|String>} items
         * @param {"ol"|"ul"} type list type
         * @param {elemenOptions} opt
         * @returns
         */
        static createList(items, type = "ol", opt = {}) {
            let Lists = DOM.create(type, opt);
            if (Array.isArray(items)) {
                items.forEach((e) => {
                    if (typeof e === "object") {
                        let { title, type, content } = e,
                            item = DOM.create("li", { html: title });

                        if (Array.isArray(content)) {
                            DOM.createList(content, type || "ol").insertTo(item);
                        }
                        Lists.insert(item);
                    } else if (typeof e === "string") {
                        Lists.insert({ tag: "li", html: e });
                    }
                });
            }
            return Lists;
        }

        /**
         * Create an svg element
         * @param {svgElementDetails | Array.<svgElementDetails>} shape SVG Shape(s), can be object or array of object
         * @param {SVGSVGElement} attr main SVG attributes if any
         * @return
         */
        static createIcon(shape, attr = {}) {
            /** @type {(opt: Object) => svgElemenOptions} */
            const checkOpt = (opt) => {
                /** @type {(size: String) => [string, string]} */
                const deconstructSize = (size) => {
                    return size.split(" ").length == 1 ? [size, size] : size.split(" ");
                };
                let newOpt = {};
                for (const key in opt) {
                    if (key !== "size") {
                        newOpt[key] = opt[key];
                    } else {
                        /** @type {[string, string]} */
                        let [width, height] = deconstructSize(opt[key]);
                        Object.assign(newOpt, { width, height });
                    }
                }
                return newOpt;
            };

            const namespace = "http://www.w3.org/2000/svg",
                svgDOM = DOM.create("svg", { namespace, ...checkOpt(attr) }),
                shapes = Array.isArray(shape) ? shape : [shape];

            shapes.forEach(({ type: tag, data }) => {
                svgDOM.insert({ tag, namespace, ...checkOpt(data) });
            });

            return svgDOM;
        }

        /**
         * Static method for creating new DOM instance with matched Element(s)
         * @param {String | kindOfNode | NodeList | DOM} query
         * @returns
         */
        static get(query) {
            if (query instanceof DOM) return query;
            return new DOM(_token, query);
        }

        /**
         * Static method for checking for existing Element
         * @param {String | HTMLElement | kindOfNode} query target element
         * @param {Number} timeout uint miliseconds
         * @returns {Promise<HTMLElement | false>}
         */
        static async has(query, timeout = 10) {
            return new Promise((done) => {
                let loop = setInterval(() => {
                    let { first } = DOM.get(query);
                    if (first) {
                        done(first);
                        clearInterval(loop);
                    }
                    if ((timeout -= 1 == 0)) {
                        done(false);
                        clearInterval(loop);
                    }
                }, 1e3);
            });
        }

        /**
         * Static method for creating and inserting new stylesheet into active page
         * @param {String} css stylesheet
         * @param {elemenOptions} props other html attributes
         * @returns
         */
        static addStyle(css, props = {}) {
            let opt = { tag: "style", html: css, append: "head" },
                query = Object.assign({}, opt, props);

            return DOM.create(query);
        }
    };
})();

export default DOM;
