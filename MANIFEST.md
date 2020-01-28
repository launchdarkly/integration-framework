# LaunchDarkly Integrations Manifest Schema

```
https://launchdarkly.com/schemas/v1.0/integrations
```

Describes the capabilities and intent of a LaunchDarkly integration

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             |            |

# LaunchDarkly Integrations Manifest Properties

| Property                        | Type       | Required     | Nullable | Default | Defined by                                       |
| ------------------------------- | ---------- | ------------ | -------- | ------- | ------------------------------------------------ |
| [author](#author)               | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [capabilities](#capabilities)   | `object`   | Optional     | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [categories](#categories)       | `enum[]`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [description](#description)     | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [formVariables](#formvariables) | `object[]` | Optional     | No       | `[]`    | LaunchDarkly Integrations Manifest (this schema) |
| [icons](#icons)                 | `object`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [links](#links)                 | `object`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [name](#name)                   | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [overview](#overview)           | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [supportEmail](#supportemail)   | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |
| [version](#version)             | `string`   | **Required** | No       |         | LaunchDarkly Integrations Manifest (this schema) |

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

- is optional
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

| Property        | Type   | Required     |
| --------------- | ------ | ------------ |
| `defaultPolicy` | array  | Optional     |
| `endpoint`      | object | **Required** |
| `templates`     | object | **Required** |

#### defaultPolicy

##### Default Policy

LaunchDarkly policy that allows you to filter events sent to your webhook. See
https://docs.launchdarkly.com/docs/policies-in-custom-roles for more information.

`defaultPolicy`

- is optional
- type: `object[]`\* at least `1` items in the array

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

#### endpoint

##### Endpoint

Properties that describe the HTTP endpoint LaunchDarkly will send hooks to

`endpoint`

- is **required**
- type: `object`

##### endpoint Type

`object` with following properties:

| Property  | Type   | Required     | Default                                                |
| --------- | ------ | ------------ | ------------------------------------------------------ |
| `headers` | array  | Optional     | `[{"name":"Content-Type","value":"application/json"}]` |
| `method`  |        | Optional     | `"POST"`                                               |
| `url`     | string | **Required** |                                                        |

#### headers

##### HTTP headers

Headers to send with the webhook request

`headers`

- is optional
- type: `object[]`
- default: `[{"name":"Content-Type","value":"application/json"}]`

##### headers Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `name`   | string | **Required** |
| `value`  | string | **Required** |

#### name

##### Name

Name of the header

`name`

- is **required**
- type: `string`

##### name Type

`string`

- maximum length: 50 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5B%5E%5Cs%5D*%24)):

```regex
^[^\s]*$
```

#### value

##### Value

Value of the header. Form variables can be substituted in using {{variableName}}

`value`

- is **required**
- type: `string`

##### value Type

`string`

A name and value pair to send as headers with the hook request

##### headers Examples

```json
[object Object]
```

```json
[object Object]
```

#### method

##### HTTP method

HTTP method to use when LaunchDarkly makes the request to your endpoint

`method`

- is optional
- type: `enum`
- default: `"POST"`

The value of this property **must** be equal to one of the [known values below](#capabilities-known-values).

##### method Known Values

| Value   | Description |
| ------- | ----------- |
| `POST`  |             |
| `PUT`   |             |
| `PATCH` |             |

#### url

##### URL

URL to send the request to. You can use {{template markup}} to inject a formVariable into the url.

`url`

- is **required**
- type: `string`

##### url Type

`string`

- minimum length: 3 characters

#### templates

##### Webhook body template

Templates to use for body of the webhook request

`templates`

- is **required**
- type: `object`

##### templates Type

`object` with following properties:

| Property      | Type   | Required |
| ------------- | ------ | -------- |
| `default`     | string | Optional |
| `environment` | string | Optional |
| `flag`        | string | Optional |
| `project`     | string | Optional |

#### default

##### default template

Template to use if the event does not have a corresponding named template

`default`

- is optional
- type: `string`

##### default Type

`string`

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

## formVariables

### Form variables

Form variables will be rendered on the integration configuration page. These are variables you need an admin to supply
when they enable the integration. Examples of a form variable include `apiToken` or `url`.

`formVariables`

- is optional
- type: `object[]`

- default: `[]`
- defined in this schema

### formVariables Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property       | Type           | Required     | Default |
| -------------- | -------------- | ------------ | ------- |
| `defaultValue` | boolean,string | Optional     |         |
| `description`  | string         | **Required** |         |
| `isOptional`   | boolean        | Optional     | `false` |
| `isSecret`     | boolean        | Optional     | `false` |
| `key`          | string         | **Required** |         |
| `name`         | string         | **Required** |         |
| `placeholder`  | string         | Optional     |         |
| `type`         | string         | **Required** |         |

#### defaultValue

##### Default value

Default value for variable. Can be overridden by user in the UI

`defaultValue`

- is optional
- type: multiple

##### defaultValue Type

Unknown type `boolean,string`.

```json
{
  "$id": "#/properties/formVariables/variable/default-value",
  "title": "Default value",
  "type": ["boolean", "string"],
  "description": "Default value for variable. Can be overridden by user in the UI",
  "simpletype": "multiple"
}
```

#### description

##### Description

Describes the variable in the UI. Markdown links allowed.

`description`

- is **required**
- type: `string`

##### description Type

`string`

- maximum length: 250 characters

#### isOptional

##### Is this variable optional?

Variables marked as optional won't be required on the UI

`isOptional`

- is optional
- type: `boolean`
- default: `false`

##### isOptional Type

`boolean`

#### isSecret

##### Is this variable a secret?

Secret variables will be masked in the UI

`isSecret`

- is optional
- type: `boolean`
- default: `false`

##### isSecret Type

`boolean`

#### key

##### Key

A key will be used as the token name when the variable is substituted

`key`

- is **required**
- type: `string`

##### key Type

`string`

- maximum length: 20 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5B%5E%5Cs%5D*%24)):

```regex
^[^\s]*$
```

#### name

##### Name

A descriptive name that will be used as the form label on the UI

`name`

- is **required**
- type: `string`

##### name Type

`string`

- maximum length: 50 characters

#### placeholder

##### Description

Placeholder value to use in the form element if applicable

`placeholder`

- is optional
- type: `string`

##### placeholder Type

`string`

#### type

##### Type

The type of the variable

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#formvariables-known-values).

##### type Known Values

| Value     | Description |
| --------- | ----------- |
| `string`  |             |
| `boolean` |             |
| `uri`     |             |

A form variable describes an object property that the LaunchDarkly admin will be prompted for when they configure an
integration.

## icons

### Icons

Logos describing your integration in SVG format

`icons`

- is **required**
- type: `object`
- defined in this schema

### icons Type

`object` with following properties:

| Property     | Type   | Required     |
| ------------ | ------ | ------------ |
| `horizontal` | string | **Required** |
| `square`     | string | **Required** |

#### horizontal

##### Horizontal logo

A horizontal version of your integration's logo in SVG format

`horizontal`

- is **required**
- type: `string`

##### horizontal Type

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

Your integration's name.

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

## supportEmail

### Support Email

Email address for your integration's support

`supportEmail`

- is **required**
- type: `string`
- defined in this schema

### supportEmail Type

`string`

- format: `email` – email address (according to [RFC 5322, section 3.4.1](https://tools.ietf.org/html/rfc5322))

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
