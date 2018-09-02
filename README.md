# vue-metainfo-loader

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
    docs // <docs> tag content rendered in html
} = meta;

props.forEach(prop => {
    prop.tags; // JSDoc tags described before prop declaration
    prop.description; //JSDoc description
    prop.type; // prop type from JS
    prop.hasValidator; // true if property has validator
    prop.required; // is property required
    prop.default; // default value
})
```


