<script>
import Story from '../Components/Story.vue';
import FeedbackPanel from '../ComponentStubs/FeedbackPanel.vue';

export default {
  components: {
    Story,
    FeedbackPanel,
  },
  data: () => ({
    meta: Story.meta,
    componentMeta: FeedbackPanel.meta,
  }),
};
</script>

<template>
  <div>
    <div>Story</div>
    <Story :meta="meta"></Story>
    <hr />
    <Story :meta="componentMeta">
      <template slot="example">
        <FeedbackPanel title="Feedback"></FeedbackPanel>
      </template>
    </Story>
  </div>
</template>
