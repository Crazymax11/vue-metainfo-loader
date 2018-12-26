<template>
    <div>
        <button @click="$emit('$emitInHtml')">
        <button @click="this.$emit('$emitInHtmlWithArg', 1)">
    </div>
</template>
<template lang="pug">
    div
        button(
            @click="$emit('$emitInPug')"
        )
        button(
            @click="$emit('$emitInPugWithArg', 2)"
        )
</template>

<script>
/**
 * TestEvents
 */
export default {
    methods: {
        emitEvent() {
            this.$emit('$emitInJs');
            this.$emit('$emitInJsWithArg', 3);
        }
    }
}
</script>
