<template>
  <div>
    <div>PROPS TABLE</div>
    <PropsTable :props="meta.props" />
  </div>
</template>

<script>
import PropsTable from '../Components/PropsTable.vue';

export default {
  components: {
    PropsTable,
  },
  data: () => ({
    meta: PropsTable.meta,
  }),
};
</script>
