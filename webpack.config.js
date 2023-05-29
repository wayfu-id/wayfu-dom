import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "wayfu-dom.min.js",
        library: {
            name: "DOM",
            type: "umd",
            export: "default",
        },
    },
    // experiments: {
    //     outputModule: true,
    // },
    devtool: "source-map",
};
