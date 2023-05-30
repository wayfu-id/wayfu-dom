import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const dir = dirname(fileURLToPath(import.meta.url));

export default {
    entry: "./index.js",
    output: {
        path: resolve(dir, "./dist"),
        filename: "wayfu-dom.min.js",
        library: {
            name: "DOM",
            type: "umd",
            export: "default",
        },
    },
    devtool: "source-map",
};
