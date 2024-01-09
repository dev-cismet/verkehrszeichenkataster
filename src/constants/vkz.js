import { gql } from "graphql-request";
import queries from "./queries";

export const REST_SERVICE = "https://wunda-cloud.cismet.de/wunda/api";
export const DOMAIN = "WUNDA_BLAU";
export const ENDPOINT = REST_SERVICE + `/graphql/` + DOMAIN + "/execute";
export const APP_KEY = "verkehrszeichen-kataster";
export const STORAGE_PREFIX = "1";
export const STORAGE_POSTFIX = "1";

export const OFFLINE_ACTIONS_SYNC_URL =
  "https://offline-actions-wunda-cloud.cismet.de/v1/graphql";
export const OFFLINE_ACTIONS_ENDPOINT_URL =
  "wss://offline-actions-wunda-cloud.cismet.de/v1/graphql";
export const DB_VERSION = "vzk-online-cloud-db-1.0";

export const jwtTestQuery = gql`
  ${queries.jwtTestQuery}
`;

export const landParcelQuery = gql`
  ${queries.landParcel}
`;
