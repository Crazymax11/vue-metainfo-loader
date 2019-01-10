<template>
  <div>
    <div>PROPS TABLE</div>
    <PropsTable :props="meta.props" />
  </div>
</template>

<script>
// eslint-disable-next-line
import meta from '!!loader!../Components/PropsTable.vue';
import PropsTable from '../Components/PropsTable.vue';

export default {
  components: {
    PropsTable,
  },
  data: () => ({
    meta,
  }),
};
</script>
