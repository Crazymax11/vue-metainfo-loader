<template>
</template>

<script>
export default {
    methods: {
        emitEvent() {
            this.$emit('updateFieldValue', { field, value: get(event, 'target.value', '') });
        }
    }
}
</script>
