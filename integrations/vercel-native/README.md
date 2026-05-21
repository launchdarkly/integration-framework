# Vercel Native Integration

## auditLogEventsHook endpoint

The endpoint `method` and `url` are Handlebars templates that branch on the event context. Here's the logic in readable form.

### Method

Derived from `context.verbKind`:

| verbKind               | HTTP method |
| ---------------------- | ----------- |
| `createFlag`           | POST        |
| `cloneFlag`            | POST        |
| `updateName`           | PATCH       |
| `updateDescription`    | PATCH       |
| `updateGlobalArchived` | PATCH       |
| `createProject`        | PUT         |
| `updateProjectName`    | PATCH       |
| `updateApiKey`         | PATCH       |
| `deleteFlag`           | DELETE      |
| `deleteProject`        | DELETE      |

The `defaultPolicy` subscribes to exactly these verbKinds. Any unhandled verbKind would render an empty method string and fail at runtime.

### URL

```
https://api.vercel.com/v1/installations/{installationId}/resources/{projectKey}[/experimentation/items[/{projectKey}_{flagKey}]]
```

- `installationId` — form variable
- `projectKey` — from event context: `context.project.key` for flag events, `context.key` for project events (where the resource itself is the project)
- `/experimentation/items` — appended for flag events only (`context.kind == "flag"`)
- `/{projectKey}_{flagKey}` — appended for all flag ops **except** create ops (`createFlag`, `cloneFlag`), which POST to the collection endpoint

### Request bodies

**createFlag / cloneFlag** — POSTs to the items collection:

```json
{
  "items": [
    {
      "id": "{projectKey}_{flagKey}",
      "slug": "{flagKey}",
      "origin": "{baseURL}/projects/{projectKey}/flags/{flagKey}",
      "name": "{name}",
      "description": "{description}",
      "createdAt": 1234567890000,
      "updatedAt": 1234567890000,
      "category": "flag"
    }
  ]
}
```

**updateName / updateDescription / updateGlobalArchived** — PATCHes the specific item:

```json
{
  "slug": "{flagKey}",
  "origin": "{baseURL}/projects/{projectKey}/flags/{flagKey}",
  "name": "{name}",
  "description": "{description}",
  "updatedAt": 1234567890000,
  "category": "flag"
}
```

**deleteFlag**:

```json
{ "_delete": true }
```

**createProject** — `PUT` to `…/installations/{installationId}/resources/{projectKey}`:

```json
{
  "name": "{name || key}",
  "productId": "adfsdfvsdf",
  "status": "ready",
  "secrets": [
    {
      "name": "LAUNCHDARKLY_SDK_KEY",
      "value": "{apiKey for production env}",
      "environmentOverrides": {
        "development": "{apiKey for development env}",
        "preview": "{apiKey for preview env}",
        "production": "{apiKey for production env}"
      }
    },
    {
      "name": "LAUNCHDARKLY_CLIENT_SIDE_ID",
      "value": "{clientId for production env}",
      "environmentOverrides": {
        "development": "{clientId for development env}",
        "preview": "{clientId for preview env}",
        "production": "{clientId for production env}"
      }
    }
  ]
}
```

`environmentOverrides` keys come from `context.project.environments[*].key` directly — the LD project is expected to have envs named `development`, `preview`, and `production` to match Vercel's environment names. Each secret's `value` field is the production env's credential (Vercel requires it as a default for envs not in the overrides). Mobile keys are intentionally omitted.

**updateApiKey** — `PATCH` to `…/installations/{installationId}/resources/{projectKey}`:

```json
{
  "secrets": [
    {
      "name": "LAUNCHDARKLY_SDK_KEY",
      "value": "{apiKey for production env}",
      "environmentOverrides": {
        "development": "{apiKey for development env}",
        "preview": "{apiKey for preview env}",
        "production": "{apiKey for production env}"
      }
    },
    {
      "name": "LAUNCHDARKLY_CLIENT_SIDE_ID",
      "value": "{clientId for production env}",
      "environmentOverrides": {
        "development": "{clientId for development env}",
        "preview": "{clientId for preview env}",
        "production": "{clientId for production env}"
      }
    }
  ]
}
```

Same secrets structure as `createProject`, but without `name`, `productId`, or `status` fields since this is an update to an existing resource.

**updateProjectName**:

```json
{ "name": "{name}" }
```

**deleteProject** — `DELETE` to `…/installations/{installationId}/resources/{projectKey}` per [Vercel Delete integration resource](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource). Request body is `{}`.

> Note: `description` and `isArchived` are strings derived from the audit log event context (`payload.currentVersion`). Timestamps are numbers (milliseconds).
