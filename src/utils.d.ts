import { kindOfNode } from "../types";

/** Convert `snake_case` or `kebab-case` to `camelCase` string */
export function toCamel(string: String): string;

/** Convert `camelCase` to `kebab-case` string */
export function toKebab(string: String): string;

/** Check the given query is belongs to Node type or not */
export function isNode(query: kindOfNode | String): boolean;