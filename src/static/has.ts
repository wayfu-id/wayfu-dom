import DOM from "../../index";

const has: PropertyDescriptor = {
    value: async function has(query: any, stack?: number): Promise<HTMLElement | false> {
        return new Promise((done) => {
            let timeout = stack ? stack : 10;
            let loop = setInterval(() => {
                let first = DOM.getFirst(query);
                if (first) {
                    done(first);
                    clearInterval(loop);
                }
                if ((timeout -= 1) == 0) {
                    done(false);
                    clearInterval(loop);
                }
            }, 1e3);
        });
    },
    enumerable: true,
    configurable: false,
};

export { has };
