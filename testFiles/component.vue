<template>
</template>
<script>
/**
 * Test
 * @emits clicked when component is clicked
 * @emits changed
 * @emits statusChanged {boolean}
 * @emits anotherStatusChanged {boolean} value is a new status
 */
export default {
    props: {
        /**
         * Just a prop
         */
        sample: {
            type: Array,
            required: true
        },

        /**
         * Short prop
         * @example []
         * @customTag 123
         */
        short: Array
    }
}
</script>
