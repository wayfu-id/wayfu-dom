import Base from "./base";
import core from "./core/index";
import getter from "./getter/index";
import staticFn from "./static/index";
import { VERSION, _token } from "./constant";

const _proto_ = Object.assign({}, core, getter, { VERSION });
const _static_ = Object.assign({}, staticFn, { VERSION });

export { Base as default, _proto_, _static_, _token };
