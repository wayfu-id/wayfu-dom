<div style="text-align:center">

![logo](docs/assets/logo_white.webp#gh-dark-mode-only)
![logo](docs/assets/logo.webp#gh-light-mode-only)

</div>

> An easy Way For You to Manipulate Document Object Model (DOM)

## Install

### NPM

```
npm i --save @wayfu/wayfu-dom
```

In your app.js import and initialized the module like normal.

```js
import DOM from "@wayfu/wayfu-dom";
```

### Vanilla

If you wish to skip the modular build and NOT use npm you can use the vanilla build like so:

### CDN

```html
<script src="https://unpkg.com/@wayfu/wayfu-dom@latest/dist/wayfu-dom.min.js"></script>
```

## How to use it:

### 1. Getting Element(s)
This can be used to getting one or multiple elements at the same time.
#### Getting from global document
You can using `DOM.get(query:string)` static method to get element from global document.

```js
/** Get an element(s) and then
 * manipulate it with built-in DOM method
 */
DOM.get("query");

/**
 * You can store it in a variable too.
 * This will return a new DOM class Object
*/
let element = DOM.get("query");
```
#### Getting child elemement
Of course you can find and get child element using query. For this you need to set the parent element using `DOM.get(query:string)` static method. Then, you can use `.get(query:string)` method from your DOM object. For example:
```js
/** Let's find our div container */
let container = DOM.get("div.container");

/** Now, let's find container item from our container parent */
let cont-items = container.get(".cont-item");
/** This will return new DOM object with matched element, not modifying or overriding the parent DOM object.
```
### 2. Creating Element(s):
You can create an element(s) easily using `DOM.create()` method.
```ts
type elemenOptions = ElementCreationOptions & {
    tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
    namespace?: string,
    text?: string,
    html?: string,
    class?: string,
    classid?: string | string[],
    append?: String | HTMLElement,
    prepend?: String | HTMLElement,
    before?: String | HTMLElement,
    after?: String | HTMLElement,
    replace?: String | HTMLElement,
    event?: DocumentEventMap[],
    callback?: (node:HTMLElement) => any,
}
```

```js
/** DOM.create accept 2 params */

/** First param can be string or an object, like */
DOM.create("div"); // this will return new DOM class instance with 1 div element.
let link = DOM.create("a"); // of cource you can also store it into a variable.

/**
 * The second param is optional,
 * it must be an object contains the `elemenOptions`.
 */
let paragraph = DOM.create("p", {text: "Hello World!"});
// This will return a new DOM class object with 1 paragraph element that contains `Hello World!` text
```
#### Call `.create()` from DOM object
You can call `.create()` method as DOM prototype method from DOM created object too. This method only accept 1 parameter, that is `elemenOptions` object.

If you call this method, it will automatically `append` the new element into the previous DOM element, and it will return the new DOM object with new created element. For example:
```js
/** Let's find our container */
let container = DOM.get("div.container");

/** Now, let's create new element inside the container */
let cont-item = container.create({tag: "div", classid: "cont-item"});

/**
 * The container element now has cont-item child;
 * And the `cont-item` value is new DOM object with `div.cont-item` element.
 */
```
> Different between `.create()` and `.insert()` is:
> `.create()` will return the new DOM with new created element, instead of return the main DOM object like `.insert()` do.
### 3. Modifying Element(s)
You can modify your element(s) easily. using built-in method.
There are some method that can be used to modifying DOM element.

#### 1. Setting metthod using `.set()`
A new DOM class method have built-in `.set()` method for setting either Element property or Element styles. This mettod can accept 1 or 2 parameters. The first parameter can be an object or the key (as `string`) of the property or style. And the second param can be the value of the key.

```js
// Get the element
let link = DOM.get("a.link");

// Using an object as params
link.set({href: "https://foo.baz"}); // change href property

// Using 2 params
link.set("target", "_blank"); // change target property
link.set("color", "blue"); // change color style property
```

#### 2. Manipulate DOM
We also provide some built-in method for manipulating DOM such as inserting, replacing or deleting element.

```js
/** Let's make a container */
let container = DOM.create("div", {classid: "container"});

/** Use .insert(element) to append an element */
// Now add container item inside container
container.insert({tag: "div", classid: "cont-item"});

/** Use .insertTo(target) to inject current element to target */
// This new element will be inserted to main container
DOM.create("div", {classid: "cont-item2"}).insertTo(container);

/** Use .insertBefore(target) to inject current element as first child target element */
DOM.create("p", {id:"ph", text: "Hello World!"}).insertBefore("div.cont-item");
// This paragraph element will be inserted as first child of `cont-item`

/** Use .insertBefore(target, true) to inject current element before the target */
DOM.create("div", {classid: "cont-item0"}).insertBefore("div.cont-item", true);
// A div.cont-item0 will be added before the 'cont-item'.

/** Use .insertAfter(target) to inject current element after the target */
DOM.create("p", {id:"item", text: "Lorem Ipsum"}).insertAfter("p#ph");

/** Use .remove() to remove element */
// If no param, this method will remove current element and all it's children from body.
container.remove();
// Or you can specify the target element.
// The target element must be the children from current element.
// such as
container.remove("div.cont-item0");

/** Use .replace(target) to replace target element with current element */
DOM.create("p", {id: "desc", text: "Foo Baz"}).replace("p#id");
// This new paragraph element will be replacing the p#id element
```

### 4. Getter Properties
As an object, DOM provide some properties that can access using getter mettod.

```js
/** Let's get some post item, shall we? */
let postItems = DOM.get("div.post-items");

/**
 * .isEmpty return boolean value
 * based on any element on this current DOM Object
 */
postItems.isEmpty; // either true or false;

/**
 * .first return HTMLElement instance
 * for the first matched element
 */
let firstPost = postItems.first; // Will return HTMLElement or undefined
/** We have .last to check last matced element also */
let lastPost = postItems.last; // Will return HTMLElement or undefined

/** This getters bellow will work if there is a `first` element */
// .childNodes get the first element childNodes
postItems.childNodes; // will return DOM or undefined
// .parent to get the first element parent element
postItems.parent; // will return DOM or undefined
// .nextSibling to get next sibling element
postItems.nextSibling; // will return DOM or undefined
// .classList to get all css class from first element
postItems.classList; // will return DOMTokenList or undefined

/** Of course you can deconstruct it to variable */
// for example
let { childNodes, classList } = DOM.get("div.post-header");
```

### 5. Another usefull static method
As a Class, DOM provide some other static method besides `.get()` and `.create()`. There are...
#### 1. `DOM.createIcon()` to make a svg based element
This static method accept 2 params. The first one is caled `svgElementDetais` or array of it, and the second one is optional, that is an object for element properties.

```ts
type svgElementDetails = {
    type: keyof SVGElementTagNameMap,
    data: SVGElement
}
```

Usage:
```js
/** Single svgElementDetails */
const check = {
    type: "polyline",
    data: {
        points: "1 1 5 5 9 1",
    },
};

/** Array of svgElementDetails */
const download = [
    {
        type: "path",
        data: {
            fill: "currentColor",
            d: "M18.948 11.112C18.511 7.67 15.563 5 12.004 5c-2.756 0-5.15 1.611-6.243 4.15-2.148.642-3.757 2.67-3.757 4.85 0 2.757 2.243 5 5 5h1v-2h-1c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.757 2.673-3.016l.581-.102.192-.558C8.153 8.273 9.898 7 12.004 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-2v2h2c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z",
        },
    },
    {
        type: "path",
        data: {
            fill: "currentColor",
            d: "M13.004 14v-4h-2v4h-3l4 5 4-5z",
        },
    },
];

/** Convert to Element */
// Using 1 params
let checkIcon = DOM.createIcon(check);

// Using 2 params to set current svg properties
let downloadIcon = DOM.createIcon(download, {
    height: "24", // set the icon height
    width: "24", // set the icon width
    viewBox: "0 0 128 128", // set svg view-box
    classid: "download-ico" // set svg css class
});

/** This static method will return a DOM Object */
// So it can use it's built-in method too, for example
downloadIcon.insertTo("span.btn-download");
// or
checkIcon.insertAfter("span.success-toast-header");
```

#### 2. `DOM.createList()` to make a list element (`"ol"|"ul"`)
This method accept 3 parameters. The first parameter the item list, it can be an array of string or an array of `listElementOptions`. 
```ts
type listElementOptions = elemenOptions & {
    title: string,
    type: "ol" | "ul",
    content: string | string[] | listElementOptions[],
}
```
The second parameter is the list type either `ul` or `ol`, (by default using `ol`). And the last parameter is an object of `elementOptions`.

Usage:
```js
const item = [
    "foo",
    "bar",
    "baz",
    {
        title: "main",
        type: "ol",
        content: [
            "foo bar",
            "foo baz"
        ]
    }
];

// Support for nasted list
let list = DOM.createList(item, "ul");

/** This static method will return a DOM Object */
// So it can use it's built-in method too, for example
list.insertTo("div.post-body");
```
#### 3. `DOM.addStyle()` to inject `style` element inside `head`
This method accept 2 parameter. The first parameter is css stylesheet as `string`. And the second parameter is optional, it should be an `elementOptions` object.

Usage:
```js
// Custom css
const css = "a.link{color: 'blue'}";

// Inject it to head
DOM.addStyle(css, {id: "custom-css"});
```
#### 4. `DOM.has()` to check the target element is exsist or not
This method accept 2 parameter. The first parameter can be query element as `string` and the second parameter is number of the interval (by default is `10`). The interval itself is 1 second.

This method Retrun a `Promise`. If the target element is exsist, then return it as `HTMLElement` instance, and return `false` if the target is not exsist after reaching interval.

Usage:
```js
// Because its a promise, you should use `async ~ await` function to make it syncronous
async someFunction(){
    /** Let's check comment container */
    let isCommentLoad = await DOM.has("div#comments");

    if(isCommentLoad) {
        // do something;
    } else {
        // do something
    }
}
```
## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.
## License

Copyright &copy; 2023 [Wayfu](https://github.com/wayfu-id) under [ISC](LICENSE) License