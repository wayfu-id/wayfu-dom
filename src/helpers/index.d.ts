import DOM from "../DOM";
import { elemenOptions, svgElemenOptions, elementStyles } from "../../types";

/**
 * Creating new DOM Instance with new Element(s)
 * and Collect it into DOM Object
 */
export function createElement(props: elemenOptions | svgElemenOptions): DOM;
export function createElement(props: elemenOptions | svgElemenOptions, dom_: DOM): DOM;

/**
 * Method for geting Element(s)
 * and Collect it into DOM Object
 */
export function getElement(query: String): DOM
export function getElement(query: String, dom_: DOM): DOM

/** Set properties for given DOM Element */
export function setProperties(props: elemenOptions, dom: DOM): DOM

/** Set style(s) for given DOM Element */
export function setStyles(styles: elementStyles, dom: DOM): DOM;
