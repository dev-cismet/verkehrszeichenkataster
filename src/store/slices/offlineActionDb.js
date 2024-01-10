import { createSlice } from "@reduxjs/toolkit";

import * as offlineDatabase from "../../tools/offlineActionDbHelper";
import actions from "./actionSubslices";
import { getJWT, getLoginFromJWT } from "./auth";
import { DB_VERSION } from "../../constants/vkz";

const initialState = { tasks: [], rawTasks: [], intermediateResults: {} };

const slice = createSlice({
  name: "offlineActionDb",
  initialState,
  reducers: {
    storeDB(state, action) {
      state.db = action.payload;
      return state;
    },
    storeRep(state, action) {
      state.rep = action.payload;
      return state;
    },
    storeIntermediateResults(state, action) {
      state.intermediateResults = action.payload;

      return state;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
      return state;
    },
    setRawTasks(state, action) {
      state.rawTasks = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeDB, storeIntermediateResults, storeRep } = slice.actions;

export const getDB = (state) => {
  return state.offlineActionDb.db;
};
export const getRep = (state) => {
  return state.offlineActionDb.rep;
};
export const getIntermediateResults = (state) => {
  return state.offlineActionDb.intermediateResults;
};

export const getTasks = (state) => {
  return state.offlineActionDb.tasks;
};
export const getRawTasks = (state) => {
  return state.offlineActionDb.rawTasks;
};
export const initialize = (storedJWT) => {
  return async (dispatch, getState) => {
    const state = getState();
    const jwt = storedJWT ? storedJWT : getJWT(state);
    const login = getLoginFromJWT(jwt);
    offlineDatabase
      .createDb(login)
      .then((d) => {
        if (d !== undefined) {
          let rep = new offlineDatabase.GraphQLReplicator(d);

          const errorCallback = (error) => {
            console.log("error occured", error);
          };
          const changeCallback = (action) => {
            // console.log("change occured", action);
          };
          const login = getLoginFromJWT(jwt);
          rep.restart(
            { userId: login + "@belis", idToken: jwt },
            errorCallback,
            changeCallback
          );
          dispatch(storeRep(rep));
          dispatch(storeDB(d));

          //database is ready will now establish a subsription for all stored tasks in the offline db

          const query = d.actions
            .find()
            .where("applicationId")
            .eq(login + "@belis")
            .sort({ createdAt: "desc" });
        } else {
          console.error("offline database not available", jwt);

          throw new Error("offline database not available", jwt);
        }
      })
      .catch((e) => {
        console.error("offline database not available", e);

        throw new Error("offline database not available", e);
      });
  };
};

export const reInitialize = (storedJWT) => {
  return async (dispatch, getState) => {
    const state = getState();
    const jwt = storedJWT ? storedJWT : getJWT(state);
    const oldRep = getRep(state);
    const login = getLoginFromJWT(jwt);
    const loginLowerCase = (login || "").toLowerCase();
    const d = window["db_" + DB_VERSION + "_" + loginLowerCase];

    if (oldRep) {
      oldRep.dispose();
    }

    let rep = new offlineDatabase.GraphQLReplicator(d);

    const errorCallback = (error) => {
      console.log("error occured", error);
    };
    const changeCallback = (action) => {
      console.log("change occured", action);
    };
    rep.restart(
      { userId: login + "@belis", idToken: jwt },
      errorCallback,
      changeCallback
    );
    dispatch(storeRep(rep));
    dispatch(storeDB(d));
    const query = d.actions
      .find()
      .where("applicationId")
      .eq(login + "@belis")
      .sort({ createdAt: "desc" });
    query.$.subscribe((results) => {});
  };
};

export const truncateActionTables = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const db = getDB(state);

    if (db && db.actions) {
      db.actions.remove();

      db.destroy().then((res) => {
        window["dbInit"] = undefined;
        dispatch(initialize());
      });
    }
  };
};

export const resyncDb = (currentJwt) => {
  return async (dispatch, getState) => {
    const state = getState();
    const rep = getRep(state);

    if (rep) {
      const jwt = currentJwt ? currentJwt : getJWT(getState());

      const errorCallback = (error) => {
        console.log("error occured", error);
      };
      const changeCallback = (action) => {
        console.log("change occured", action);
      };

      const login = getLoginFromJWT(jwt);
      rep.restart(
        { userId: login + "@belis", idToken: jwt },
        errorCallback,
        changeCallback
      );
    }
  };
};

export const setSyncPoint = (time) => {
  const timeObj = time;

  return async (dispatch, getState) => {
    const state = getState();
    const rep = getRep(state);

    if (rep) {
      rep.setSyncPoint(timeObj);
    }
  };
};

export const { addImageToObjectAction } = actions;

export const uploadDocumemt = () => {};
