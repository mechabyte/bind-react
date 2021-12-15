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

interface CreateBindProfileRequestType {
  auth: string;
}

/**
 * {
	"bind_profile": {
		"id": "29b49580-d326-4dc5-a09f-c212b588c7bc",
		"cancel_url": "https://fauxclient-partner-testing.netlify.app/?cancel=true",
		"success_url": "https://fauxclient-partner-testing.netlify.app/?success=true",
		"email": "Brody21@hotmail.com",
		"policy_effective_date": "2021-12-16",
		"external_id": "c697ea43-ef9f-41da-8757-186f03d0e7b8",
		"vehicles": [
			{
				"vin": "2B3KA53H57H572371",
				"year": 2007,
				"make": "Dodge",
				"model": "Charger",
				"purchase_date": null,
				"vehicle_image_url": "https://picsum.photos/640/480"
			}
		],
		"drivers": [
			{
				"dob": "1969-10-20",
				"first_name": "Rey",
				"last_name": "Schultz",
				"gender": null,
				"homeowner_status": null,
				"marital_status": null,
				"license_number": null,
				"license_state": null,
				"primary_named_insured": true
			}
		],
		"mailing_address": {
			"line1": "472 Padberg Spring",
			"line2": null,
			"city": "Louisville/Jefferson County",
			"state": "OH",
			"zip": "45943"
		},
		"phone_number": "608-905-1421",
		"account_id": "f25a1998-0423-46ff-ac15-7ffff178e66e",
		"user_id": "88a0b473-e807-4014-8cc8-d0856acc0d89"
	}
}
 */

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
  address2: string;
  city: string;
  state: string;
  zip: string;
  latitude?: number;
  longitude?: number;
  licenseNumber: string;
  licenseState: string;
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
