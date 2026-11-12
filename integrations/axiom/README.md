# Axiom

Show LaunchDarkly flag changes as annotations on Axiom charts.
End-user documentation: [LaunchDarkly and Axiom](https://axiom.co/docs/apps/launchdarkly).

## Configuration

<!-- configuration fields and auditLogEventsHook from integrations/axiom/manifest.json -->

Create an Axiom API token with permission to create annotations.
Enter the token and one dataset name in the LaunchDarkly integration configuration.
Create another configuration for each additional dataset.
The default policy covers flags in the `production` environment.
Adjust that policy to use another environment.

The optional Hide member details setting omits the member name from generated annotation metadata.
Comments and flag names retain their original text.
Axiom stores annotations in the US, including annotations for EU edge organizations.
The integration uses `https://api.axiom.co/v2/annotations` for every organization.

Axiom truncates titles longer than 256 Unicode characters and descriptions longer than 512.
The truncated value ends with an ellipsis.
Confirm deployment of that API behavior before release.
The published end-user documentation must cover these limits and the US metadata location.

## Maintenance and validation

<!-- validation commands for integrations/axiom using package.json scripts and Jest -->

Run `npm test -- --runInBand` from the repository root.
Run `npm run preview -- axiom` to preview the annotation body.
The renderer tests live in `integrations/axiom/__tests__/renderer.js`.
They cover the supplied flag samples, member privacy, title fallback, optional comments, and JSON escaping.

The framework JSON-escapes event strings before template rendering.
Use triple braces for free-text event context to avoid extra HTML escaping.
The dataset reference must use `formVariables.datasetName`.
Keep the annotation type fixed as `launchdarkly-flag`.
Environment keys can contain characters that are invalid in annotation types.

The local renderer tests do not establish LaunchDarkly production renderer behavior.
Validate the deployed integration and publish the end-user documentation before release.
