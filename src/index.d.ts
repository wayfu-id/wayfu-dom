import Base from './structures/Base';
import {
    kindOfNode,
    elemenOptions,
    listElementOptions,
    svgElementDetails,
} from '../types';

export default class DOM extends Base<HTMLElement>{
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

    // static utils: {
    //     /** Convert `snake_case` or `kebab-case` to `camelCase` string */
    //     toCamel: (string: string) => string,
    //     /** Convert `camelCase` to `kebab-case` string */
    //     toKebab: (string: string) => string,
    // };
}