import { create } from "./create";
import { dispatch } from "./dispatch";
import { get } from "./get";
import { getParents } from "./getParents";
import { init } from "./init";
import { insert } from "./insert";
import { insertAfter } from "./insertAfter";
import { insertBefore } from "./insertBefore";
import { insertTo } from "./insertTo";
import { matches } from "./matches";
import { onEvent } from "./onEvent";
import { remove } from "./remove";
import { replace } from "./replace";
import { set } from "./set";

const core: PropertyDescriptorMap = {
    create,
    dispatch,
    get,
    getParents,
    init,
    insert,
    insertAfter,
    insertBefore,
    insertTo,
    matches,
    onEvent,
    remove,
    replace,
    set,
};

export default core;
