/**
 * Extended Built-in Array
 * @class Base
 * @classdesc An custom array extends built in array
 */
export default class Base<Data extends any> extends Array {
    /**
     * Get empty status current array
     */
    get isEmpty() {
        return this.length <= 0;
    }

    /**
     * Get all non epmty array items
     */
    get nonEmptyValue(): Data[] {
        return this.filter((val) => !!val);
    }

    /**
     * Get first array item
     */
    get first(): Data | undefined {
        return !this.isEmpty ? this.at(0) : undefined;
    }

    /**
     * Get last array item
     */
    get last(): Data | undefined {
        return !this.isEmpty ? this.at(this.length - 1) : undefined;
    }

    /**
     * Change index order of an items, and return this array.
     * `Carefull: This function will override old array.`
     * @param {number} oldIndex
     * @param {number} newIndex
     */
    changeIndex(oldIndex: number, newIndex: number) {
        if (newIndex >= this.length) {
            let i = newIndex - this.length + 1;
            while (i--) {
                this.push(undefined);
            }
        }
        this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
        return this;
    }

    /**
     * Count number of a value in current array;
     * @param {any} val
     */
    countValue(val: any) {
        let count = 0;
        this.forEach((e) => {
            count += e === val ? 1 : 0;
        });
        return count;
    }

    /**
     * Check given value is on this array or not
     * @param {any} item
     */
    isOnArray(item: any) {
        return this.some((elm) => item === elm);
    }
}
