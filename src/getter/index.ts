import { childNodes } from "./childNodes";
import { classList } from "./classList";
import { nextSibling } from "./nextSibling";
import { parent } from "./parent";

const getter: PropertyDescriptorMap = {
    childNodes,
    classList,
    nextSibling,
    parent,
};

export default getter;
