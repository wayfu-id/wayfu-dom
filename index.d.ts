declare namespace DOM {
    export interface elementOptions extends ElementCreationOptions {
        tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
        namespace?: string;
        text: string;
        html: string;
        class: string;
        classid?: string | string[];
        append?: String | HTMLElement;
        prepend?: String | HTMLElement;
        before?: String | HTMLElement;
        after?: String | HTMLElement;
        replace?: String | HTMLElement;
        event?: DocumentEventMap[];
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
        | { elm: kindOfNode | String; props: CSSStyleDeclaration }[];

    export interface helper {
        createElement(props: elementOptions | svgElementOptions, dom_: DOM): DOM;
        getElement(query: String, dom_: DOM): DOM;
        setProperties(props: elementOptions, dom: DOM): DOM;
        setStyles(styles: elementStyles, dom: DOM): DOM;
    }
    export interface Utils {
        /** Convert string to array of string */
        strToArr(input: string | string[]): string[];
        /** Convert string to array of string with custom delimiter */
        strToArr(input: string | string[], delimiter: string): string[];
        /** Convert `snake_case` or `kebab-case` to `camelCase` string */
        toCamel(string: String): string;
        /** Convert `camelCase` to `kebab-case` string */
        toKebab(string: String): string;
        /** Check the given query is belongs to Node type or not */
        isNode(query: kindOfNode | String): boolean;
    }
}

/** Extended Built-in Array */
declare class Base<T extends Object> extends Array<T> {
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: T[]);
    /** Get empty status current array */
    get isEmpty(): boolean;
    /** Get all non epmty array items */
    get nonEmptyValue(): Base<T>;
    /** Get first array item */
    get first(): T | undefined;
    /** Get last array item */
    get last(): T | undefined;
    /**
     * Change index order of an items, and return this array.
     * `Carefull: This function will override old array.`
     */
    changeIndex(oldIndex: number, newIndex: number): Base<T>;
    /** Count number of a value in current array */
    countValue(val: any): number;
    /** Check given value is on this array or not */
    isOnArray(item: any): boolean;
    /** Create an array by spliting a string with a delimiter */
    static split(string: string, delimiter: string): Base<String>;
}

/**
 * Just a DOM Class using extended custom Array
 */
declare class DOM extends Base<HTMLElement> {
    /** Create new Empty DOM Object */
    private constructor();
    /** Create new DOM with matched Element(s) from query */
    private constructor(query: string | DOM.kindOfNode | NodeList);
    /** Return the current DOM */
    private constructor(query: DOM);
    /** Create new DOM with created Element(s) from given properties */
    private constructor(query: DOM.elementOptions | DOM.elementOptions[], create: true);

    /** Get current element childNodes */
    get childNodes(): NodeListOf<ChildNode> | undefined;
    /** Get current element parent */
    get parent(): ParentNode | undefined;
    /** Get current next sibling element */
    get nextSibling(): ChildNode | undefined;
    /** Get current element classList*/
    get classList(): DOMTokenList | undefined;
    /**
     * Create new HTMLElement(s) and
     * Collect it into DOM Object
     */
    create(props?: DOM.elementOptions | DOM.elementOptions[]): this;

    /**
     * Get some HTMLElement(s) and
     * Collect it into DOM Object
     */
    get(query?: string | DOM.kindOfNode | NodeList | DOM): this;

    /** Is current element matches with given query? */
    mathces(query: string | DOM.kindOfNode): Boolean;

    /**
     * Get some HTMLElement(s) that are parent for current element
     * and Collect it into DOM Object
     */
    getParents(query?: string | DOM.kindOfNode | DOM): DOM;

    /** Set single properties. Can be attributes or stylesheet */
    set(option: { [k: string]: string | Number | Boolean }): this;
    set(key: string, value: string | Number | Boolean): this;

    /** Set a bunch of propertes. Can be attributes or stylesheet */
    // sets(props: {[k:string]: string | Number | Boolean}): this;

    /** Remove current element from body */
    remove(): this;
    /** Remove given element from current element */
    remove(query?: string | DOM.kindOfNode | DOM): this;

    /**
     * Insert an element into current element
     * if it's non exist element, then create one
     */
    insert(element?: string | DOM.kindOfNode | DOM): this;
    insert(element?: string | DOM.elementOptions): this;

    /** Insert current element into target element */
    insertTo(target?: string | DOM.kindOfNode | DOM): this;

    /** Insert current element into first child of target element */
    insertBefore(target?: string | DOM.kindOfNode | DOM, prepend?: boolean | false): this;

    /** Insert current element after target element */
    insertAfter(target?: string | DOM.kindOfNode | DOM): this;

    /** Replace target element with current element */
    replace(target?: string | DOM.kindOfNode | DOM): this;

    /** Add event listener to an element */
    onEvent(type: string, listener: EventListener, bubbles?: boolean): this;

    /** Added since `v0.2.x`.*/
    /** Dispatch Event manualy to the current event */
    dispatch(event: Event): this;

    /** Static method for creating new DOM instance with new Element(s) */
    static create(tag: string, opt: DOM.elementOptions): DOM;
    static create(tag: DOM.elementOptions, opt?: DOM.elementOptions): DOM;
    static create(tag: DOM.elementOptions[], opt?: DOM.elementOptions): DOM;
    static create(tag: DOM): DOM;

    /** Static method for creating new DOM instance with new ListElement */
    static createList(
        items: Array<DOM.listElementOptions | string>,
        type: "ol" | "ul",
        opt?: DOM.elementOptions
    ): DOM;

    /** Static method for creating new DOM instance with new svg element */
    static createIcon(shape: DOM.svgElementDetails | DOM.svgElementDetails[], attr?: SVGSVGElement): DOM;

    /** Static method for creating new DOM instance with matched Element(s) */
    static get(query: string | DOM.kindOfNode | NodeList | DOM): DOM;

    /** Static method for checking for existing Element */
    static has(query: string | HTMLElement | DOM.kindOfNode): Promise<HTMLElement | false>;
    static has(query: string | HTMLElement | DOM.kindOfNode, timeout?: Number): Promise<HTMLElement | false>;

    /** Static method for creating and inserting new stylesheet into active page */
    static addStyle(css: string, opt?: DOM.elementOptions): DOM;

    static Utils: DOM.Utils;
}

export default DOM;
