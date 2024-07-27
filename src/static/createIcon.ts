import DOM from "../../index";

const createIcon: PropertyDescriptor = {
    value: function createIcon(shape: any, attr?: SVGSVGElement): DOM {
        const checkOpt = (opt: any) => {
            const deconstructSize = (size: string) => {
                return size.split(" ").length == 1 ? [size, size] : size.split(" ");
            };
            let newOpt: { [k: string]: string } = {};
            for (const key in opt) {
                if (key !== "size") {
                    newOpt[key] = opt[key];
                } else {
                    let [width, height] = deconstructSize(opt[key]);
                    Object.assign(newOpt, { width, height });
                }
            }
            return newOpt;
        };

        const namespace = "http://www.w3.org/2000/svg",
            svgDOM = DOM.create("svg", { namespace, ...checkOpt(attr) }),
            shapes = Array.isArray(shape) ? shape : [shape];

        shapes.forEach(({ type: tag, data }) => {
            svgDOM.insert({ tag, namespace, ...checkOpt(data) });
        });

        return svgDOM;
    },
    enumerable: true,
    configurable: false,
};

export { createIcon };
