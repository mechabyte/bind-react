type StatesAbbreviation = 'AL' |
'AK' |
'AZ' |
'AR' |
'CA' |
'CO' |
'CT' |
'DE' |
'FL' |
'GA' |
'HI' |
'ID' |
'IL' |
'IN' |
'IA' |
'KS' |
'KY' |
'LA' |
'ME' |
'MD' |
'MA' |
'MI' |
'MN' |
'MS' |
'MO' |
'MT' |
'NE' |
'NV' |
'NH' |
'NJ' |
'NM' |
'NY' |
'NC' |
'ND' |
'OH' |
'OK' |
'OR' |
'PA' |
'RI' |
'SC' |
'SD' |
'TN' |
'TX' |
'UT' |
'VT' |
'VA' |
'WA' |
'WI' |
'WV' |
'WY';

const StatesAbbreviations: {[key: string]: StatesAbbreviation} = {
  ALABAMA: 'AL',
  ALASKA: 'AK',
  ARIZONA: 'AZ',
  ARKANSAS: 'AR',
  CALIFORNIA: 'CA',
  COLORADO: 'CO',
  CoNNECTICUT: 'CT',
  DELAWARE: 'DE',
  FLORIDA: 'FL',
  GEORGIA: 'GA',
  HAWAII: 'HI',
  IDAHO: 'ID',
  ILLINOIS: 'IL',
  INDIANA: 'IN',
  IOWA: 'IA',
  KANSAS: 'KS',
  KENTUCKY: 'KY',
  LOUISIANA: 'LA',
  MAINE: 'ME',
  MARYLAND: 'MD',
  MASSACHUSETTS: 'MA',
  MICHIGAN: 'MI',
  MINNESOTA: 'MN',
  MISSISSIPPI: 'MS',
  MISSOURI: 'MO',
  MONTANA: 'MT',
  NEBRASKA: 'NE',
  NEVADA: 'NV',
  NEW_HAMPSHIRE: 'NH',
  NEW_JERSEY: 'NJ',
  NEW_MEXICO: 'NM',
  NEW_YORK: 'NY',
  NORTH_CAROLINA: 'NC',
  NORTH_DAKOTA: 'ND',
  OHIO: 'OH',
  OKLAHOMA: 'OK',
  OREGON: 'OR',
  PENNSYLVANIA: 'PA',
  RHODE_ISLAND: 'RI',
  SOUTH_CAROLINA: 'SC',
  SOUTH_DAKOTA: 'SD',
  TENNESSEE: 'TN',
  TEXAS: 'TX',
  UTAH: 'UT',
  VERMONT: 'VT',
  VIRGINIA: 'VA',
  WASHINGTON: 'WA',
  WISCONSIN: 'WI',
  WEST_VIRGINIA: 'WV',
  WYOMING: 'WI',
};

type BindProfileAddressType = {
  line1: string;
  line2?: string;
  city: string;
  state: StatesAbbreviation;
  zip: number;
};

type BindProfileDriverType = {
  dob: string;
  gender?: string;
  homeownerStatus?: string;
  licenseNumber?: string;
  licenseState?: string;
  maritalStatus?: string;
  primaryNamedInsured: boolean;
  firstName: string;
  lastName: string;
};

type BindProfileVehicleType = {
  make: string;
  model: string;
  purchaseDate?: string;
  vehicleImageUrl?: string;
  vin: string;
  year: number;
};

type BindProfileType = {
  id: string;
  accountId: string;
  userId: string;
  cancelUrl: string;
  successUrl: string;
  email: string;
  policyEffectiveDate: string;
  externalId: string;
  vehicles: [BindProfileVehicleType];
  drivers: [BindProfileDriverType];
  mailingAddress: BindProfileAddressType;
  phoneNumber: string;
}

interface AuthorizeBindProfileRequestType {
  auth: string;
}

interface AuthorizeBindProfileResponseType {
  error?: string;
  accessToken?: string;
  bindProfile?: BindProfileType;
};

interface CreatePrefillRequestRequestType {
  firstName: string;
  lastName: string;
  dob: string;
  address1: string;
  address2?: string;
  city: string;
  state: StatesAbbreviation;
  zip: number;
  latitude?: number;
  longitude?: number;
  licenseNumber: string;
  licenseState: StatesAbbreviation;
  barcode?: string;
  gender?: string;
  maritalStatus?: string;
  universalDriverId?: string;
  isAdditionalDriver?: boolean;
};

type PrefillRequestStatusType = 'in_progress' | 'complete';
const PrefillRequestStatuses: {[key: string]: PrefillRequestStatusType} = {
  COMPLETE: 'complete',
  IN_PROGRESS: 'in_progress',
};

interface CreatePrefillRequestResponseType {
  error?: string;
  status?: PrefillRequestStatusType;
};

type GetPrefillRequestRequestType = Record<string, unknown>;
interface GetPrefillRequestResponseType {
  prefill?: Record<string, unknown>
}

interface GetProfileRulesRequestType {
  market: StatesAbbreviation;
}
interface GetProfileRulesResponseType {
  error?: string;
  profileRulesContext?: Record<string, unknown>
}

type GetSupportedMarketsRequestType = Record<string, unknown>;
interface GetSupportedMarketsResponseType {
  supportedMarkets?: [StatesAbbreviation];
}

interface IBindClient {
  createPrefillRequest(req: CreatePrefillRequestRequestType): object;
}

export type {
  AuthorizeBindProfileRequestType,
  AuthorizeBindProfileResponseType,
  BindProfileType,
  CreatePrefillRequestRequestType,
  CreatePrefillRequestResponseType,
  GetPrefillRequestRequestType,
  GetPrefillRequestResponseType,
  GetProfileRulesRequestType,
  GetProfileRulesResponseType,
  GetSupportedMarketsRequestType,
  GetSupportedMarketsResponseType,
  IBindClient,
  StatesAbbreviation,
};

export {
  PrefillRequestStatuses,
  StatesAbbreviations,
};
