import SkillList from './SkillList.vue';
import { contentfulStory } from '../../.storybook/contentful';

export default {
  title: 'Contentful/Skill List',
  component: SkillList,
  ...contentfulStory('skillList'),
};

export const Default = {
  render: (args, { loaded }) => ({
    components: { SkillList },
    setup: () => ({ fields: loaded.entry.fields }),
    template: '<SkillList :content="fields" />',
  }),
};
