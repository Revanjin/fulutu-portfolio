import { createClient } from 'contentful';
import store from '@/store';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const client =
  space && accessToken ? createClient({ space, accessToken }) : null;

async function fetchEntries(contentType, locale) {
  if (!client) return [];
  const response = await client.getEntries({
    content_type: contentType,
    include: 3,
    locale,
  });
  return response.items;
}

// SocialsComponent reads its links from the store, the same way App.vue fills it.
export async function loadSocialMedia({ globals }) {
  try {
    store.commit(
      'setSocialMedia',
      await fetchEntries('globalSocialMedia', globals.locale),
    );
  } catch {
    store.commit('setSocialMedia', []);
  }
  return {};
}

const EmptyState = {
  props: { message: String },
  template: '<p class="sb-empty">{{ message }}</p>',
};

function emptyMessage(contentType, { entries, error }, index) {
  if (error) {
    return `Loading "${contentType}" from Contentful failed (${error.message}). Check your connection and reload the story.`;
  }
  if (!client) {
    return 'Contentful is not configured. Add VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN to .env and restart Storybook.';
  }
  if (!entries.length) {
    return `There are no "${contentType}" entries in this locale yet. Create one in Contentful or switch the locale in the toolbar.`;
  }
  return `Entry ${index} does not exist. Pick a number between 0 and ${entries.length - 1}.`;
}

// Spread into a story's default export. The story's render function reads
// the picked entry from `loaded.entry`.
export function contentfulStory(contentType) {
  return {
    loaders: [
      async ({ globals, args }) => {
        try {
          const entries = await fetchEntries(contentType, globals.locale);
          return { entries, entry: entries[args.entry] };
        } catch (error) {
          return { entries: [], error };
        }
      },
    ],
    args: { entry: 0 },
    argTypes: {
      entry: {
        description: `Index of the "${contentType}" entry in Contentful`,
        control: { type: 'number', min: 0 },
      },
    },
    decorators: [
      (story, { loaded, args }) =>
        loaded.entry
          ? story()
          : {
              components: { EmptyState },
              setup: () => ({
                message: emptyMessage(contentType, loaded, args.entry),
              }),
              template: '<EmptyState :message="message" />',
            },
    ],
  };
}
