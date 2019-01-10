<template>
  <div />
</template>

<script>
export default {
  props: {
    validatorArrowFunction: {
      validator: () => true,
    },

    validatorMethod: {
      validator(value) {
        return [1, 2, 3].includes(value);
      },
    },

    validatorFunction: {
      validator: validatorStub,
    },

    noValidator: {
      default: true,
    },
  },
};

function validatorStub() {}
</script>
