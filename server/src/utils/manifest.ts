import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { LaunchDarklyIntegrationsManifest } from '../../../manifest.schema';

type ManifestDirectory = [string, LaunchDarklyIntegrationsManifest];

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

export const readJson = (path: string) => {
  try {
    const data = readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(
      `error occurred while reading json file at path ${path}: ${
        (err as Error).message
      }`
    );
  }
};

export const getManifests = (): ManifestDirectory[] => {
  const manifests: ManifestDirectory[] = [];

  const integrationDirs = getDirectories('./integrations');
  integrationDirs.forEach(dir => {
    const manifestPath = path.resolve(`./integrations/${dir}/manifest.json`);
    const manifest = readJson(manifestPath);
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
