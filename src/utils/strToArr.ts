/**
 * Convert string to array of string
 * @param input
 */
function strToArr(input: string): string[];
function strToArr(input: string[]): string[];
/**
 * Convert string to array of string
 * @param input
 * @param delimiter by default using space
 */
function strToArr(input: string, delimiter?: string): string[];
function strToArr(input: string | string[], delimiter: string = " ") {
    return Array.isArray(input) ? input : typeof input === "string" ? input.split(delimiter) : [];
}

export { strToArr };
