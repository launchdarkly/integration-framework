const { getManifests } = require('./__utils__');

const manifests = getManifests();

const manifestsWithCapability = manifests.filter(
  ([dir, mfst]) => !!mfst.capabilities?.syncedSegment
);

// test a happy path because jest test fails when there no manifest with the capability defined to run in the jest test suite
manifestsWithCapability.push([
  'dummy_manifest',
  {
    capabilities: {
      syncedSegment: {
        requestParser: {
          environmentIdPath: '/environmentId',
          cohortIdPath: '/batch[0]/cohortId',
          cohortNamePath: '/batch[0]/cohortName',
          cohortUrlPath: '/batch[0]/cohortUrl',
          memberArrayPath: '/batch',
          arrayInclusion: {
            path: '/action',
            matcher: '^(members|add_members)$',
          },
          memberArrayParser: {
            memberIdPath: '/userId',
            booleanMembershipPath: '/value',
          },
        },
      },
    },
  },
]);

describe('Validate Synced Segment Capability Dependencies', () => {
  manifestsWithCapability.forEach(([_, manifest]) => {
    test(`${manifest.name} syncedSegement capability: addMemberArrayPath is required when removeMemberArrayPath is specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.removeMemberArrayPath) {
        expect(rp.addMemberArrayPath).toBeDefined();
      }
    });

    test(`${manifest.name} syncedSegement capability: removeMemberArrayPath is required when addMemberArrayPath is specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.addMemberArrayPath) {
        expect(rp.removeMemberArrayPath).toBeDefined();
      }
    });

    test(`${manifest.name} syncedSegement capability: memberArrayPath should not be specified when addMemberArrayPath or removeMemberArrayPath are specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.addMemberArrayPath || !!rp.removeMemberArrayPath) {
        expect(rp.memberArrayPath).toBeUndefined();
      }
    });

    test(`${manifest.name} syncedSegement capability: memberArrayPath should be specified when arrayInclusion is specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.arrayInclusion) {
        expect(rp.memberArrayPath).toBeDefined();
      }
    });

    test(`${manifest.name} syncedSegement capability: arrayInclusion should not be specified when addMemberArrayPath or removeMemberArrayPath are specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.addMemberArrayPath || !!rp.removeMemberArrayPath) {
        expect(rp.arrayInclusion).toBeUndefined();
      }
    });

    test(`${manifest.name} syncedSegement capability: memberArrayParser.booleanMembershipPath should be specified when memberArrayPath is specified`, () => {
      const rp = manifest.capabilities.syncedSegment?.requestParser;
      if (!!rp?.memberArrayParser?.booleanMembershipPath) {
        expect(rp.memberArrayPath).toBeDefined();
      }
    });
  });
});
