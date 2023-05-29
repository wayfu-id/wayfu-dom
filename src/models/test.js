var SYLECTRA = function (selector) {
    if (selector.indexOf("#") > 0) {
        selector = selector.split("#");
        selector = "#" + selector[selector.length - 1];
    }
    selector = selector.split(" ");

    var ret_arr = [];

    const functs = {
        // @param `sel` string : the id of an element
        id: function (sel) {
            return document.getElementById(sel);
        },
        // @param `c_or_e` string : defines whether we're getting by class or element name; is either 'class' or 'elements'
        // @param `sel` string : a class name
        // @param `par` Node or NodeList (optional) : the parent element(s) for the selector; defaults to `document`
        get: function (type, sel, par) {
            var i = 0,
                arr = [],
                get_what =
                    type === "class" ? "getElementsByClassName" : "getElementsByTagName";
            if (par.length) {
                while (par[i]) {
                    Array.prototype.push.apply(
                        arr,
                        Array.prototype.slice.call(par[i++][get_what](sel))
                    );
                }
            } else {
                arr = par[get_what](sel);
            }
            return arr.length === 1 ? arr[0] : arr;
        },
    };

    let len = selector.length,
        curr_col = document;

    for (let i = 0; i < len; i++) {
        let element = selector[i],
            par = curr_col;
        if (element.indexOf("#") === 0) {
            curr_col = functs.id(element.split("#")[1]);
        } else if (element.indexOf(".") > -1) {
            element = element.split(".");
            if (element[0]) {
                // if there's an element prefixed on the class name
                par = functs.get("elements", element[0], par);
                if (par.length) {
                    for (i = 0; par[i]; i++) {
                        if (par[i].className.indexOf(element[1]) > -1) {
                            ret_arr.push(par[i]);
                        }
                    }
                    curr_col = ret_arr;
                } else {
                    curr_col = par.className.indexOf(element[1]) > -1 ? par : [];
                }
            } else {
                curr_col = functs.get("class", element[1], par);
            }
        } else {
            // regular element selector
            curr_col = functs.get("elements", element, par);
        }
    }

    return curr_col;
};
