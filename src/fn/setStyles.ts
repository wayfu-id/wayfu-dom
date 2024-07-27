import DOM from "../../index";

/**
 * Set Element(s) styles. Can process multiple element
 * @param styles
 * @param dom
 */
function setStyles(styles: DOM.elementStyles, dom: DOM) {
    const setStyle = (node: HTMLElement | undefined, props: CSSStyleDeclaration) => {
        if (!node) return;
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                let val: any | null = props[key];
                switch (key) {
                    case "zIndex":
                        node.style.zIndex = val;
                        break;
                    case "margin":
                        node.style.margin = val;
                        break;
                    case "padding":
                        node.style.padding = val;
                        break;
                    case "display":
                        node.style.display = val;
                        break;
                    default:
                        node.style[key] = val;
                }
            }
        }
    };

    if (Array.isArray(styles)) {
        styles.forEach(({ elm, props }) => {
            setStyle(DOM.getFirst(elm), props);
        });

        return dom;
    }

    if (dom.isEmpty) return dom;

    dom.forEach((e) => setStyle(e, styles));

    return dom;
}

export { setStyles };
