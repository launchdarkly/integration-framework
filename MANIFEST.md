# LaunchDarkly Integrations Manifest Schema

```
https://launchdarkly.com/schemas/v1.0/integrations
```

Describes the capabilities and intent of a LaunchDarkly integration

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             |            |

# LaunchDarkly Integrations Manifest Properties

| Property                          | Type     | Required     | Nullable | Defined by                                       |
| --------------------------------- | -------- | ------------ | -------- | ------------------------------------------------ |
| [authentication](#authentication) | `object` | Optional     | No       | LaunchDarkly Integrations Manifest (this schema) |
| [author](#author)                 | `string` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [capabilities](#capabilities)     | `object` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [categories](#categories)         | `enum[]` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [description](#description)       | `string` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [icons](#icons)                   | `object` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [links](#links)                   | `object` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [name](#name)                     | `string` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [overview](#overview)             | `string` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
| [version](#version)               | `string` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |

## authentication

### Authentication

Specify the authentication method required by your integration

`authentication`

- is optional
- type: `object`
- defined in this schema

### authentication Type

`object` with following properties:

| Property     | Type   | Required     |
| ------------ | ------ | ------------ |
| `acceptedAs` | object | **Required** |
| `hint`       | string | **Required** |
| `label`      | string | **Required** |
| `type`       | string | **Required** |

#### acceptedAs

##### Token accepted as...

Specify how your token should be provided in the request to your service

`acceptedAs`

- is **required**
- type: `object`

##### acceptedAs Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `name`   | string | **Required** |
| `prefix` | string | Optional     |
| `type`   | string | **Required** |

#### name

##### Query parameter or header name

Specify the name of the query parameter or header you'd like to use

`name`

- is **required**
- type: `string`

##### name Type

`string`

##### name Examples

```json
token
```

```json
key
```

```json
X - App - Token
```

#### prefix

##### Header value prefix

If your token needs to be padded with a prefix, specify it here

`prefix`

- is optional
- type: `string`

##### prefix Type

`string`

##### prefix Example

```json
Bearer
```

#### type

##### Type

Specify the method in which your token is provided in the request. In most cases, tokens are either passed through
query parameter or a header.

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#authentication-known-values).

##### type Known Values

| Value         | Description |
| ------------- | ----------- |
| `query-param` |             |
| `header`      |             |

#### hint

##### Hint

A placeholder hint used in the LaunchDarkly UI describing your token

`hint`

- is **required**
- type: `string`

##### hint Type

`string`

##### hint Example

```json
Enter API key from your SpaceXYZ account
```

#### label

##### Token

Label to use in the LaunchDarkly UI describing you token

`label`

- is **required**
- type: `string`

##### label Type

`string`

##### label Examples

```json
API key
```

```json
API token
```

#### type

##### Auth Type

Specify the authentication method required by your integration

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#authentication-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `token` |             |

## author

### Author

Name of the author or organization responsible for the integration

`author`

- is **required**
- type: `string`
- defined in this schema

### author Type

`string`

- minimum length: 3 characters
- maximum length: 100 characters All instances must conform to this regular expression (test examples
  [here](<https://regexr.com/?expression=%5E(.*)%24>)):

```regex
^(.*)$
```

## capabilities

### Capabilities

Specify which capabilities you'd like your integration to have

`capabilities`

- is **required**
- type: `object`
- defined in this schema

### capabilities Type

`object` with following properties:

| Property             | Type   | Required |
| -------------------- | ------ | -------- |
| `auditLogEventsHook` | object | Optional |

#### auditLogEventsHook

##### Audit Log Events Hook

This capability will enable LaunchDarkly to send audit log event webhooks to your endpoint.

`auditLogEventsHook`

- is optional
- type: `object`

##### auditLogEventsHook Type

`object` with following properties:

| Property            | Type   | Required     | Default              |
| ------------------- | ------ | ------------ | -------------------- |
| `contentType`       | string | **Required** | `"application/json"` |
| `defaultPolicy`     | array  | Optional     |                      |
| `method`            |        | **Required** |                      |
| `receivingEndpoint` | string | **Required** |                      |
| `templates`         | object | Optional     |                      |

#### contentType

##### Content type

The content-type your endpoint expects to receive

`contentType`

- is **required**
- type: `string`
- default: `"application/json"`

##### contentType Type

`string`

- minimum length: 3 characters

##### contentType Examples

```json
application / json
```

```json
application / xml
```

#### defaultPolicy

##### Default Policy

LaunchDarkly policy that allows you to filter events sent to your webhook. See
https://docs.launchdarkly.com/docs/policies-in-custom-roles for more information.

`defaultPolicy`

- is optional
- type: `object[]`

##### defaultPolicy Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property       | Type   | Required | Default   |
| -------------- | ------ | -------- | --------- |
| `actions`      | array  | Optional | `["*"]`   |
| `effect`       | string | Optional | `"allow"` |
| `notActions`   | array  | Optional | `["*"]`   |
| `notResources` | array  | Optional | `["*"]`   |
| `resources`    | array  | Optional | `["*"]`   |

#### actions

##### Actions

A list of action specifiers defining the actions to which the statement applies. See
https://docs.launchdarkly.com/docs/actions-in-custom-roles for more information.

`actions`

- is optional
- type: `string[]`
- default: `["*"]`

##### actions Type

Array type: `string[]`

All items must be of the type: `string`

##### actions Examples

```json
updateOn
```

```json
createFlag
```

```json
updateRules
```

```json
updateTargets
```

#### effect

##### Effect

This attribute defines whether the statement allows or denies access to the named resources and actions.

`effect`

- is optional
- type: `enum`
- default: `"allow"`

The value of this property **must** be equal to one of the [known values below](#capabilities-known-values).

##### effect Known Values

| Value   | Description |
| ------- | ----------- |
| `allow` |             |
| `deny`  |             |

#### notActions

##### Not actions

A list of action specifiers defining the actions to which the statement does not apply. See
https://docs.launchdarkly.com/docs/actions-in-custom-roles for more information.

`notActions`

- is optional
- type: `string[]`
- default: `["*"]`

##### notActions Type

Array type: `string[]`

All items must be of the type: `string`

##### notActions Examples

```json
createFlag
```

```json
deleteFlag
```

```json
cloneFlag
```

#### notResources

##### Not resources

A list of resource specifiers defining the resources to which the statement does not apply. See
https://docs.launchdarkly.com/docs/resources-in-custom-roles for more information.

`notResources`

- is optional
- type: `string[]`
- default: `["*"]`

##### notResources Type

Array type: `string[]`

All items must be of the type: `string`

##### notResources Example

```json
proj/*:env/production:flag/*
```

#### resources

##### Resources

A list of resource specifiers defining the resources to which the statement applies. See
https://docs.launchdarkly.com/docs/resources-in-custom-roles for more information.

`resources`

- is optional
- type: `string[]`
- default: `["*"]`

##### resources Type

Array type: `string[]`

All items must be of the type: `string`

##### resources Example

```json
proj/*:env/production:flag/*
```

A LaunchDarkly policy. See https://docs.launchdarkly.com/docs/policies-in-custom-roles for more information.

#### method

##### HTTP method

HTTP method to use when LaunchDarkly makes the request to your endpoint

`method`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#capabilities-known-values).

##### method Known Values

| Value   | Description |
| ------- | ----------- |
| `post`  |             |
| `put`   |             |
| `patch` |             |

#### receivingEndpoint

##### Endpoint URL

URL where you'd like LaunchDarkly to send webhooks to

`receivingEndpoint`

- is **required**
- type: `string`

##### receivingEndpoint Type

`string`

- maximum length: 2048 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5BHh%5D%5BTt%5D%5BTt%5D%5BPp%5D%5BSs%5D%3F%3A%2F%2F)):

```regex
^[Hh][Tt][Tt][Pp][Ss]?://
```

#### templates

##### Webhook body template

Templates to use for body of the webhook request

`templates`

- is optional
- type: `object`

##### templates Type

`object` with following properties:

| Property      | Type   | Required |
| ------------- | ------ | -------- |
| `environment` | string | Optional |
| `flag`        | string | Optional |
| `metric`      | string | Optional |
| `project`     | string | Optional |

#### environment

##### Environment template

Template to use for environment events

`environment`

- is optional
- type: `string`

##### environment Type

`string`

#### flag

##### Flag template

Template to use for flag events

`flag`

- is optional
- type: `string`

##### flag Type

`string`

#### metric

##### Metric template

Template to use for metric events

`metric`

- is optional
- type: `string`

##### metric Type

`string`

#### project

##### Project template

Template to use for project events

`project`

- is optional
- type: `string`

##### project Type

`string`

## categories

### Categories

Categories that describe your integration

`categories`

- is **required**
- type: `enum[]`
- between `1` and `3` items in the array
- defined in this schema

### categories Type

Array type: `enum[]`

All items must be of the type: `string`

## description

### Long description

A longer description of your integration

`description`

- is **required**
- type: `string`
- defined in this schema

### description Type

`string`

- minimum length: 50 characters
- maximum length: 2048 characters All instances must conform to this regular expression (test examples
  [here](<https://regexr.com/?expression=%5E(.*)%24>)):

```regex
^(.*)$
```

## icons

### Icons

Logos describing your integration in SVG format

`icons`

- is **required**
- type: `object`
- defined in this schema

### icons Type

`object` with following properties:

| Property      | Type   | Required     |
| ------------- | ------ | ------------ |
| `rectangular` | string | **Required** |
| `square`      | string | **Required** |

#### rectangular

##### Rectangular logo

A rectangular version of your integration's logo in SVG format

`rectangular`

- is **required**
- type: `string`

##### rectangular Type

`string`

All instances must conform to this regular expression (test examples
[here](https://regexr.com/?expression=%5C.svg%24)):

```regex
\.svg$
```

#### square

##### Square logo

A square version of your integration's logo in SVG format

`square`

- is **required**
- type: `string`

##### square Type

`string`

All instances must conform to this regular expression (test examples
[here](https://regexr.com/?expression=%5C.svg%24)):

```regex
\.svg$
```

## links

### Links

A set of reference links supporting your integration

`links`

- is **required**
- type: `object`
- defined in this schema

### links Type

`object` with following properties:

| Property         | Type   | Required     |
| ---------------- | ------ | ------------ |
| `privacyPolicy`  | string | **Required** |
| `site`           | string | **Required** |
| `supportEmail`   | string | **Required** |
| `supportWebsite` | string | Optional     |

#### privacyPolicy

##### Privacy Policy

URL to your organization's privacy policy

`privacyPolicy`

- is **required**
- type: `string`

##### privacyPolicy Type

`string`

- maximum length: 2048 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5BHh%5D%5BTt%5D%5BTt%5D%5BPp%5D%5BSs%5D%3F%3A%2F%2F)):

```regex
^[Hh][Tt][Tt][Pp][Ss]?://
```

#### site

##### Website

URL to your website

`site`

- is **required**
- type: `string`

##### site Type

`string`

- maximum length: 2048 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5BHh%5D%5BTt%5D%5BTt%5D%5BPp%5D%5BSs%5D%3F%3A%2F%2F)):

```regex
^[Hh][Tt][Tt][Pp][Ss]?://
```

#### supportEmail

##### Support Email

Email address for your integration's support

`supportEmail`

- is **required**
- type: `string`

##### supportEmail Type

`string`

- format: `email` – email address (according to [RFC 5322, section 3.4.1](https://tools.ietf.org/html/rfc5322))

#### supportWebsite

##### Support Website

URL to your integration's support website

`supportWebsite`

- is optional
- type: `string`

##### supportWebsite Type

`string`

- maximum length: 2048 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5BHh%5D%5BTt%5D%5BTt%5D%5BPp%5D%5BSs%5D%3F%3A%2F%2F)):

```regex
^[Hh][Tt][Tt][Pp][Ss]?://
```

## name

### Integration name

Your integration's name. No spaces

`name`

- is **required**
- type: `string`
- defined in this schema

### name Type

`string`

- minimum length: 3 characters
- maximum length: 100 characters

## overview

### Short description

A short-one liner describing your integration

`overview`

- is **required**
- type: `string`
- defined in this schema

### overview Type

`string`

- minimum length: 10 characters
- maximum length: 100 characters All instances must conform to this regular expression (test examples
  [here](<https://regexr.com/?expression=%5E(.*)%24>)):

```regex
^(.*)$
```

## version

### Version

A semantic version of the integration. See https://semver.org for more info.

`version`

- is **required**
- type: `string`
- defined in this schema

### version Type

`string`

- minimum length: 5 characters
- maximum length: 14 characters All instances must conform to this regular expression

```regex
^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
```

- test example:
  [0.0.1](<https://regexr.com/?expression=%5E(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)(%3F%3A-((%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*)(%3F%3A%5C.(%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*))*))%3F(%3F%3A%5C%2B(%5B0-9a-zA-Z-%5D%2B(%3F%3A%5C.%5B0-9a-zA-Z-%5D%2B)*))%3F%24&text=0.0.1>)
- test example:
  [1.0.0](<https://regexr.com/?expression=%5E(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)(%3F%3A-((%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*)(%3F%3A%5C.(%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*))*))%3F(%3F%3A%5C%2B(%5B0-9a-zA-Z-%5D%2B(%3F%3A%5C.%5B0-9a-zA-Z-%5D%2B)*))%3F%24&text=1.0.0>)
- test example:
  [1.0.1-beta](<https://regexr.com/?expression=%5E(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)%5C.(0%7C%5B1-9%5D%5Cd*)(%3F%3A-((%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*)(%3F%3A%5C.(%3F%3A0%7C%5B1-9%5D%5Cd*%7C%5Cd*%5Ba-zA-Z-%5D%5B0-9a-zA-Z-%5D*))*))%3F(%3F%3A%5C%2B(%5B0-9a-zA-Z-%5D%2B(%3F%3A%5C.%5B0-9a-zA-Z-%5D%2B)*))%3F%24&text=1.0.1-beta>)

### version Examples

```json
"0.0.1"
```

```json
"1.0.0"
```

```json
"1.0.1-beta"
```
