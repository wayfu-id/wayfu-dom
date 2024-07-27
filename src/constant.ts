// Local token to prevent instatiating with keyword `new`
const _token = Symbol();

// Property descriptor for Version Info
const VERSION: PropertyDescriptor = {
    value: __VERSION__,
    enumerable: true,
    configurable: false,
};

export { _token, VERSION };
