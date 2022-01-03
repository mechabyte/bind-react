import type { GetProfileRulesRequestType } from "@embedded-bind/client/types";
/**
 * https://tkdodo.eu/blog/leveraging-the-query-function-context
*/


const keys = {
  // ✅ all keys are arrays with exactly one object
  all: [{ scope: 'app' }] as const,
  bindProfile: () =>
    [{ ...keys.all[0], entity: 'bindProfile' }] as const,
  prefillRequest: () =>
    [{ ...keys.all[0], entity: 'prefillRequest' }] as const,
  profileRules: ({ market }: GetProfileRulesRequestType) =>
    [{ ...keys.all[0], entity: 'profileRules', market }] as const,
  ratingRequests: () =>
    [{ ...keys.all[0], entity: 'ratingRequest' }] as const,
  ratingRequest: (id: string) =>
    [{ ...keys.ratingRequests()[0], id }] as const,
};

export default keys;