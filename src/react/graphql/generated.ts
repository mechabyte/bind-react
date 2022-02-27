export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
};

/** Attributes for creating or updating a profile vehicle */
export type AdditionalVehicleInput = {
  /** Vehicle VIN */
  vin: Scalars['String'];
};

export enum BillingCycle {
  /** Full Term */
  FullTerm = 'full_term',
  /** Monthly */
  Monthly = 'monthly'
}

export type CheckboxFormInput = FormInput & {
  __typename?: 'CheckboxFormInput';
  checked: Scalars['Boolean'];
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  options: Array<InputOption>;
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
};


export type CheckboxFormInputNodeArgs = {
  id: Scalars['ID'];
};


export type CheckboxFormInputNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type CompletedProfile = Profile & {
  __typename?: 'CompletedProfile';
  completed: Scalars['Boolean'];
  declined?: Maybe<Scalars['Boolean']>;
  drivers: Array<Driver>;
  id: Scalars['ID'];
  mailingAddress: MailingAddress;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  operationFields?: Maybe<Array<FormInput>>;
  policy?: Maybe<Policy>;
  prefilled: Scalars['Boolean'];
  prefilling: Scalars['Boolean'];
  quoteCheckout?: Maybe<QuoteCheckout>;
  rate?: Maybe<RatingRequest>;
  rated: Scalars['Boolean'];
  rating?: Maybe<Scalars['Boolean']>;
  vehicles: Array<Vehicle>;
};


export type CompletedProfileNodeArgs = {
  id: Scalars['ID'];
};


export type CompletedProfileNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type CompletedProfileOperationFieldsArgs = {
  subject: Subject;
};


export type CompletedProfileQuoteCheckoutArgs = {
  billingCycle: BillingCycle;
  selectedQuoteId: Scalars['ID'];
};

export type DateFormInput = FormInput & {
  __typename?: 'DateFormInput';
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  maxDate?: Maybe<Scalars['ISO8601Date']>;
  minDate?: Maybe<Scalars['ISO8601Date']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  placeholder?: Maybe<Scalars['String']>;
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
  selectedDate?: Maybe<Scalars['ISO8601Date']>;
};


export type DateFormInputNodeArgs = {
  id: Scalars['ID'];
};


export type DateFormInputNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Driver = Node & {
  __typename?: 'Driver';
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  pni: Scalars['Boolean'];
};


export type DriverNodeArgs = {
  id: Scalars['ID'];
};


export type DriverNodesArgs = {
  ids: Array<Scalars['ID']>;
};

/** Attributes for drivers */
export type DriverInput = {
  /** Driver has taken an accident prevention course */
  accidentPreventionCourse?: InputMaybe<Scalars['Boolean']>;
  /** Driver is active-duty military */
  activeDutyMilitary?: InputMaybe<Scalars['Boolean']>;
  /** Age driver obtained driver license */
  ageWhenLicensed?: InputMaybe<Scalars['Int']>;
  /** Driver's date of birth */
  dob?: InputMaybe<Scalars['ISO8601Date']>;
  /** First name of the driver */
  firstName?: InputMaybe<Scalars['String']>;
  /** Driver gender */
  gender?: InputMaybe<Gender>;
  /** Last name of the driver */
  lastName?: InputMaybe<Scalars['String']>;
  /** Driver license number */
  licenseNumber?: InputMaybe<Scalars['String']>;
  /** Driver license state */
  licenseState?: InputMaybe<Market>;
  /** Driver marital status */
  maritalStatus?: InputMaybe<MaritalStatus>;
  /** Driver is a member of the national guard */
  nationalGuardMember?: InputMaybe<Scalars['Boolean']>;
  /** Driver only uses vehicles occasionally */
  occasionalDriver?: InputMaybe<Scalars['Boolean']>;
  /** Is primary named insured driver */
  primaryNamedInsured?: InputMaybe<Scalars['Boolean']>;
  /** Driver has taken a refresher prevention course */
  refresherPreventionCourse?: InputMaybe<Scalars['Boolean']>;
};

/** Attributes for selecting profile driver vehicles */
export type DriverSelectVehicles = {
  driverId: Scalars['ID'];
  secondaryVehicleIds?: InputMaybe<Array<Scalars['ID']>>;
  vehicleIds: Array<Scalars['ID']>;
};

/** Attributes for targeting drivers */
export type DriverTargetInput = {
  /** ID of the driver to target */
  driverId: Scalars['ID'];
};

/** Attributes for updating an additional profile vehicle */
export type EditAdditionalVehicleInput = {
  additionalVehicleId: Scalars['ID'];
  updates: AdditionalVehicleInput;
};

/** Attributes for updating a profile driver */
export type EditDriverInput = {
  driverId: Scalars['ID'];
  updates: DriverInput;
};

export type EmbeddedAccount = Node & {
  __typename?: 'EmbeddedAccount';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  profile: Profile;
};


export type EmbeddedAccountNodeArgs = {
  id: Scalars['ID'];
};


export type EmbeddedAccountNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type FormInput = {
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
};

export enum Gender {
  /** FEMALE */
  F = 'F',
  /** MALE */
  M = 'M',
  /** NOT_SPECIFIED */
  X = 'X'
}

export enum HomeownerStatus {
  /** Own */
  Own = 'OWN',
  /** Rent */
  Rent = 'RENT'
}

export type IncompleteProfile = Node & Profile & {
  __typename?: 'IncompleteProfile';
  completed: Scalars['Boolean'];
  drivers: Array<Driver>;
  id: Scalars['ID'];
  mailingAddress: MailingAddress;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  requiredFields?: Maybe<Array<FormInput>>;
  vehicles: Array<Vehicle>;
};


export type IncompleteProfileNodeArgs = {
  id: Scalars['ID'];
};


export type IncompleteProfileNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type IncompleteProfileRequiredFieldsArgs = {
  excludeSubmitted?: InputMaybe<Scalars['Boolean']>;
};

export type InputOption = {
  __typename?: 'InputOption';
  label: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  value: Scalars['String'];
};


export type InputOptionNodeArgs = {
  id: Scalars['ID'];
};


export type InputOptionNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type MailingAddress = Node & {
  __typename?: 'MailingAddress';
  city: Scalars['String'];
  id: Scalars['ID'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  state?: Maybe<Market>;
  zip?: Maybe<Scalars['Int']>;
};


export type MailingAddressNodeArgs = {
  id: Scalars['ID'];
};


export type MailingAddressNodesArgs = {
  ids: Array<Scalars['ID']>;
};

/** Attributes for a mailing address */
export type MailingAddressInput = {
  /** Address city */
  city?: InputMaybe<Scalars['String']>;
  /** Address line one */
  line1?: InputMaybe<Scalars['String']>;
  /** Address line two */
  line2?: InputMaybe<Scalars['String']>;
  /** Address state */
  state?: InputMaybe<Market>;
  /** Address zip */
  zip?: InputMaybe<Scalars['String']>;
};

export enum MaritalStatus {
  /** Married */
  Married = 'Married',
  /** Single */
  Single = 'Single',
  /** Widowed */
  Widowed = 'Widowed'
}

export enum Market {
  /** Alaska */
  Ak = 'AK',
  /** Alabama */
  Al = 'AL',
  /** Arkansas */
  Ar = 'AR',
  /** Arizona */
  Az = 'AZ',
  /** California */
  Ca = 'CA',
  /** Colorado */
  Co = 'CO',
  /** Connecticut */
  Ct = 'CT',
  /** District Of Columbia */
  Dc = 'DC',
  /** Delaware */
  De = 'DE',
  /** Florida */
  Fl = 'FL',
  /** Georgia */
  Ga = 'GA',
  /** Hawaii */
  Hi = 'HI',
  /** Iowa */
  Ia = 'IA',
  /** Idaho */
  Id = 'ID',
  /** Illinois */
  Il = 'IL',
  /** Indiana */
  In = 'IN',
  /** Kansas */
  Ks = 'KS',
  /** Kentucky */
  Ky = 'KY',
  /** Louisiana */
  La = 'LA',
  /** Massachusetts */
  Ma = 'MA',
  /** Maryland */
  Md = 'MD',
  /** Maine */
  Me = 'ME',
  /** Michigan */
  Mi = 'MI',
  /** Minnesota */
  Mn = 'MN',
  /** Missouri */
  Mo = 'MO',
  /** Mississippi */
  Ms = 'MS',
  /** Montana */
  Mt = 'MT',
  /** North Carolina */
  Nc = 'NC',
  /** North Dakota */
  Nd = 'ND',
  /** Nebraska */
  Ne = 'NE',
  /** New Hampshire */
  Nh = 'NH',
  /** New Jersey */
  Nj = 'NJ',
  /** New Mexico */
  Nm = 'NM',
  /** Nevada */
  Nv = 'NV',
  /** New York */
  Ny = 'NY',
  /** Ohio */
  Oh = 'OH',
  /** Oklahoma */
  Ok = 'OK',
  /** Oregon */
  Or = 'OR',
  /** Pennsylvania */
  Pa = 'PA',
  /** Rhode Island */
  Ri = 'RI',
  /** South Carolina */
  Sc = 'SC',
  /** South Dakota */
  Sd = 'SD',
  /** Tennessee */
  Tn = 'TN',
  /** Texas */
  Tx = 'TX',
  /** Utah */
  Ut = 'UT',
  /** Virginia */
  Va = 'VA',
  /** Vermont */
  Vt = 'VT',
  /** Washington */
  Wa = 'WA',
  /** Wisconsin */
  Wi = 'WI',
  /** West Virginia */
  Wv = 'WV',
  /** Wyoming */
  Wy = 'WY'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  performProfileOperations?: Maybe<PerformProfileOperationsPayload>;
};


export type MutationNodeArgs = {
  id: Scalars['ID'];
};


export type MutationNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationPerformProfileOperationsArgs = {
  input: PerformProfileOperationsInput;
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'];
};

export type NumberFormInput = FormInput & {
  __typename?: 'NumberFormInput';
  description?: Maybe<Scalars['String']>;
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
  minValue?: Maybe<Scalars['Int']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  placeholder?: Maybe<Scalars['String']>;
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['Int']>;
};


export type NumberFormInputNodeArgs = {
  id: Scalars['ID'];
};


export type NumberFormInputNodesArgs = {
  ids: Array<Scalars['ID']>;
};

/** Autogenerated input type of PerformProfileOperations */
export type PerformProfileOperationsInput = {
  attemptPrefill: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  externalUserId: Scalars['String'];
  operations: Array<ProfileOperation>;
};

/** Autogenerated return type of PerformProfileOperations */
export type PerformProfileOperationsPayload = {
  __typename?: 'PerformProfileOperationsPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  embeddedAccount?: Maybe<EmbeddedAccount>;
  errors?: Maybe<Array<Scalars['String']>>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  success: Scalars['Boolean'];
};


/** Autogenerated return type of PerformProfileOperations */
export type PerformProfileOperationsPayloadNodeArgs = {
  id: Scalars['ID'];
};


/** Autogenerated return type of PerformProfileOperations */
export type PerformProfileOperationsPayloadNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Policy = Node & {
  __typename?: 'Policy';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
};


export type PolicyNodeArgs = {
  id: Scalars['ID'];
};


export type PolicyNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Profile = {
  completed: Scalars['Boolean'];
  drivers: Array<Driver>;
  mailingAddress: MailingAddress;
  vehicles: Array<Vehicle>;
};

/** Attributes for a profile */
export type ProfileInput = {
  /** Email address */
  email?: InputMaybe<Scalars['String']>;
  /** Homeowner status */
  homeownerStatus?: InputMaybe<HomeownerStatus>;
  /** Phone number */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Primary named innsured driver */
  primaryNamedInsuredId?: InputMaybe<Scalars['ID']>;
  /** Rideshare */
  rideshare?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileOperation = {
  addAdditionalVehicle?: InputMaybe<AdditionalVehicleInput>;
  addDriver?: InputMaybe<DriverInput>;
  addVehicle?: InputMaybe<VehicleInput>;
  editAdditionalVehicle?: InputMaybe<EditAdditionalVehicleInput>;
  editDriver?: InputMaybe<EditDriverInput>;
  removeAdditionalVehicle?: InputMaybe<VehicleTargetInput>;
  removeDriver?: InputMaybe<DriverTargetInput>;
  selectDriverVehicles?: InputMaybe<DriverSelectVehicles>;
  selectVehicleDrivers?: InputMaybe<VehicleSelectDrivers>;
  updateMailingAddress?: InputMaybe<MailingAddressInput>;
  updateProfile?: InputMaybe<ProfileInput>;
};

export type Query = {
  __typename?: 'Query';
  embeddedAccount?: Maybe<EmbeddedAccount>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  viewer?: Maybe<EmbeddedAccount>;
};


export type QueryEmbeddedAccountArgs = {
  externalId: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Quote = Node & {
  __typename?: 'Quote';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  tier: QuoteTier;
};


export type QuoteNodeArgs = {
  id: Scalars['ID'];
};


export type QuoteNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type QuoteCheckout = Node & {
  __typename?: 'QuoteCheckout';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  price: Scalars['Int'];
};


export type QuoteCheckoutNodeArgs = {
  id: Scalars['ID'];
};


export type QuoteCheckoutNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export enum QuoteTier {
  /** Custom coverage */
  Custom = 'custom',
  /** High coverage */
  High = 'high',
  /** Low coverage */
  Low = 'low',
  /** Matched coverage */
  RateCall_1Match = 'rate_call_1_match',
  /** Recommended tier */
  Recommended = 'recommended',
  /** Right quote coverage */
  RightQuote = 'right_quote',
  /** State minimum coverage */
  StateMinimum = 'state_minimum'
}

export type Rate = Node & {
  __typename?: 'Rate';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  quotes: Array<Quote>;
};


export type RateNodeArgs = {
  id: Scalars['ID'];
};


export type RateNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type RateQuotesArgs = {
  tiers: Array<QuoteTier>;
};

export type RatingRequest = Node & {
  __typename?: 'RatingRequest';
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  rate?: Maybe<Rate>;
  underwritingDecision: UnderwritingDecision;
};


export type RatingRequestNodeArgs = {
  id: Scalars['ID'];
};


export type RatingRequestNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type SelectFormInput = FormInput & {
  __typename?: 'SelectFormInput';
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  options: Array<InputOption>;
  placeholder?: Maybe<Scalars['String']>;
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
  selectedOption?: Maybe<Scalars['String']>;
};


export type SelectFormInputNodeArgs = {
  id: Scalars['ID'];
};


export type SelectFormInputNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export enum Subject {
  /** Perform an action against an additional vehicle */
  AdditionalVehicle = 'ADDITIONAL_VEHICLE',
  /** Perform an action against an additional driver */
  Driver = 'DRIVER',
  /** Perform an action against a profile */
  Profile = 'PROFILE',
  /** Perform an action against a quote tier */
  Quote = 'QUOTE'
}

export type TextFormInput = FormInput & {
  __typename?: 'TextFormInput';
  description?: Maybe<Scalars['String']>;
  /** Is the input disabled */
  disabled?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  /** The name of the input */
  name: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  placeholder?: Maybe<Scalars['String']>;
  /** Is the input required */
  required?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
};


export type TextFormInputNodeArgs = {
  id: Scalars['ID'];
};


export type TextFormInputNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type UnderwritingDecision = Node & {
  __typename?: 'UnderwritingDecision';
  decided: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  underwritingStatus: Scalars['String'];
};


export type UnderwritingDecisionNodeArgs = {
  id: Scalars['ID'];
};


export type UnderwritingDecisionNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Vehicle = Node & {
  __typename?: 'Vehicle';
  id: Scalars['ID'];
  make: Scalars['String'];
  model: Scalars['String'];
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  shortVin?: Maybe<Scalars['String']>;
  vin: Scalars['String'];
  year: Scalars['Int'];
};


export type VehicleNodeArgs = {
  id: Scalars['ID'];
};


export type VehicleNodesArgs = {
  ids: Array<Scalars['ID']>;
};

/** Attributes for creating or updating a profile vehicle */
export type VehicleInput = {
  /** Vehicle make */
  make?: InputMaybe<Scalars['String']>;
  /** Vehicle model */
  model?: InputMaybe<Scalars['String']>;
  /** Vehicle VIN */
  vin?: InputMaybe<Scalars['String']>;
  /** Vehicle creation year */
  year?: InputMaybe<Scalars['Int']>;
};

/** Attributes for selecting profile vehicle drivers */
export type VehicleSelectDrivers = {
  driverIds: Array<Scalars['ID']>;
  secondaryDriverIds?: InputMaybe<Array<Scalars['ID']>>;
  vehicleId: Scalars['ID'];
};

/** Attributes for targeting vehicles */
export type VehicleTargetInput = {
  /** ID of the vehicle to target */
  vehicleId: Scalars['ID'];
};

export type EmbeddedAppQueryVariables = Exact<{
  externalId: Scalars['ID'];
}>;


export type EmbeddedAppQuery = { __typename?: 'Query', embeddedAccount?: { __typename?: 'EmbeddedAccount', id: string, profile: { __typename: 'CompletedProfile', prefilled: boolean, prefilling: boolean, rated: boolean, rating?: boolean | null, completed: boolean, drivers: Array<{ __typename?: 'Driver', id: string, firstName: string, lastName: string }>, mailingAddress: { __typename?: 'MailingAddress', city: string, state?: Market | null, zip?: number | null }, vehicles: Array<{ __typename?: 'Vehicle', id: string, make: string, model: string, year: number }> } | { __typename: 'IncompleteProfile', completed: boolean, requiredFields?: Array<{ __typename: 'CheckboxFormInput', checked: boolean, disabled?: boolean | null, label?: string | null, required?: boolean | null, name: string } | { __typename: 'DateFormInput', disabled?: boolean | null, label?: string | null, maxDate?: any | null, minDate?: any | null, placeholder?: string | null, required?: boolean | null, selectedDate?: any | null, name: string } | { __typename: 'NumberFormInput', description?: string | null, disabled?: boolean | null, label?: string | null, maxValue?: number | null, minValue?: number | null, placeholder?: string | null, required?: boolean | null, name: string, numericValue?: number | null } | { __typename: 'SelectFormInput', disabled?: boolean | null, label?: string | null, required?: boolean | null, selectedOption?: string | null, name: string, options: Array<{ __typename?: 'InputOption', label: string, value: string }> } | { __typename: 'TextFormInput', description?: string | null, disabled?: boolean | null, label?: string | null, placeholder?: string | null, required?: boolean | null, value?: string | null, name: string }> | null, drivers: Array<{ __typename?: 'Driver', id: string, firstName: string, lastName: string }>, mailingAddress: { __typename?: 'MailingAddress', city: string, state?: Market | null, zip?: number | null }, vehicles: Array<{ __typename?: 'Vehicle', id: string, make: string, model: string, year: number }> } } | null };
