const _ = require('lodash');
const Handlebars = require('handlebars');
const { getManifests } = require('./__utils__');

const getMetadataContext = metadata => {
  const context = {};

  Object.entries(metadata).forEach(([k, v]) => {
    switch (v.type) {
      case 'string':
        context[k] = `$${k.toUpperCase()}`;
        break;
      case 'uri':
        context[k] = `https://${k}.com`;
        break;
    }
  });
  return context;
};

const getFlagLinkContext = flagLinkCapability => {
  return {
    deepLink: 'https://exampleDeeplink.com',
    metadata: getMetadataContext(flagLinkCapability.metadata),
  };
};

const compileStrictTemplate = templateString =>
  Handlebars.compile(templateString, { strict: true });

const manifests = getManifests();

const flagLinkManifests = manifests.filter(
  ([k, mfst]) => mfst.capabilities?.flagLink
);

describe('Validate flagLink Capability', () => {
  test.each(flagLinkManifests)(
    'uiBlocks template variables exist in metadata for %s',
    (key, manifest) => {
      const flagLinkCapability = manifest.capabilities.flagLink;
      const templateContext = getFlagLinkContext(flagLinkCapability);
      const { uiBlocks } = flagLinkCapability;
      const { image, title, name, description, context } = uiBlocks;
      if (image) {
        const imageTemplate = compileStrictTemplate(image.sourceUrl);
        expect(() => imageTemplate(templateContext)).not.toThrow();
      }
      if (title) {
        title.elements.forEach(e => {
          const titleElementTemplate = compileStrictTemplate(e.text);
          expect(() => titleElementTemplate(templateContext)).not.toThrow();
          if (e.url) {
            const titleElementUrlTemplate = compileStrictTemplate(e.url);
            expect(() =>
              titleElementUrlTemplate(templateContext)
            ).not.toThrow();
          }
        });
      }
      if (name) {
        const nameTemplate = compileStrictTemplate(name);
        expect(() => nameTemplate(templateContext)).not.toThrow();
      }
      if (description) {
        const descriptionTemplate = compileStrictTemplate(description);
        expect(() => descriptionTemplate(templateContext)).not.toThrow();
      }
      if (context) {
        context.elements.forEach(e => {
          const elementTemplate = compileStrictTemplate(e.text);
          expect(() => elementTemplate(templateContext)).not.toThrow();
          if (e.url) {
            const elementUrlTemplate = compileStrictTemplate(e.url);
            expect(() => elementUrlTemplate(templateContext)).not.toThrow();
          }
        });
      }
    }
  );
});
