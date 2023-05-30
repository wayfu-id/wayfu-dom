export type elemenOptions = ElementCreationOptions & {
    tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
    namespace?: string,
    text: string,
    html: string,
    class: string,
    classid?: string | string[],
    append?: String | HTMLElement,
    prepend?: String | HTMLElement,
    before?: String | HTMLElement,
    after?: String | HTMLElement,
    replace?: String | HTMLElement,
    event?: DocumentEventMap[],
    callback?: (node:HTMLElement) => any,
}

export type listElementOptions = elemenOptions & {
    title: string,
    content: string | string[],
}

export type svgElemenOptions = elemenOptions & {
    d: string | string[],
    dPath: string | string[],
    size?: string,
    fill?: string,
    viewBox?: string
}

export type svgElementDetails = {
    type: keyof SVGElementTagNameMap,
    data: SVGElement
};

export type kindOfNode = HTMLElement | Document | Window;

export type elementStyles = CSSStyleDeclaration | { elm : kindOfNode | String, props: CSSStyleDeclaration }[];

/**
 * Extended Built-in Array
 * @class Base
 * @classdesc An custom array extends built in array
 * @augments {Array}
 */
export class Base<T extends Object> extends Array<T> {
    /** Create an array by spliting a string with a delimiter */
    static split(string: string, delimiter: string): MyArray<String>;

    static create<T extends Object>(arrayLike: Iterable<T> | ArrayLike<T>): MyArray<T>;

    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: T[]);

    /** Get empty status current array */
    get isEmpty(): boolean;

    /** Get all non epmty array items */
    get nonEmptyValue(): MyArray<T>;

    /** Get first array item */
    get first(): T | undefined;

    /** Get last array item */
    get last(): T | undefined;

    /**
     * Change index order of an items, and return this array.
     * `Carefull: This function will override old array.`
     */
    changeIndex(oldIndex: number, newIndex: number): MyArray<T>;

    
    /** Count number of a value in current array */
    countValue(val: any): number;

    /** Check given value is on this array or not */
    isOnArray(item: any): boolean;
}

export class DOM extends Base<HTMLElement>{
    /** Create new Empty DOM Object */
    constructor(): DOM;
    /** Create new DOM with matched Element(s) from query */
    constructor(query: String | kindOfNode | NodeList): DOM;
    /** Return the current DOM */
    constructor(query: DOM): DOM;
    /** Create new DOM with created Element(s) from given properties */
    constructor(query: elemenOptions | elemenOptions[], create: true): DOM;

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
    create(props?: elemenOptions | elemenOptions[]): this;
    
    /**
     * Get some HTMLElement(s) and
     * Collect it into DOM Object
     */
    get(query?: String | kindOfNode | NodeList | DOM): this;

    /** Is current element matches with given query? */
    mathces(query: String | kindOfNode): Boolean;

    /**
     * Get some HTMLElement(s) that are parent for current element
     * and Collect it into DOM Object
     */
    getParents(query?: String | kindOfNode | DOM): DOM;

    /** Set single properties. Can be attributes or stylesheet */
    set(option: {[k:String]: String | Number | Boolean}): this;
    set(key: String, value: String | Number | Boolean): this;

    /** Set a bunch of propertes. Can be attributes or stylesheet */
    // sets(props: {[k:String]: String | Number | Boolean}): this;

    /** Remove current element or an element from current element */
    remove(query?: String | kindOfNode | DOM): this;

    /** 
     * Insert an element into current element
     * if it's non exist element, then create one
     */
    insert(element?: String | kindOfNode | DOM): this;
    insert(element?: String | elemenOptions): this;

    /** Insert current element into target element */
    insertTo(target?: String | kindOfNode | DOM): this;
    
    /** Insert current element into first child of target element */
    insertBefore(target?: String | kindOfNode | DOM, prepend?: boolean | false): this;
    
    /** Insert current element after target element */
    insertAfter(target?: String | kindOfNode | DOM): this;

    /** Replace target element with current element */
    replace(target?: String | kindOfNode | DOM): this;

    /** Add event listener to an element */
    onEvent(type: String, listener: EventListener, bubbles?: boolean): this;

    /** Static method for creating new DOM instance with new Element(s) */
    static create(tag: DOM): DOM;
    static create(tag: String, opt: elemenOptions): DOM;
    static create(prop: elemenOptions, opt?: elemenOptions): DOM;
    static create(props: elemenOptions[], opt?: elemenOptions): DOM;

    /** Static method for creating new DOM instance with new ListElement */
    static createList(items: Base<listElementOptions|String>, type: "ol" | "ul", opt?: elemenOptions): DOM;

    /** Static method for creating new DOM instance with new svg element */
    static createIcon(shape: svgElementDetails | svgElementDetails[], attr?: SVGSVGElement): DOM;
    
    /** Static method for creating new DOM instance with matched Element(s) */
    static get(query: String | kindOfNode | NodeList | DOM): DOM;
    
    /** Static method for checking for existing Element */
    static async has(query: String | HTMLElement | kindOfNode, timeout?: Number): Promise<HTMLElement | false>;
    
    /** Static method for creating and inserting new stylesheet into active page */
    static addStyle(css: String, opt?: elemenOptions): DOM;

    static utils: {
        /** Convert `snake_case` or `kebab-case` to `camelCase` string */
        toCamel: (string: string) => string,
        /** Convert `camelCase` to `kebab-case` string */
        toKebab: (string: string) => string,
    };
}