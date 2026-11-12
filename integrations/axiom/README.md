# Axiom

The Axiom integration connects LaunchDarkly flag changes and Axiom monitor alerts.
End-user documentation: [LaunchDarkly and Axiom](https://axiom.co/docs/apps/launchdarkly).

## Capabilities

<!-- capabilities and trigger parser fields from integrations/axiom/manifest.json -->

`auditLogEventsHook` sends flag changes to the Axiom annotations API.
`trigger` registers Axiom as a trigger type in LaunchDarkly.
The trigger reads the alert name from `/eventName` and the monitor link from `/url`.
If the name is missing, LaunchDarkly uses `An Axiom monitor alert`.

For annotation setup, use an Axiom token with permission to create annotations.
Create one LaunchDarkly integration configuration for each Axiom dataset.
The default policy covers flags in the `production` environment.
The optional `hideMemberDetails` field omits the member name from generated annotation metadata.
Comments and flag names retain their original text.
Axiom stores annotations in the US, including annotations for EU edge organizations.
Publish the end-user documentation and deploy API text truncation before releasing the annotations capability.

## Turn flags off from monitors

A LaunchDarkly trigger applies one action to one flag in one environment.
The native LaunchDarkly notifier in Axiom sends alerts to that trigger.

1. In LaunchDarkly, open the intended flag and environment.
2. Create a flag trigger and select Axiom as its trigger type.
3. Select the action that turns flag targeting on or off.
4. Copy the trigger URL when LaunchDarkly displays it.
5. In Axiom, create a notifier and select LaunchDarkly.
6. Paste the trigger URL into the Trigger URL field.
7. Attach the notifier to the intended monitor or severity level.

The trigger URL grants access to the action. Keep it secret.
Axiom encrypts the saved URL and masks the field in the console.
Axiom calls the trigger when an alert opens or escalates.
It skips resolves, notices, and de-escalations.
Recovery does not restore the flag.

## Test the named trigger

<!-- test notification name matching from integrations/axiom/manifest.json -->

Axiom prefixes test event names with `[Axiom test] `.
The manifest matches that prefix with `^\[Axiom test\] `.
LaunchDarkly uses the matching name to recognize test requests without applying the flag action.
Ordinary alert names, such as `Latest errors` and `Test checkout latency`, do not match this pattern.
Reserve the prefix for Axiom test notifications.

Use a disposable flag and environment for live validation.
The test handling in LaunchDarkly requires live validation before release.
Local parser and pattern tests do not prove production behavior.
The Axiom console asks for confirmation before sending a test.

1. Create an Axiom trigger in LaunchDarkly for the disposable flag.
2. Send a test from the Axiom notifier form.
3. Make sure that LaunchDarkly receives the test and leaves the flag unchanged.
4. Open and escalate a real Axiom monitor alert.
5. Make sure that the trigger applies the intended flag action.
6. Repeat with real alert names that contain `Latest` and `Test`.
7. Resolve and de-escalate the alert.
8. Make sure that those events do not call the trigger.

## Local validation and release

<!-- validation commands for integrations/axiom using package.json scripts and Jest -->

Run `npm test -- --runInBand` from the repository root.
Run `npm run preview -- axiom` to preview the annotation body.
The trigger contract tests live in `integrations/axiom/__tests__/trigger.js`.
They cover payload field extraction and test-name recognition.
The production LaunchDarkly trigger service is outside this repository.

This branch adds the trigger capability after the annotations integration.
Submit it as a separate change after the annotations change merges.
Release the Axiom console channel after the backend supports it and LaunchDarkly lists Axiom as a trigger type.
Make sure that the type is available on each supported LaunchDarkly instance.
Do not document a Generic trigger as a fallback.
Paused, snoozed, and quota-paused monitors do not deliver normal alerts.
Axiom notification limits and LaunchDarkly rate limits can prevent an action.
Provider failures use the normal Axiom notifier error path.
