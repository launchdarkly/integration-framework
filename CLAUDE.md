# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the LaunchDarkly Integration Framework — a collection of 130+ third-party integration definitions. Integrations are declarative (JSON manifests + Handlebars templates), not imperative code. The framework validates manifests against a JSON Schema and renders templates with sample contexts in tests.

## Commands

- **Run all tests:** `npm test`
- **Run a single test file:** `npx jest __tests__/validateIntegrationManifests.js`
- **Run tests matching a pattern:** `npx jest -t "Validate datadog/manifest.json"`
- **Build schema bundle:** `npm run build` (bundles `schemas/base.json` + `schemas/definitions.json` + `schemas/capabilities/*.json` into `manifest.schema.json`, then generates TypeScript types)
- **Format code:** `npm run prettier:write`
- **Check formatting:** `npm run prettier:check`
- **Preview template rendering:** `npm run preview` (renders templates with sample context data)
- **Scaffold new integration:** `npx plop` (interactive generator using `plopfile.js`)
- **Validation server:** `npm run start:server` (Express server on port 3000 for testing integrations)

## Architecture

### Integration structure

Each integration lives in `integrations/<name>/` with:
- `manifest.json` — declares metadata, form variables, capabilities, and endpoint configuration
- `assets/square.svg` and `assets/horizontal.svg` — logo files (required)
- `templates/*.json.hbs` — Handlebars templates for different event types (flag, project, environment, member)
- `README.md` — optional documentation

### Manifest schema

The manifest schema is composed from multiple files:
- `schemas/base.json` — top-level manifest properties (name, version, overview, formVariables, capabilities, etc.)
- `schemas/definitions.json` — shared type definitions
- `schemas/capabilities/*.json` — per-capability schemas (auditLogEventsHook, trigger, flagLink, syncedSegment, approval, etc.)
- `manifest.schema.json` — auto-generated bundled/dereferenced schema (do not edit directly)
- `manifest.schema.d.ts` — auto-generated TypeScript types from the schema

### Capabilities

Integrations declare capabilities in their manifest. Key capability types:
- `auditLogEventsHook` / `eventsHook` — webhook-style event delivery with templated request bodies
- `trigger` — LaunchDarkly triggers
- `flagLink` — deep links to external resources from flags
- `syncedSegment` — import audience segments from external tools
- `approval` — external approval workflows
- `flagCleanup` / `flagImport` — flag lifecycle management
- `reservedCustomProperties` — custom flag properties for the integration

### Handlebars templates

Templates use Handlebars with custom helpers registered in `helpers/index.js`:
- `equal` / `equalWithElse` — conditional equality
- `pathEncode` / `queryEncode` — URL encoding
- `basicAuthHeaderValue` — Base64 auth header
- `formatWithOffset` — timestamp formatting (milliseconds, seconds, rfc3339, simple)

Templates rendering is tested with sample contexts from `sample-context/` (flag, project, environment, member events). JSON templates are automatically escaped via `utils/json-escape.js`.

### Test structure

Tests in `__tests__/` validate all integrations automatically:
- Schema validation of every manifest against `manifest.schema.json`
- Icon file existence checks
- Overview must end with a period
- Template rendering with sample contexts must not throw
- Form variable references in endpoints/templates must resolve
- Capability-specific validations (flag links, synced segments, etc.)

Tests iterate over all integration directories using `__tests__/__utils__/index.js` which reads every `integrations/*/manifest.json`.

## Key conventions

- Manifests are validated with AJV against the bundled JSON Schema
- Template variables come from `formVariables` defined in the manifest
- The `overview` field must end with a period (enforced by tests)
- OAuth integrations must be explicitly listed in `OAUTH_INTEGRATIONS` array in `__tests__/validateIntegrationManifests.js`
- After modifying schemas, run `npm run build` to regenerate `manifest.schema.json`
