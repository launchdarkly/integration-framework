import { readdirSync } from 'fs';
import { LaunchDarklyIntegrationsManifest } from '../../../manifest.schema';

type ManifestDirectory = [string, LaunchDarklyIntegrationsManifest];

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

export const getManifests = (): ManifestDirectory[] => {
  const manifests: ManifestDirectory[] = [];

  const integrationDirs = getDirectories('./integrations');
  integrationDirs.forEach(dir => {
    const manifest = require(`../../../integrations/${dir}/manifest.json`);
    manifests.push([dir, manifest]);
  });

  return manifests;
};

export const getManifest = (
  integrationKey: string
): LaunchDarklyIntegrationsManifest | undefined => {
  const manifests = getManifests();

  const manifestAndDir = manifests.find(([key, mfst]) => {
    return (key as string)?.toLowerCase() == integrationKey?.toLowerCase();
  });

  if (!manifestAndDir) {
    return undefined;
  }

  const [_, manifest] = manifestAndDir;

  return manifest;
};
