const { readdirSync } = require('fs');
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

const getManifests = () => {
  const manifests = [];
  const integrationDirs = getDirectories('./integrations');
  integrationDirs.forEach(dir => {
    const manifest = require(`../../integrations/${dir}/manifest.json`);
    manifests.push([dir, manifest]);
  });
  return manifests;
};

module.exports = { getManifests };
