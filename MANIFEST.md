# LaunchDarkly Integrations Manifest Schema

```
https://launchdarkly.com/schemas/v1.0/integrations
```

Describes the capabilities and intent of a LaunchDarkly integration

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                   |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | -------------------------------------------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             | [manifest.schema.json](manifest.schema.json) |

# LaunchDarkly Integrations Manifest Properties

| Property                          | Type     | Required     | Nullable | Defined by                                       |
| --------------------------------- | -------- | ------------ | -------- | ------------------------------------------------ |
| [authentication](#authentication) | `object` | **Required** | No       | LaunchDarkly Integrations Manifest (this schema) |
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

- is **required**
- type: `object`
- defined in this schema

### authentication Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `type`   | string | **Required** |

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
| `none`  |             |
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

| Property | Type | Required |
| -------- | ---- | -------- |


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
- maximum length: 50 characters All instances must conform to this regular expression (test examples
  [here](https://regexr.com/?expression=%5E%5CS*%24)):

```regex
^\S*$
```

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

A semantic version of the integration

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
