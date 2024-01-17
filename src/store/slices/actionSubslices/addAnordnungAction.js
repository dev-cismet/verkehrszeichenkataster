import { v4 as uuidv4 } from "uuid";

import { getJWT, getLoginFromJWT } from "../auth";
import { getDB } from "../offlineActionDb";

const addAnordnungAction = (params) => {
  return async (dispatch, getState) => {
    const state = getState();
    const offlineActionDb = getDB(state);
    const jwt = getJWT(state);
    const login = getLoginFromJWT(jwt);

    const offlineAction = {
      id: uuidv4(),
      action: "SaveObject",
      jwt: jwt,
      parameter: JSON.stringify(params),
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationId: login + "@vzkat",
    };

    offlineActionDb.actions.insert(offlineAction);

    console.log(
      "added object to offline db to addIncident",
      params,
      offlineAction
    );
  };
};

export default addAnordnungAction;
