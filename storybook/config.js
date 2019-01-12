// eslint-disable-next-line import/no-extraneous-dependencies
import { configure, storiesOf } from '@storybook/vue';

import PropsTable from './Stories/PropsTable.vue';
import Story from './Stories/Story.vue';

function loadStories() {
  storiesOf('StorybookExample', module)
    .add('PropsTable', () => PropsTable)
    .add('Story', () => Story);
}

configure(loadStories, module);
