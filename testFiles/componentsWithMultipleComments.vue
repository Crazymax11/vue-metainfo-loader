<script>
/**
 * @event ChangeEvent
 * @type {string} - new value
 */

/**
 * @typedef {{
 *     test: string
 * }} Prop
 */

/**
 * Awesome component
 * @emits change
 */
export default {
    props: {
        /**
         * Typed Prop
         * @type {Prop}
         */
        superProp: {
            type: Object,
        },
    }
}
</script>
