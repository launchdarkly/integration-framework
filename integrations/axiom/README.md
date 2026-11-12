# Axiom

show LaunchDarkly flag changes as annotations on Axiom charts.
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

## validation

<!-- validation commands for integrations/axiom using package.json scripts and Jest -->

run `npm test -- --runInBand` from the repository root.
run `npm run preview -- axiom` to preview the annotation body.
before release, also validate the deployed integration; local rendering does not prove LaunchDarkly production behavior.
