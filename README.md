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
    comments, // All comments described before default export
    docs // <docs> tag content rendered in html
} = meta;

props.forEach(prop => {
    prop.tags; // JSDoc tags described before prop declaration
    prop.description; // JSDoc description
    prop.type; // prop type from JS
    prop.hasValidator; // true if property has validator
    prop.required; // is property required
    prop.default; // default value
})
```


## Contributing

1. Fork it.
2. Write feature and test for it.
3. Use [git commitizen](https://github.com/commitizen/cz-cli) to commit. Type `npx git-cz` in repository directory.
4. Open a PR.
5. Thanks for contributing!