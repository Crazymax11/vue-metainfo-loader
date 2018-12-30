<template>
  <div />
</template>
<script>
/**
 * short description
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * short description
 * A number, or a string containing a number.
 * @typedef {number} NumberAlias
 */

/**
 * short description of object
 * Point in x, y space
 * @typedef {{x: number, y: number}} Point
 */

/**
 * long description
 * Point in x, y space
 * @typedef {Object} XYPoint
 * @property {number} x - x coordinate
 * @property {number} y - y coordinate
 */

/**
 * multiline
 * @typedef {{
 *     test: string
 * }} MultineLineWithOneProp
 */

/**
 * multiline
 * @typedef {{
 *      title: string,
 *      description: string,
 *      type?: Object,
 *      name: string
 * }} MultiLineWithManyProps
 */

/**
 * component with custom types
 */
export default {};
</script>
