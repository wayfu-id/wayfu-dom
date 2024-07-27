import DOM from "../../index";
import { setStyles } from "./setStyles";
import { strToArr, toKebab } from "../utils/index";

/**
 * Set properties for current HTML Element
 * @param props
 * @param dom
 */
function setProperties(props: DOM.elementOptions, dom: DOM) {
    let { namespace } = props;

    delete props.namespace;
    const setProp = (node: HTMLElement & HTMLTitleElement & Node & HTMLInputElement) => {
        for (const name in props) {
            if (props.hasOwnProperty(name)) {
                let val: any | null = props[name],
                    classes: any[] = val ? strToArr(val, " ") : [];
                if (!namespace) {
                    switch (name) {
                        case "text":
                            let text =
                                "innerText" in document
                                    ? ("innerText" as "innerText")
                                    : ("textContent" as "textContent");

                            node[text] = val ? val : node[name];
                            break;
                        case "html":
                            node.innerHTML = props[name] ? props[name] : node.innerHTML;
                            break;
                        case "class":
                        case "classid":
                        case "addClass":
                            if (classes.length === 0) break;
                            if (name === "addClass") {
                                for (let cls of classes) {
                                    node.classList.add(cls);
                                }
                                break;
                            }
                            node.setAttribute("class", classes.join(" "));
                            break;
                        case "removeClass":
                            if (classes.length === 0) break;
                            for (let cls of classes) {
                                node.classList.remove(cls);
                            }
                            break;
                        case "toggleClass":
                            node.classList.toggle(val);
                            break;
                        case "disabled":
                            if (typeof val === "boolean") {
                                node.disabled = val;
                            } else if (typeof val === "string") {
                                node.disabled = val === "true";
                            } else {
                                node.disabled = false;
                            }
                            break;
                        case "append":
                            DOM(node).insertTo(val);
                            break;
                        case "prepend":
                            DOM(node).insertBefore(val, true);
                            break;
                        case "before":
                            DOM(node).insertBefore(val);
                            break;
                        case "after":
                            DOM(node).insertAfter(val);
                            break;
                        case "value":
                            node.value = val;
                            break;
                        case "dispatch":
                            node.dispatchEvent(val);
                            break;
                        case "replace":
                            DOM(node).replace(val);
                            break;
                        case "event":
                            if (val) {
                                for (const evName in val) {
                                    if (val.hasOwnProperty(evName)) {
                                        DOM(node).onEvent(evName, val[evName]);
                                    }
                                }
                            }
                            break;
                        case "callback":
                            if (val && typeof val === "function") {
                                val(node);
                            }
                            break;
                        case "readonly":
                        case "readOnly":
                            node.readOnly = val;
                            break;
                        case "style":
                            setStyles(val, dom);
                            break;
                        default:
                            let _val: any[] = [];
                            if (typeof val === "object") {
                                if (Array.isArray(val)) {
                                    _val = val;
                                } else {
                                    for (let key in val) {
                                        _val.push(`${key}:${val[key]}`);
                                    }
                                }
                                node.setAttribute(toKebab(name), _val.join(","));
                            } else {
                                node.setAttribute(toKebab(name), val);
                            }
                    }
                } else {
                    let key = name === "viewBox" ? name : toKebab(name);
                    node.setAttributeNS(null, key, val);
                }
            }
        }
    };

    if (dom.isEmpty) return dom;

    dom.forEach((e) => setProp(e));

    return dom;
}

export { setProperties };
