# vue-metainfo-loader

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This loader extracts from SFC:
* Component description
* Component name
* Component props
    * name
    * description
    * type
    * default
    * validator
    * required
* Component events
    * name
    * payload

## Configuring

Open your webpack config and add following lines to rules.

```js
{
    test: /\.vue$/,
    loaders: ['vue-metainfo-loader'],
    enforce: 'pre',
},
```

It adds loader in order to run before vue-loader and extract component's meta. These lines are equal to: 

```js
{
    test: /\.vue$/,
    loaders: ['vue-loader', 'vue-metainfo-loader'],
},
```


## Usage

For example, you have a component
```html
<template>
  <div>
    <h1>Awesome Counter</h1>
    <div v-for="counter in counters" :key="counter">
      <div>{{ counter }}</div>
      <button @click="increment(counter)">+</button>
      <button @click="decrement(counter)">-</button>
    </div>
  </div>
</template>

<script>
/**
 * My Awesome Counter
 * @emits increment {string} counter was requested to increment
 * @emits decrement {string} counter was requested to decrement
 */
export default {
  props: {
    // array of counters names
    counters: {
      type: Array,
      // just an empty array
      default: () => [],
      // check if all values are strings
      validator(counters) {
        return counters.every(counter => typeof counter === 'string');
      },
    },
  },
  methods: {
    increment(counter) {
      this.$emit('increment', counter);
    },
    decrement(counter) {
      this.$emit('decrement', counter);
    },
  },
};
</script>
```

You'll get next meta

```js
import Component from 'Component.vue';

const meta = Component.meta;

console.log(meta.description); // My awesome counter!
console.log(meta.props); // props
console.log(meta.events); // events
console.log(meta.customTypes); // customTypes
console.log(meta.name); // name in declaration or filename without .vue

console.log(meta);
/*

{
  customTypes: [],
  description: 'My Awesome Counter',
  events: [
    {
      description: 'counter was requested to increment',
      name: 'increment',
      payload: 'string',
    },
    {
      description: 'counter was requested to decrement',
      name: 'decrement',
      payload: 'string',
    },
  ],
  props: [
    {
      default: { description: 'just an empty array', value: '() => []' },
      description: 'array of counters names',
      name: 'counters',
      type: 'Array',
      validator: {
        description: 'check if all values are strings',
        value: `validator(counters) {
      return counters.every(counter => typeof counter === 'string');
    }`,
      },
    },
  ],
}

*/
```

More examples you can see [here](/tests)

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