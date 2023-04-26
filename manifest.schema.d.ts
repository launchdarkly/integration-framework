/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Your integration's name.
 */
export type IntegrationName = string;
/**
 * A semantic version of the integration. See https://semver.org for more info.
 */
export type Version = string;
/**
 * A short-one liner describing your integration
 */
export type ShortDescription = string;
/**
 * A longer description of your integration
 */
export type LongDescription = string;
/**
 * Details about your integration and next steps if the installation happens outside of LaunchDarkly
 */
export type LearnMoreDetails = string;
/**
 * Name of the author or organization responsible for the integration
 */
export type Author = string;
/**
 * Email address for your integration's support
 */
export type SupportEmail = string;
/**
 * URL to your website
 */
export type Website = string;
/**
 * URL to the LaunchDarkly documentation for this integration
 */
export type LaunchDarklyDocumentation = string;
/**
 * URL to your organization's privacy policy
 */
export type PrivacyPolicy = string;
/**
 * URL to your integration's support website
 */
export type SupportWebsite = string;
/**
 * Categories that describe your integration
 */
export type Categories =
  | [
      | "analytics"
      | "approval"
      | "authentication"
      | "automation"
      | "code-references"
      | "customer-support"
      | "data"
      | "developer-tools"
      | "infrastructure"
      | "issue-tracking"
      | "log-management"
      | "messaging"
      | "monitoring"
      | "synced-segments"
      | "notifications"
    ]
  | [
      (
        | "analytics"
        | "approval"
        | "authentication"
        | "automation"
        | "code-references"
        | "customer-support"
        | "data"
        | "developer-tools"
        | "infrastructure"
        | "issue-tracking"
        | "log-management"
        | "messaging"
        | "monitoring"
        | "synced-segments"
        | "notifications"
      ),
      (
        | "analytics"
        | "approval"
        | "authentication"
        | "automation"
        | "code-references"
        | "customer-support"
        | "data"
        | "developer-tools"
        | "infrastructure"
        | "issue-tracking"
        | "log-management"
        | "messaging"
        | "monitoring"
        | "synced-segments"
        | "notifications"
      )
    ]
  | [
      (
        | "analytics"
        | "approval"
        | "authentication"
        | "automation"
        | "code-references"
        | "customer-support"
        | "data"
        | "developer-tools"
        | "infrastructure"
        | "issue-tracking"
        | "log-management"
        | "messaging"
        | "monitoring"
        | "synced-segments"
        | "notifications"
      ),
      (
        | "analytics"
        | "approval"
        | "authentication"
        | "automation"
        | "code-references"
        | "customer-support"
        | "data"
        | "developer-tools"
        | "infrastructure"
        | "issue-tracking"
        | "log-management"
        | "messaging"
        | "monitoring"
        | "synced-segments"
        | "notifications"
      ),
      (
        | "analytics"
        | "approval"
        | "authentication"
        | "automation"
        | "code-references"
        | "customer-support"
        | "data"
        | "developer-tools"
        | "infrastructure"
        | "issue-tracking"
        | "log-management"
        | "messaging"
        | "monitoring"
        | "synced-segments"
        | "notifications"
      )
    ];
/**
 * A square version of your integration's logo in SVG format
 */
export type SquareLogo = string;
/**
 * A horizontal version of your integration's logo in SVG format
 */
export type HorizontalLogo = string;
/**
 * Kind of legacy integration
 */
export type Kind = "codeRefs" | "datadog" | "dataExport" | "slackWebhooks" | "webhooks";
/**
 * Capabilities not configured by manifests
 */
export type OtherCapabilities = [
  "codeRefs" | "dataExport" | "external" | "ide" | "sso" | "webhooks",
  ...("codeRefs" | "dataExport" | "external" | "ide" | "sso" | "webhooks")[]
];
/**
 * Whether the integration authenticates using OAuth
 */
export type RequiresOAuth = boolean;
/**
 * Whether the your app should be excluded from the list of integration cards displayed on our integrations page in the web app
 */
export type HideOnIntegrationsPage = boolean;
/**
 * A key will be used as the token name when the variable is substituted
 */
export type Key = string;
/**
 * A descriptive name that will be used as the form label on the UI
 */
export type Name = string;
/**
 * The type of the variable
 */
export type Type = "string" | "boolean" | "uri" | "enum" | "oauth" | "dynamicEnum" | "generated";
/**
 * Describes the variable in the UI. Markdown links allowed.
 */
export type Description = string;
/**
 * Placeholder value to use in the form element if applicable
 */
export type Description1 = string;
/**
 * Secret variables will be masked in the UI
 */
export type IsThisVariableASecret = boolean;
/**
 * Variables marked as optional won't be required on the UI
 */
export type IsThisVariableOptional = boolean;
/**
 * Variables marked as hidden won't be displayed on the UI
 */
export type HideVariableInTheUI = boolean;
/**
 * Default value for variable. Can be overridden by the user in the UI
 */
export type DefaultValue = boolean | string;
/**
 * Allowed string values for enum-type formVariables
 */
export type AllowedValues = string[];
/**
 * URL to send the request to. You can use {{template markup}} to inject a formVariable into the url.
 */
export type URL = string;
/**
 * HTTP method to use when LaunchDarkly makes the request to your endpoint
 */
export type HTTPMethod = "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
/**
 * Name of the header
 */
export type Name1 = string;
/**
 * Value of the header. Form variables can be substituted in using {{variableName}}
 */
export type Value = string;
/**
 * Headers to send with the webhook request
 */
export type HTTPHeaders = HeaderItems[];
/**
 * The name of the HMAC signature header
 */
export type HMACSignatureHeaderName = string;
/**
 * The name of the form variable field that corresponds to the HMAC encryption secret
 */
export type HMACSecretFormVariableKey = string;
/**
 * JSON path to the array containing options for parsing
 */
export type OptionsArrayPath = string;
/**
 * Relative JSON path to values for each item in the options array to be used as UI dropdown labels
 */
export type Label = string;
/**
 * Relative JSON path to values for each item in the options array to be used as dropdown values
 */
export type Value1 = string;
/**
 * Key for the form variable that this form field depends on
 */
export type VariableKey = string;
/**
 * Which form variable type is the variable key defined or located in?
 */
export type VariableLocation = "flagFormVariables" | "environmentFormVariables" | "formVariables";
/**
 * Action to be taken when your defined conditions evaluates to true
 */
export type Action = "hideField" | "showField";
/**
 * Name of the operator for evaluating a condition.
 */
export type Operator =
  | "lessThan"
  | "lessThanOrEqualTo"
  | "greaterThan"
  | "greaterThanOrEqualTo"
  | "equalTo"
  | "notEqual"
  | "contains"
  | "startsWith"
  | "endsWith";
/**
 * Target value that conditions are evaluated against
 */
export type Value2 = string;
/**
 * Conditional configurations to be evaluated to decide whether an action should taken for the form field.
 */
export type Conditions = {
  operator: Operator;
  value: Value2;
  [k: string]: unknown;
}[];
/**
 * Dependency configuration to control the state and visibility of the form field.
 */
export type DependsOn = {
  variableKey: VariableKey;
  variableLocation: VariableLocation;
  action: Action;
  conditions: Conditions;
  [k: string]: unknown;
}[];
/**
 * Form variables will be rendered on the integration configuration page. These are variables you need an admin to supply when they enable the integration. Examples of a form variable include `apiToken` or `url`.
 */
export type FormVariables = FormVariable[];
/**
 * Template to use for flag events
 */
export type FlagTemplate = string;
/**
 * Template to use for project events
 */
export type ProjectTemplate = string;
/**
 * Template to use for environment events
 */
export type EnvironmentTemplate = string;
/**
 * Template to use if the event does not have a corresponding named template
 */
export type DefaultTemplate = string;
/**
 * Template to use when sending test events with the 'validate connection' button
 */
export type ValidationTemplate = string;
/**
 * Template to use for member events
 */
export type MemberTemplate = string;
/**
 * LaunchDarkly policy that allows you to filter events sent to your webhook. See https://docs.launchdarkly.com/home/members/role-policies for more information.
 */
export type DefaultPolicy = [Policy, ...Policy[]];
/**
 * A list of action specifiers defining the actions to which the statement applies. See https://docs.launchdarkly.com/home/members/role-actions for more information.
 */
export type Actions = string[];
/**
 * This attribute defines whether the statement allows or denies access to the named resources and actions.
 */
export type Effect = "allow" | "deny";
/**
 * A list of action specifiers defining the actions to which the statement does not apply. See https://docs.launchdarkly.com/home/members/role-actions for more information.
 */
export type NotActions = string[];
/**
 * A list of resource specifiers defining the resources to which the statement does not apply. See https://docs.launchdarkly.com/home/members/role-resources for more information.
 */
export type NotResources = string[];
/**
 * A list of resource specifiers defining the resources to which the statement applies. See https://docs.launchdarkly.com/home/members/role-resources for more information.
 */
export type Resources = string[];
/**
 * Whether errors received from your endpoint should be displayed in the error log in LaunchDarkly UI
 */
export type IncludeErrorResponseBody = boolean;
/**
 * Describes how the audit log event will be delivered to the destination. Custom delivery method indicates a custom delivery implementation in LaunchDarkly will be used.
 */
export type DeliveryMethod = "custom";
/**
 * Whether to send the standard audit log webhook payload or to use defined JSON templates
 */
export type UseStandardWebhookPayload = boolean;
/**
 * The reserved custom property's display name.
 */
export type Name2 = string;
/**
 * The custom property's API response key.
 */
export type Key1 = string;
/**
 * The custom property's description.
 */
export type Description2 = string;
/**
 * This capability will reserve integration-specific custom property options in the global flag setting configuration. These custom properties will only be presented to users after they have have configured an integration subscription. Read https://docs.launchdarkly.com/home/connecting/custom-properties for more information on custom properties
 */
export type ReservedCustomProperties = {
  name: Name2;
  key: Key1;
  description?: Description2;
  [k: string]: unknown;
}[];
/**
 * URL to documentation describing how to configure the integration.
 */
export type DocumentationLink = string;
/**
 * Authentication type - currently the only option is sharedSecret.
 */
export type Authentication = "sharedSecret";
/**
 * The default event name string used in the audit log if an eventName cannot be parsed in the trigger request body.
 */
export type DefaultEventName = string;
/**
 * The expected eventName of the integration partner's test events
 */
export type TestEventNameRegex = string;
/**
 * JSON pointer to an event name
 */
export type EventNamePointer = string;
/**
 * JSON pointer to a metric value
 */
export type ValuePointer = string;
/**
 * JSON pointer to the external alert URL
 */
export type URLPointer = string;
/**
 * Name of the approval system. Default's to the integration's name if not specified.
 */
export type ApprovalSystemName = string;
/**
 * Template string used to render the JSON request body
 */
export type JSONBody = string;
/**
 * JSON path to the array containing integration member details
 */
export type MemberArrayPath = string;
/**
 * Relative JSON path to the email field in each member item in the array
 */
export type Email = string;
/**
 * Relative JSON path to the integration member ID field in each member item in the array
 */
export type MemberID = string;
/**
 * Environment-specific form variables that render on the environment approval settings modal
 */
export type EnvironmentFormVariables = FormVariable[];
/**
 * Flag-specific form variables that render on the approval request creation modal
 */
export type FlagFormVariables = FormVariable[];
/**
 * Externally-created approval entity ID
 */
export type ApprovalIDPointer = string;
/**
 * JSON pointer to a status value
 */
export type StatusValuePointer = string;
/**
 * JSON pointer to a human-readable status
 */
export type StatusValueDisplayPointer = string;
/**
 * regex pattern used to determine if the approval should be considered 'approved'
 */
export type ApprovalMatcher = string;
/**
 * regex pattern used to determine if the approval should be considered 'rejected'
 */
export type RejectionMatcher = string;
/**
 * expected format for the external creation request URL. Values can be substituted in using {{value}}
 */
export type URLTemplate = string;
/**
 * Provider specific configuration that LaunchDarkly needs in order to write feature flag data to the provider's data store
 */
export type ProviderFormVariables = FormVariable[];
export type SuccessPointer = string;
export type ErrorsPointer = string;
/**
 * Optional prefix to wrap payload data with (used for some integrations)
 */
export type Prefix = string;
/**
 * Optional suffix to wrap payload data with (used for some integrations)
 */
export type Suffix = string;
/**
 * Sentence-cased title to show for all links for this integration
 */
export type LinkGroupHeader = string;
/**
 * Title of the message
 */
export type Title = string;
/**
 * Text or markup content describing how links can be created for this integration
 */
export type LeadText = string;
/**
 * Data type for the metadata attribute
 */
export type Type1 = "string" | "uri";
/**
 * Url of the image. Handlebars template notation can be used to reference metadata fields.
 */
export type SourceUrl = string;
/**
 * Indicates whether the image should be rendered as an icon
 */
export type IsIcon = boolean;
/**
 * Indicates whether the image should be rendered as an avatar
 */
export type IsAvatar = boolean;
/**
 * Template string used to render a visual block in LaunchDarkly UI to display a name
 */
export type Name3 = string;
/**
 * Text to be displayed for the element. The text can contain template variables
 */
export type Text = string;
/**
 * Indicates whether the element should be bolded
 */
export type IsBold = boolean;
/**
 * Indicates whether the element should be rendered as a timestamp
 */
export type IsTimestamp = boolean;
/**
 * URL to be set for the element which also indicates the element should be rendered as a hyperlink
 */
export type Url = string;
/**
 * An array of elements to be combined to create a title block
 */
export type Elements = UIBlockElement[];
/**
 * Indicates whether the title should be displayed as a hyperlink in LaunchDarkly UI
 */
export type LinkToReference = boolean;
/**
 * Markdown string used to render a visual block in LaunchDarkly UI to display a link description
 */
export type Description3 = string;
/**
 * An array of elements to be combined to create a context block
 */
export type Elements1 = UIBlockElement[];
/**
 * This capability will disable in-app editing for the integration
 */
export type HideConfiguration = boolean;
/**
 * This capability will redirect users to an external URL when they attempt to create or edit the integration from the integrations page in LaunchDarkly.
 */
export type ExternalConfigurationURL = string;
/**
 * Unique key to be used to save and retrieve OAuth credentials used by your app. This is required if your app uses an OAuth flow.
 */
export type OAuthIntegrationKey = string;

/**
 * Describes the capabilities and intent of a LaunchDarkly integration
 */
export interface LaunchDarklyIntegrationsManifest {
  name: IntegrationName;
  version: Version;
  overview: ShortDescription;
  description: LongDescription;
  details?: LearnMoreDetails;
  author: Author;
  supportEmail: SupportEmail;
  links: Links;
  categories: Categories;
  icons: Icons;
  legacy?: Legacy;
  otherCapabilities?: OtherCapabilities;
  requiresOAuth?: RequiresOAuth;
  hideOnIntegrationsPage?: HideOnIntegrationsPage;
  formVariables?: FormVariables;
  capabilities?: Capabilities;
  oauthIntegrationKey?: OAuthIntegrationKey;
  [k: string]: unknown;
}
/**
 * A set of reference links supporting your integration
 */
export interface Links {
  site: Website;
  launchdarklyDocs?: LaunchDarklyDocumentation;
  privacyPolicy: PrivacyPolicy;
  supportWebsite?: SupportWebsite;
  [k: string]: unknown;
}
/**
 * Logos describing your integration in SVG format
 */
export interface Icons {
  square: SquareLogo;
  horizontal: HorizontalLogo;
  [k: string]: unknown;
}
/**
 * Legacy integration
 */
export interface Legacy {
  kind: Kind;
  [k: string]: unknown;
}
/**
 * A form variable describes an object property that the LaunchDarkly admin will be prompted for when they configure an integration.
 */
export interface FormVariable {
  key: Key;
  name: Name;
  type: Type;
  description: Description;
  placeholder?: Description1;
  isSecret?: IsThisVariableASecret;
  isOptional?: IsThisVariableOptional;
  isHidden?: HideVariableInTheUI;
  defaultValue?: DefaultValue;
  allowedValues?: AllowedValues;
  dynamicOptions?: DynamicOptions;
  dependsOn?: DependsOn;
  [k: string]: unknown;
}
/**
 * Parser and endpoint for handling dynamicEnum
 */
export interface DynamicOptions {
  endpoint: Endpoint;
  parser: DynamicOptionsParser;
  [k: string]: unknown;
}
/**
 * Properties that describe an HTTP request to an external endpoint
 */
export interface Endpoint {
  url: URL;
  method: HTTPMethod;
  headers?: HTTPHeaders;
  hmacSignature?: HMACSignature;
  [k: string]: unknown;
}
/**
 * A name and value pair to send as headers with the hook request
 */
export interface HeaderItems {
  name: Name1;
  value: Value;
  [k: string]: unknown;
}
/**
 * Whether or not and how to configure HMAC validation on outgoing webhooks
 */
export interface HMACSignature {
  headerName?: HMACSignatureHeaderName;
  hmacSecretFormVariableKey?: HMACSecretFormVariableKey;
  [k: string]: unknown;
}
/**
 * Mapping of property names to location in JSON response
 */
export interface DynamicOptionsParser {
  optionsPath: OptionsArrayPath;
  optionsItems: OptionsArray;
  [k: string]: unknown;
}
export interface OptionsArray {
  label: Label;
  value: Value1;
  [k: string]: unknown;
}
/**
 * Specify which capabilities you'd like your integration to have
 */
export interface Capabilities {
  auditLogEventsHook?: AuditLogEventsHook;
  reservedCustomProperties?: ReservedCustomProperties;
  trigger?: Trigger;
  approval?: Approval;
  featureStore?: FeatureStore;
  flagLink?: FlagLink;
  hideConfiguration?: HideConfiguration;
  externalConfigurationURL?: ExternalConfigurationURL;
  [k: string]: unknown;
}
/**
 * This capability will enable LaunchDarkly to send audit log event webhooks to your endpoint.
 */
export interface AuditLogEventsHook {
  endpoint?: Endpoint;
  templates: WebhookBodyTemplate;
  defaultPolicy?: DefaultPolicy;
  includeErrorResponseBody?: IncludeErrorResponseBody;
  deliveryMethod?: DeliveryMethod;
  useStandardWebhookPayload?: UseStandardWebhookPayload;
  [k: string]: unknown;
}
/**
 * Templates to use for body of the webhook request
 */
export interface WebhookBodyTemplate {
  flag?: FlagTemplate;
  project?: ProjectTemplate;
  environment?: EnvironmentTemplate;
  default?: DefaultTemplate;
  validation?: ValidationTemplate;
  member?: MemberTemplate;
  [k: string]: unknown;
}
/**
 * A LaunchDarkly policy. See https://docs.launchdarkly.com/home/members/role-policies for more information.
 */
export interface Policy {
  actions?: Actions;
  effect?: Effect;
  notActions?: NotActions;
  notResources?: NotResources;
  resources?: Resources;
  [k: string]: unknown;
}
/**
 * This capability is used to manage inbound webhook entry points that trigger feature flag changes in LaunchDarkly
 */
export interface Trigger {
  documentation: DocumentationLink;
  auth?: Authentication;
  defaultEventName?: DefaultEventName;
  testEventNameRegexp?: TestEventNameRegex;
  parser?: TriggerParser;
  [k: string]: unknown;
}
/**
 * Describes a mapping of property name to a location in the JSON response payload specified by a JSON pointer
 */
export interface TriggerParser {
  eventName?: EventNamePointer;
  value?: ValuePointer;
  url?: URLPointer;
  [k: string]: unknown;
}
/**
 * This capability enables integration-driven flag change approvals
 */
export interface Approval {
  name?: ApprovalSystemName;
  memberListRequest: MemberListRequest;
  environmentFormVariables?: EnvironmentFormVariables;
  flagFormVariables?: FlagFormVariables;
  creationRequest: CreationRequest;
  statusRequest: StatusRequest;
  postApplyRequest: PostApplyRequest;
  deletionRequest: DeletionRequest;
  [k: string]: unknown;
}
/**
 * Describes the HTTP request to get integration users for mapping to Launchdarkly users
 */
export interface MemberListRequest {
  endpoint: Endpoint;
  jsonBody?: JSONBody;
  parser: MemberListParser;
  [k: string]: unknown;
}
/**
 * Describes a mapping of integration member information to a location in the JSON response payload specified by a JSON pointer
 */
export interface MemberListParser {
  memberArrayPath: MemberArrayPath;
  memberItems: MemberItemsArray;
  [k: string]: unknown;
}
export interface MemberItemsArray {
  email: Email;
  memberId: MemberID;
  [k: string]: unknown;
}
/**
 * Describes the approval creation HTTP request and the parser used to process the JSON response
 */
export interface CreationRequest {
  endpoint: Endpoint;
  jsonBody?: JSONBody;
  parser?: ApprovalParser;
  [k: string]: unknown;
}
/**
 * Describes a mapping of property names to a location in the JSON response payload specified by a JSON pointer
 */
export interface ApprovalParser {
  approvalId?: ApprovalIDPointer;
  statusValue: StatusValuePointer;
  statusDisplay?: StatusValueDisplayPointer;
  approvalMatcher: ApprovalMatcher;
  rejectionMatcher?: RejectionMatcher;
  urlTemplate?: URLTemplate;
  [k: string]: unknown;
}
/**
 * Describes the approval status check HTTP request and the parser used to determine if the approval should be consider approved or rejected
 */
export interface StatusRequest {
  endpoint: Endpoint;
  jsonBody?: JSONBody;
  parser: ApprovalParser;
  [k: string]: unknown;
}
/**
 * Describes the HTTP request to make after the changes have been applied in LaunchDarkly
 */
export interface PostApplyRequest {
  endpoint: Endpoint;
  jsonBody?: JSONBody;
  parser: ApprovalParser;
  [k: string]: unknown;
}
/**
 * Describes the HTTP request for the deletion of the external approval entity
 */
export interface DeletionRequest {
  endpoint: Endpoint;
  jsonBody?: JSONBody;
  parser: ApprovalParser;
  [k: string]: unknown;
}
/**
 * This capability allows LaunchDarkly to write feature flag data to a given provider
 */
export interface FeatureStore {
  formVariables: ProviderFormVariables;
  validationRequest?: ValidationRequest;
  featureStoreRequest: FeatureStoreRequest;
  [k: string]: unknown;
}
/**
 * Details needed to make a request to test that the provided form variables are valid
 */
export interface ValidationRequest {
  endpoint: Endpoint;
  parser: FeatureStoreValidationParser;
  [k: string]: unknown;
}
/**
 * Mapping to success/errors value(s) in a JSON response body
 */
export interface FeatureStoreValidationParser {
  success: SuccessPointer;
  errors?: ErrorsPointer;
  [k: string]: unknown;
}
/**
 * Details needed to make a request to deliver the flag payload to the feature store
 */
export interface FeatureStoreRequest {
  endpoint: Endpoint;
  payloadPrefix?: Prefix;
  payloadSuffix?: Suffix;
  [k: string]: unknown;
}
/**
 * This capability is used to manage inbound flag links
 */
export interface FlagLink {
  header: LinkGroupHeader;
  emptyState: EmptyState;
  metadata?: FlagLinkMetadata;
  uiBlocks: UIBlocks;
  [k: string]: unknown;
}
/**
 * Content to display when there are no links to display for this integration
 */
export interface EmptyState {
  title?: Title;
  leadText?: LeadText;
  [k: string]: unknown;
}
/**
 * Key/value pairs describing attributes for the flag link's payload metadata property. The key is the name of the metadata field and the value is the configuration object for the field.
 */
export interface FlagLinkMetadata {
  [k: string]: {
    type: Type1;
    [k: string]: unknown;
  };
}
/**
 * UI blocks are visual components that represents a section of the view layout for a flag link displayed in LaunchDarkly
 */
export interface UIBlocks {
  image?: Image;
  name?: Name3;
  title?: Title1;
  description?: Description3;
  context?: FlagLinkContext;
  [k: string]: unknown;
}
/**
 * A visual block used to render an image in LaunchDarkly UI
 */
export interface Image {
  sourceUrl: SourceUrl;
  isIcon?: IsIcon;
  isAvatar?: IsAvatar;
  [k: string]: unknown;
}
/**
 * Object with visual elements used to display a link title in LaunchDarkly UI
 */
export interface Title1 {
  elements: Elements;
  linkToReference?: LinkToReference;
  [k: string]: unknown;
}
/**
 * A sub component of a UI block that can be combined with other elements to form a UI block
 */
export interface UIBlockElement {
  text: Text;
  isBold?: IsBold;
  isTimestamp?: IsTimestamp;
  url?: Url;
  [k: string]: unknown;
}
/**
 * Object with visual elements used to display context information for a link in LaunchDarkly UI
 */
export interface FlagLinkContext {
  elements: Elements1;
  [k: string]: unknown;
}
