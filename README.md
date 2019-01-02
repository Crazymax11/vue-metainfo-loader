# vue-metainfo-loader

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This loader extracts from SFC:
* JSDoc about component
* JSDoc and definition of props
* Emitted events

## Example

```js
// use inline loader description style
import meta from '!!vue-metainfo-loader!path-to-vue-component.vue';

const {
    events, // events are emitted in SFC
    tags, // JSDoc tags described before default export
    props, // props definitions consist of JSDoc and JS prop declaration
    description, // JSDoc description
    comments, // All comments described before default export
    docs, // <docs> tag content rendered in html,
    customTypes, // defined @typedef in JSDoc comments
} = meta;

props.forEach(prop => {
    prop.tags; // JSDoc tags described before prop declaration
    prop.description; // JSDoc description
    prop.type; // prop type from JS
    prop.validator; // true if property has validator
    prop.required; // is property required
    prop.default; // default value
})
```


## Custom JSDoc types

We support [jsdoc typedefs](http://usejsdoc.org/tags-typedef.html) with following limitation:
* Section `Using @typedef to document a complex type for a class ` is not supported at all. It's not supported by VSCode, so you should use this format at real world.

If you want to present optional parameter you should write something like below (look at `description` property definition)

```js
/**
 * multiline
 * @typedef {{
 *      title: string,
 *      description: (string | undefined),
 *      type: Object,
 *      name: string
 * }} MultiLineWithManyProps
 */
```

All defined typedefs stored in `customTypes` property of resulting metainfo.