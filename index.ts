import Base from "./src/baseClass";
import { isNode, toCamel, toKebab } from "./src/utils"; 
import { createElement, getElement, setProperties, setStyles } from "./src/helpers";

declare namespace DOM {
    export interface elementOptions extends ElementCreationOptions {
        [k: string]: any;
        tag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
        namespace?: string;
        text?: string;
        html?: string;
        class?: string;
        classid?: string | string[];
        dispatch?: any;
        addClass?:string | string[];
        append?: String | HTMLElement;
        prepend?: String | HTMLElement;
        before?: String | HTMLElement;
        after?: String | HTMLElement;
        replace?: String | HTMLElement;
        removeClass?: string;
        toggleClass?: string;
        disabled?: boolean;
        event?: DocumentEventMap;
        value?: any;
        readonly?: boolean;
        readOnly?: boolean;
        callback?: (node: HTMLElement) => any;
    }

    export interface listElementOptions extends elementOptions {
        title: string;
        type: "ol" | "ul";
        content: string | string[] | listElementOptions[];
    }

    export interface svgElementOptions extends elementOptions {
        d: string | string[];
        dPath: string | string[];
        size?: string;
        fill?: string;
        viewBox?: string;
    }
    export interface svgElementDetails {
        type: keyof SVGElementTagNameMap;
        data: SVGElement;
    }

    export type kindOfNode = HTMLElement | Document | Window;

    export type elementStyles =
        | CSSStyleDeclaration
        | { elm: kindOfNode | string; props: CSSStyleDeclaration }[];
}

class DOM extends Base<HTMLElement> {
    /** Get current element childNodes */
    get childNodes() {
        return this.first?.childNodes;
    }

    /** Get current element parent */
    get parent() {
        return this.first?.parentNode;
    }

    /** Get current next sibling element */
    get nextSibling() {
        return this.first?.nextSibling;
    }

    /** Get current element classList*/
    get classList() {
        return this.first?.classList;
    }

    private constructor();
    private constructor(query?: string);
    private constructor(query?: DOM | DOM.kindOfNode | NodeList);
    private constructor(query?: DOM.elementOptions | DOM.elementOptions[], create?: boolean);
    private constructor(query?: string | DOM | DOM.elementOptions | DOM.elementOptions[] | DOM.kindOfNode | NodeList, create?: boolean);
    private constructor(query?: any, create?: boolean) {
        super();
        return this;
        // return query ? create ? this.create(query) : this.get(query) : this.init();
    }

    /**
     * Create new HTMLElement(s) and
     * Collect it into DOM Object
     * @param props 
     */
    create(props: string): DOM;
    create(props: DOM): DOM;
    create(props: DOM.kindOfNode): DOM;
    create(props: NodeList): DOM;
    create(props: DOM.elementOptions): DOM;
    create(props: DOM.elementOptions[]): DOM;
    create(props: any): DOM {
        if (!props) return this;
        if (props instanceof NodeList || isNode(props)) {
            props = DOM.get(props);
        } 
        
        if (this.first) {
            let opt = { append: this.first } as DOM.elementOptions;
            return DOM.create(props, opt);
        }

        props = typeof props === "string" ? {tag: props} as DOM.elementOptions: props;
        if (Array.isArray(props)) {
            if(props instanceof DOM) return DOM.get(props);

            for (let opt of props) {
                if (typeof opt !== "object") continue;
                opt['tag'] = opt.tag ?? "div";
                
                createElement(opt, this);
            }

            return this;
        }

        return createElement(props, this);
    }

    /**
     * Get some HTMLElement(s) and
     * Collect it into DOM Object
     * @param query 
     */
    get(query: string): DOM;
    get(query: DOM): DOM;
    get(query: DOM.kindOfNode): DOM;
    get(query: NodeList): DOM;
    get(query: ParentNode): DOM;
    get(query: Window | Document): DOM;
    get(query: any): DOM {
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
     * Get some HTMLElement(s) that are parent for current element
     * and Collect it into DOM Object
     * @param query
     */
    getParents(query: string): DOM;
    getParents(query: DOM): DOM;
    getParents(query: DOM.kindOfNode): DOM;
    getParents(query: NodeList): DOM;
    getParents(query: any): DOM {
        const setParent = (elm: DOM) => DOM.get(elm.parent);
        const isPeek = (elm: DOM) => {
            let { isEmpty, first } = elm;
            return !isEmpty && (first && !(first instanceof Document));
        };

        let elem: DOM = this,
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

    init(): DOM {return this};
    
    /**
     * Insert an element into current element
     * if it's non exist element, then create one
     * @param query
     */
    insert(query: string): DOM;
    insert(query: DOM): DOM;
    insert(query: DOM.kindOfNode): DOM;
    insert(query: DOM.elementOptions): DOM;
    insert(query: any): DOM {
        const { first: elm } = ((e, fn) => {
            if (e instanceof DOM) return e;
            if (typeof e === "object") return fn.create(e);
            return fn.get(e).isEmpty ? fn.create(e) : fn.get(e);
        })(query, DOM);

        if(elm) this.first?.appendChild(elm);

        return this;
    }

    /**
     * Insert current element after target element
     * @param {String | kindOfNode | DOM} target
     * @returns
     */
    insertAfter(target: string): DOM;
    insertAfter(target: DOM): DOM;
    insertAfter(target: DOM.kindOfNode): DOM;
    insertAfter(target: any): DOM {
        const { parent, nextSibling } = DOM.get(target);
    
        if (!this.first || !nextSibling) return this;

        parent?.insertBefore(this.first, nextSibling);
        return this;
    }

    /**
     * Insert current element into first child of target element
     * @param {String | kindOfNode | DOM} target
     * @param {Boolean?} prepend
     * @returns
     */
    insertBefore(target: string, prepend?: boolean): DOM;
    insertBefore(target: DOM, prepend?: boolean): DOM;
    insertBefore(target: DOM.kindOfNode, prepend?: boolean): DOM;
    insertBefore(target: any, prepend: boolean = false): DOM {
        const { first, parent, childNodes } = DOM.get(target);

        if(!this.first) return this;

        if (!prepend && first) {
            parent?.insertBefore(this.first, first);
        } else {
            if (childNodes && childNodes.length) {
                first?.insertBefore(this.first, childNodes[0]);
            } else {
                this.insertTo(target);
            }
        }

        return this;
    }

    /**
     * Insert current element into target element
     * @param target
     */
    insertTo(target: string): DOM;
    insertTo(target: DOM): DOM;
    insertTo(target: DOM.kindOfNode): DOM;
    insertTo(target: any): DOM {
        function getEle (query: string): HTMLElement | undefined;
        function getEle (query: DOM.kindOfNode): HTMLElement | undefined;
        function getEle (query: DOM): HTMLElement | undefined;
        function getEle (query: any): HTMLElement | undefined {
            return DOM.get(query)?.first;
        };

        if(this.first) getEle(target)?.appendChild(this.first);

        return this;
    }

    /**
     * Is current element matches with given query?
     */
    matches(query: string): boolean;
    matches(query: DOM): boolean;
    matches(query: DOM.kindOfNode ): boolean;
    matches(query: NodeList): boolean;
    matches(query: any): boolean{
        let elms = DOM.get(query),
            { length: i } = elms;

        if (elms.isEmpty) return false;
        while (--i >= 0 && elms.at(i) !== this.first) {}
        return i > -1;
    }

    /**
     * Remove current element from body
     */ 
    remove(): DOM;
    /**
     * Remove given element from current element
     * @param query
    */
    remove(query: string | DOM.kindOfNode | DOM): DOM;
    remove(query?: any) {
        function getEle (query: string): HTMLElement | undefined;
        function getEle (query: DOM.kindOfNode): HTMLElement | undefined;
        function getEle (query: DOM): HTMLElement | undefined;
        function getEle (query: any): HTMLElement | undefined {
            return DOM.get(query)?.first;
        };
        
        let ele: HTMLElement | undefined = query ? getEle(query) : this.first;

        if(ele) {
            query ? this.first?.removeChild(ele) : getEle("body")?.removeChild(ele);
        }

        return this;
    }

    /**
     * Replace target element with current element
     * @param target
     */
    replace(target: string): DOM;
    replace(target: DOM): DOM;
    replace(target: DOM.kindOfNode): DOM;
    replace(target: any): DOM {
        const { parent, first } = DOM.get(target);
        if(!this.first || !first) return this;

        parent?.replaceChild(this.first, first);

        return this;
    }

    /**
     * Add event listener to an element
     * @param type type of event
     * @param listener event listener
     * @param bubbles bubbling
     */
    onEvent(type: string, listener: EventListener, bubbles: boolean = false) {
        (this.first || window).addEventListener(type, listener, bubbles);
        return this;
    }

    /**
     * Added since `v0.2.x`.
     *
     * Dispatch Event manualy to the current event
     * @param {Event} event
     */
    dispatch(event: Event) {
        if (this.first) {
            this.first.dispatchEvent(event);
        }

        return this;
    }
    
    /**
     * Set single properties. Can be attributes or stylesheet
     * @param key
     * @param value
     */
    set(key: {[k: string]: string | number | boolean}): DOM;
    set(key: string, value: string | number | boolean): DOM;
    set(key: any, value?: any): DOM {
        if (typeof key === "object") {
            for (let name in key) {
                this.set(name, key[name]);
            }
            return this;
        }

        if (this.isEmpty) return this;

        const [isStyleKey, props] = ((k, v) => {
            if(!this.first) return [false, undefined];
            let keys = Object.getOwnPropertyNames(this.first.style);
            return [keys.some((e) => e === k), { [k]: v } as DOM.elementStyles | DOM.elementOptions];
        })(toCamel(key), value);

        if(!props) return this;
        return isStyleKey 
            ? setStyles(props as DOM.elementStyles, this)
            : setProperties(props as DOM.elementOptions, this);
    }

    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param query
     */
    static create(query: DOM): DOM;
    static create(query: DOM.elementOptions | DOM.elementOptions[]): DOM;
    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param query
     * @param opt
     */
    static create(query: string, opt?: DOM.elementOptions | DOM.elementOptions[]): DOM;
    static create(query: string | DOM | DOM.elementOptions | DOM.elementOptions[], opt?: DOM.elementOptions | DOM.elementOptions[]): DOM;
    static create(query: any, opt?: any) {
        if (query instanceof DOM) return query;

        const props = (tag?: string | DOM.elementOptions, opt?: DOM.elementOptions)  => {
            return Object.assign(!!tag ? typeof tag == "string" ? { tag } : tag : {tag: "div"}, opt ) as DOM.elementOptions;
        };

        if (Array.isArray(query)) {
            query.map((e) => {
                let { tag: t, ...prop } = e;
                return !!prop ? props(t, props(prop, opt as DOM.elementOptions)) : props(e, opt as DOM.elementOptions);
            });
            return new DOM().create(query);
        }
        return new DOM().create(props(query, opt as DOM.elementOptions));

    }

    /**
     * Static method for creating new DOM instance with matched Element(s)
     * @param query
     */
    static get(query: string): DOM;
    static get(query: DOM): DOM;
    static get(query: ParentNode | null | undefined): DOM;
    static get(query: DOM.kindOfNode | NodeList): DOM;
    static get(query: DOM.kindOfNode | DOM): DOM;
    static get(query: any): DOM {
        if (query instanceof DOM) return query;
        return new DOM(query).get(query);
    }

    static init(): DOM {
        return new DOM().init();
    };

    
    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param items
     * @param type list type
     * @param opt
     */
    static createList(items: string[]): DOM;
    static createList(items: DOM.listElementOptions[]): DOM;
    static createList(items: DOM.listElementOptions[] | string[], type?: string, opt?: DOM.elementOptions): DOM;
    static createList(items: any[], type: string = "ol", opt?: DOM.elementOptions): DOM {
        let Lists = DOM.create(type, opt);
        if (Array.isArray(items)) {
            items.forEach((e) => {
                if (typeof e === "string") {
                    Lists.insert({ tag: "li", html: e });
                } else {
                    let { title, type, content } = e,
                        item = DOM.create("li", { html: title });

                    if (Array.isArray(content)) {
                        DOM.createList(content, type || "ol").insertTo(item);
                    }
                    Lists.insert(item);
                }
            });
        }
        return Lists;
    }
    

    /**
     * Create an svg element
     * @param shape SVG Shape(s), can be object or array of object
     * @param attr main SVG attributes if any
     * @return
     */
    static createIcon(shape: DOM.svgElementDetails, attr?: SVGSVGElement): DOM;
    static createIcon(shape: DOM.svgElementDetails[], attr?: SVGSVGElement): DOM;
    static createIcon(shape: any, attr?: SVGSVGElement): DOM {
        const checkOpt = (opt: any) => {
            const deconstructSize = (size: string) => {
                return size.split(" ").length == 1 ? [size, size] : size.split(" ");
            };
            let newOpt: {[k: string]: string} = {};
            for (const key in opt) {
                if (key !== "size") {
                    newOpt[key] = opt[key];
                } else {
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
     * Static method for checking for existing Element
     * @param query target element
     * @param timeout uint miliseconds
     */
    static has(query: string, timeout?: number): Promise<HTMLElement | false>;
    static has(query: DOM, timeout?: number): Promise<HTMLElement | false>;
    static has(query: ParentNode | null | undefined, timeout?: number): Promise<HTMLElement | false>;
    static has(query: DOM.kindOfNode | NodeList, timeout?: number): Promise<HTMLElement | false>;
    static has(query: DOM.kindOfNode | DOM, timeout?: number): Promise<HTMLElement | false>;
    static has(query: any, timeout: number = 10): Promise<HTMLElement | false> {
        return new Promise((done) => {
            let loop = setInterval(() => {
                let { first } = DOM.get(query);
                if (first) {
                    done(first);
                    clearInterval(loop);
                }
                if (((timeout -= 1) == 0)) {
                    done(false);
                    clearInterval(loop);
                }
            }, 1e3);
        });
    }
    
    /**
     * Static method for creating and inserting new stylesheet into active page
     * @param css stylesheet
     * @param props other html attributes
     */
    static addStyle(css: string, props?: DOM.elementOptions) {
        let opt = { tag: "style", html: css, append: "head" },
            query = Object.assign({}, opt, props);

        return DOM.create(query);
    }
}

export default DOM;