const pluginWebc = require('@11ty/eleventy-plugin-webc');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_includes/components/*.webc',
  });

  eleventyConfig.addCollection('events', function (collectionApi) {
    const events = collectionApi.getFilteredByGlob('src/data/events/*.md');
    console.log('Events collection:', events);
    return events;
  });

  eleventyConfig.addPassthroughCopy('src/css');

  console.log('Eleventy config loaded');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    templateFormats: ['md', 'webc', 'html', 'njk'],
  };
};
