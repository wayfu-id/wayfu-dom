import { kindOfNode } from "../types";

/** Convert string to array of string */
export function strToArr(input: string | string[]): string[];
/** Convert string to array of string with custom delimiter */
export function strToArr(input: string | string[], delimiter: string): string[];

/** Convert `snake_case` or `kebab-case` to `camelCase` string */
export function toCamel(string: String): string;

/** Convert `camelCase` to `kebab-case` string */
export function toKebab(string: String): string;

/** Check the given query is belongs to Node type or not */
export function isNode(query: kindOfNode | String): boolean;