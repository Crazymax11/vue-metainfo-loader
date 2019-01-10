// eslint-disable-next-line import/no-extraneous-dependencies
import { configure, storiesOf } from '@storybook/vue';

import PropsTable from './Stories/PropsTable.vue';

function loadStories() {
  storiesOf('StorybookExample', module).add('PropsTable', () => PropsTable);
}

configure(loadStories, module);
