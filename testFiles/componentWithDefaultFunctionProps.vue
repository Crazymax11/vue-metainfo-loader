<template>
</template>
<script>

export default {
    props: {
        first: {
            type: Number,
            default() {
                return 1;
            }
        },
        second: {
            type: Number,
            default: function() {
                return 2;
            }
        }
    }
}
</script>
