// eslint-disable-next-line import/no-extraneous-dependencies
import { configure, storiesOf } from '@storybook/vue';
import Story from './Stories/Story.vue';

function loadStories() {
  storiesOf('StorybookExample', module).add('Story', () => Story);
}

configure(loadStories, module);
