/* do not change this file, it is auto generated by storybook. */
import '@storybook/addon-ondevice-actions/register';
import '@storybook/addon-ondevice-controls/register';
import { start } from '@storybook/react-native';

const normalizedStories = [
  {
    titlePrefix: 'UI',
    directory: './components',
    files: '**/*.native.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.native.stories\.(?:ts|tsx|js|jsx)?)$/,
    // @ts-expect-error: Property 'context' does not exist on type 'NodeRequire'
    req: require.context(
      '../components',
      true,
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.native.stories\.(?:ts|tsx|js|jsx)?)$/
    ),
  },
];

// @ts-expect-error: Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
global.STORIES = normalizedStories;

export const view = start({
  annotations: [
    require('./preview'),
    require('@storybook/react-native/dist/preview'),
    require('@storybook/addon-actions/preview'),
  ],
  storyEntries: normalizedStories,
});