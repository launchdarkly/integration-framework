# Axiom

show LaunchDarkly flag changes as annotations on Axiom charts and use Axiom monitor alerts to apply a flag action.
setup: [LaunchDarkly and Axiom](https://axiom.co/docs/apps/launchdarkly).

## configuration

<!-- configuration fields and auditLogEventsHook from integrations/axiom/manifest.json -->

create an Axiom API token with permission to create annotations.
enter the token and one dataset name in the LaunchDarkly integration configuration.
create another configuration for each additional dataset.
the default policy covers flags in the `production` environment; adjust it to use another environment.

the optional Hide member details setting omits the member name from generated annotation metadata.
comments and flag names retain their original text.
Axiom stores annotations in the US, including annotations for EU edge organizations.
the integration uses `https://api.axiom.co/v2/annotations` for every organization.

Axiom truncates titles longer than 256 Unicode characters and descriptions longer than 512.
the truncated value ends with an ellipsis.
before release, confirm that API behavior is deployed and the setup docs cover these limits and the US metadata location.

## flag actions from monitors

<!-- trigger setup and test notification matching from integrations/axiom/manifest.json -->

create a flag trigger in LaunchDarkly, select Axiom as its trigger type, and choose the flag, environment, and action.
copy its URL into a LaunchDarkly notifier in Axiom, then attach that notifier to a monitor or severity level.
the URL grants access to the action; keep it secret.

Axiom calls the trigger when an alert opens or escalates.
resolves, notices, and de-escalations do not call it, and recovery never restores the flag.
an escalation can apply the action again after a manual override.
pause the notifier or disable the trigger before an override that must survive later escalations.
monitor pauses, snoozes, quotas, and notification or provider rate limits can suppress delivery.

the trigger reads the alert name from `/eventName` and the monitor link from `/url`.
if the name is missing, LaunchDarkly uses `An Axiom monitor alert`.
Axiom reserves `[Axiom test] ` for test names; the manifest matches only this leading prefix with `^\[Axiom test\] `.
ordinary names such as `Latest errors` and `Test checkout latency` still apply the action.

## validation

<!-- validation commands for integrations/axiom using package.json scripts and Jest -->

run `npm test -- --runInBand` from the repository root.
run `npm run preview -- axiom` to preview the annotation body.
before release, also validate the deployed integration; local rendering does not prove LaunchDarkly production behavior.

use a disposable flag and environment to validate the named trigger before release.
the Axiom console asks for confirmation before sending a test.

1. send a notifier test and confirm that LaunchDarkly receives it without changing the flag.
2. open and escalate a real alert, including names that contain `Latest` and `Test`, and confirm that the selected flag action runs.
3. resolve and de-escalate the alert and confirm that those events do not call the trigger.

local parser tests do not prove LaunchDarkly production test handling.
