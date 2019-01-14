<script>
import Story from '../Components/Story.vue';
import FeedbackPanel from '../ComponentStubs/FeedbackPanel.vue';

export default {
  components: {
    Story,
    FeedbackPanel,
  },
  data: () => ({
    meta: FeedbackPanel.meta,
  }),
};
</script>

<template>
  <div>
    <Story :meta="meta">
      <template slot="example">
        <FeedbackPanel title="Feedback"></FeedbackPanel>
      </template>
    </Story>
  </div>
</template>
