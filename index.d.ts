import Base from "./src/baseClass";
import { kindOfNode, elemenOptions, listElementOptions, svgElementDetails, } from "./types";

/**
 * Just a DOM Class using extended custom Array
 */
export default class DOM extends Base<HTMLElement>{
    /** Create new Empty DOM Object */
    constructor();
    /** Create new DOM with matched Element(s) from query */
    constructor(query: string | kindOfNode | NodeList);
    /** Return the current DOM */
    constructor(query: DOM);
    /** Create new DOM with created Element(s) from given properties */
    constructor(query: elemenOptions | elemenOptions[], create: true);

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
    get(query?: string | kindOfNode | NodeList | DOM): this;

    /** Is current element matches with given query? */
    mathces(query: string | kindOfNode): Boolean;

    /**
     * Get some HTMLElement(s) that are parent for current element
     * and Collect it into DOM Object
     */
    getParents(query?: string | kindOfNode | DOM): DOM;

    /** Set single properties. Can be attributes or stylesheet */
    set(option: {[k:string]: string | Number | Boolean}): this;
    set(key: string, value: string | Number | Boolean): this;

    /** Set a bunch of propertes. Can be attributes or stylesheet */
    // sets(props: {[k:string]: string | Number | Boolean}): this;

    /** Remove current element or an element from current element */
    remove(query?: string | kindOfNode | DOM): this;

    /** 
     * Insert an element into current element
     * if it's non exist element, then create one
     */
    insert(element?: string | kindOfNode | DOM): this;
    insert(element?: string | elemenOptions): this;

    /** Insert current element into target element */
    insertTo(target?: string | kindOfNode | DOM): this;
    
    /** Insert current element into first child of target element */
    insertBefore(target?: string | kindOfNode | DOM, prepend?: boolean | false): this;
    
    /** Insert current element after target element */
    insertAfter(target?: string | kindOfNode | DOM): this;

    /** Replace target element with current element */
    replace(target?: string | kindOfNode | DOM): this;

    /** Add event listener to an element */
    onEvent(type: string, listener: EventListener, bubbles?: boolean): this;

    /** Static method for creating new DOM instance with new Element(s) */
    static create(tag: string, opt: elemenOptions): DOM;
    static create(tag: elemenOptions, opt?: elemenOptions): DOM;
    static create(tag: elemenOptions[], opt?: elemenOptions): DOM;
    static create(tag: DOM): DOM;

    /** Static method for creating new DOM instance with new ListElement */
    static createList(items: Array<listElementOptions|string>, type: "ol" | "ul", opt?: elemenOptions): DOM;

    /** Static method for creating new DOM instance with new svg element */
    static createIcon(shape: svgElementDetails | svgElementDetails[], attr?: SVGSVGElement): DOM;
    
    /** Static method for creating new DOM instance with matched Element(s) */
    static get(query: string | kindOfNode | NodeList | DOM): DOM;
    
    /** Static method for checking for existing Element */
    static has(query: string | HTMLElement | kindOfNode): Promise<HTMLElement | false>;
    static has(query: string | HTMLElement | kindOfNode, timeout?: Number): Promise<HTMLElement | false>;
    
    /** Static method for creating and inserting new stylesheet into active page */
    static addStyle(css: string, opt?: elemenOptions): DOM;
}

export { kindOfNode, elemenOptions, listElementOptions, svgElementDetails };
export { svgElemenOptions, elementStyles } from "./types"