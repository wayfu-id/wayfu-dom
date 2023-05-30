import DOM from "..";
import {
    elementOptions,
    elementStyles,
    svgElemenOptions
} from "../types";

/** Actual method for creating Element(s) and Collect it into DOM Object */
export function createElement(props: elemenOptions | svgElemenOptions, dom_: DOM): DOM;

/** Method for geting Element(s) and Collect it into DOM Object */
export function getElement(query: String, dom_: DOM): DOM;

/** Set properties for current HTML Element */
export function setProperties(props: elementOptions, dom: DOM): DOM;

/** Set Element(s) styles. Can process multiple element */
export function setStyles(styles: elementStyles, dom: DOM): DOM;