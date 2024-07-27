import Base, { _proto_, _static_, _token } from "./src/index";

declare global {
    export const __VERSION__: string;
    namespace DOM {
        export interface elementOptions extends ElementCreationOptions {
            [k: string]: any;
            tag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
            namespace?: string;
            text?: string;
            html?: string;
            class?: string;
            classid?: string | string[];
            dispatch?: any;
            addClass?: string | string[];
            append?: string | DOM | HTMLElement;
            prepend?: string | DOM | HTMLElement;
            before?: string | DOM | HTMLElement;
            after?: string | DOM | HTMLElement;
            replace?: string | DOM | HTMLElement;
            removeClass?: string | string[];
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
}

declare class DOM extends Base<HTMLElement> {
    readonly VERSION: string;

    constructor(token: symbol);
    constructor(token: symbol);
    constructor(token: symbol, query?: string);
    constructor(token: symbol, query?: DOM | DOM.kindOfNode | NodeList);
    constructor(
        token: symbol,
        query?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
        create?: boolean
    );
    constructor(token: symbol, query?: DOM.elementOptions | DOM.elementOptions[], create?: boolean);

    /** Get current element childNodes */
    get childNodes(): DOM | undefined;
    /** Get current element classList*/
    get classList(): DOMTokenList | undefined;
    /** Get current next sibling element */
    get nextSibling(): DOM | undefined;
    /** Get current element parent */
    get parent(): DOM | undefined;

    /**
     * Create new HTMLElement(s) and
     * Collect it into DOM Object
     * @param props
     */
    create(props: string): DOM;
    create(props: string[]): DOM;
    create(props: DOM): DOM;
    create(props: DOM.kindOfNode): DOM;
    create(props: NodeList): DOM;
    create(props: DOM.elementOptions): DOM;
    create(props: DOM.elementOptions[]): DOM;

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

    /**
     * Get some HTMLElement(s) that are parent for current element
     * and Collect it into DOM Object
     * @param query
     */
    getParents(query: string): DOM;
    getParents(query: DOM): DOM;
    getParents(query: DOM.kindOfNode): DOM;
    getParents(query: NodeList): DOM;

    init(): DOM;

    /**
     * Insert an element into current element
     * if it's non exist element, then create one
     * @param query
     */
    insert(query: string): DOM;
    insert(query: DOM): DOM;
    insert(query: DOM.kindOfNode): DOM;
    insert(query: DOM.elementOptions): DOM;

    /**
     * Insert current element after target element
     * @param {String | kindOfNode | DOM} target
     * @returns
     */
    insertAfter(target: string): DOM;
    insertAfter(target: DOM): DOM;
    insertAfter(target: DOM.kindOfNode): DOM;

    /**
     * Insert current element into first child of target element
     * @param {String | kindOfNode | DOM} target
     * @param {Boolean?} prepend
     * @returns
     */
    insertBefore(target: string, prepend?: boolean): DOM;
    insertBefore(target: DOM, prepend?: boolean): DOM;
    insertBefore(target: DOM.kindOfNode, prepend?: boolean): DOM;

    /**
     * Insert current element into target element
     * @param target
     */
    insertTo(target: string): DOM;
    insertTo(target: DOM): DOM;
    insertTo(target: DOM.kindOfNode): DOM;

    /**
     * Is current element matches with given query?
     */
    matches(query: string): boolean;
    matches(query: DOM): boolean;
    matches(query: DOM.kindOfNode): boolean;
    matches(query: NodeList): boolean;

    /**
     * Remove current element from body
     */
    remove(): DOM;
    /**
     * Remove given element from current element
     * @param query
     */
    remove(query: string): DOM;
    remove(query: DOM.kindOfNode): DOM;
    remove(query: DOM): DOM;

    /**
     * Replace target element with current element
     * @param target
     */
    replace(target: string): DOM;
    replace(target: DOM): DOM;
    replace(target: DOM.kindOfNode): DOM;

    /**
     * Add event listener to an element
     * @param type type of event
     * @param listener event listener
     * @param bubbles bubbling
     */
    onEvent(type: string, listener: EventListener, bubbles?: boolean): DOM;

    /**
     * Added since `v0.2.x`.
     *
     * Dispatch Event manualy to the current event
     * @param {Event} event
     */
    dispatch(event: Event): DOM;

    /**
     * Set single properties. Can be attributes or stylesheet
     * @param key
     * @param value
     */
    set(key: { [k: string]: string | number | boolean }): DOM;
    set(key: string, value: string | number | boolean): DOM;

    /**
     * Static method for creating and inserting new stylesheet into active page
     * @param css stylesheet
     * @param props other html attributes
     */
    static addStyle(css: string, props?: DOM.elementOptions): DOM;

    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param query
     */
    static create(query: DOM): DOM;
    static create(query: DOM.elementOptions | DOM.elementOptions[]): DOM;
    static create(query: string | string[]): DOM;
    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param query
     * @param opt
     */
    static create(query: string, opt?: DOM.elementOptions | DOM.elementOptions[]): DOM;
    static create(
        query: string | DOM | DOM.elementOptions | DOM.elementOptions[],
        opt?: DOM.elementOptions | DOM.elementOptions[]
    ): DOM;

    /**
     * Create an svg element
     * @param shape SVG Shape(s), can be object or array of object
     * @param attr main SVG attributes if any
     * @return
     */
    static createIcon(shape: DOM.svgElementDetails, attr?: SVGSVGElement): DOM;
    static createIcon(shape: DOM.svgElementDetails[], attr?: SVGSVGElement): DOM;

    /**
     * Static method for creating new DOM instance with new Element(s)
     * @param items
     * @param type list type
     * @param opt
     */
    static createList(items: string[]): DOM;
    static createList(items: DOM.listElementOptions[]): DOM;
    static createList(
        items: DOM.listElementOptions[] | string[],
        type?: string,
        opt?: DOM.elementOptions
    ): DOM;

    /**
     * Static method for creating new DOM instance with matched Element(s)
     * @param query
     */
    static get(query: string): DOM;
    static get(query: DOM): DOM;
    static get(query: DOM.kindOfNode): DOM;
    static get(query: ParentNode | null | undefined): DOM;
    static get(query: DOM.kindOfNode | NodeList): DOM;
    static get(query: DOM.kindOfNode | string): DOM;
    static get(query: DOM.kindOfNode | DOM): DOM;
    static get(query: string | DOM.kindOfNode | DOM): DOM;

    /**
     * Static method for creating new DOM instance and get the first element if any
     * @param query
     */
    static getFirst(query: string | DOM.kindOfNode): HTMLElement | undefined;
    static getFirst(query: string | DOM.kindOfNode | DOM): HTMLElement | undefined;

    /**
     * Static method for checking for existing Element
     * @param query target element
     * @param timeout uint miliseconds
     */
    static has(query: string, timeout?: number): Promise<HTMLElement | false>;
    static has(query: DOM, timeout?: number): Promise<HTMLElement | false>;
    static has(
        query: ParentNode | null | undefined,
        timeout?: number
    ): Promise<HTMLElement | false>;
    static has(query: DOM.kindOfNode | NodeList, timeout?: number): Promise<HTMLElement | false>;
    static has(query: DOM.kindOfNode | DOM, timeout?: number): Promise<HTMLElement | false>;

    /**
     * Static method for creating new DOM instance with no element inside
     */
    static init(): DOM;
}

function DOM(): DOM;
function DOM(...args: any[]): DOM;
function DOM(this: DOM | undefined | any, ...args: any[]) {
    if (!this || !(this instanceof DOM)) {
        if (args.length >= 1) {
            let [query, create] = args;
            return typeof create === "boolean" && create ? DOM.create(query) : DOM.get(query);
        }
        return DOM.init();
    }

    const [token, query, create] = args as [symbol, any, boolean];

    if (_token !== token) {
        throw new TypeError(
            "DOM is not constructable. " +
                "Use DOM.create(), DOM.createList(), DOM.createIcon(), " +
                "DOM.get(), DOM.has(), DOM.addStyle(), DOM.init() or DOM()."
        );
    }

    return query ? (create ? this.create(query) : this.get(query)) : this.init();
}

Object.setPrototypeOf(DOM.prototype, Base.prototype);
Object.defineProperties(DOM.prototype, _proto_);
Object.defineProperties(DOM, _static_);

export default DOM;
