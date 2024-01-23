import { createSlice } from "@reduxjs/toolkit";
import {
  ENDPOINT,
  getAllAnordnungenQuery,
  getAnordnungByIdQuery,
  getDrawingByIdQuery,
  getFileByIdQuery,
  getRequestByIdQuery,
  getTextByIdQuery,
} from "../../constants/vkz";

const initialState = {
  allApplications: [],
  selectedApplications: [],
  currentApplication: {},
  timeline: [
    {
      type: "antrag",
      values: {
        ort: "Barmen",
        name: "Antrag",
      },
    },
  ],
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    storeAllApplications(state, action) {
      state.allApplications = action.payload;
      return state;
    },
    storeSelectedApplications(state, action) {
      state.selectedApplications = action.payload;
      return state;
    },
    storeCurrentApplication(state, action) {
      state.currentApplication = action.payload;
      return state;
    },
    storeTimeline(state, action) {
      const { id, timeline } = action.payload;

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item.uuid === id) {
            return {
              ...item,
              vzk_anordnung_timelineArrayRelationShip: timeline,
            };
          }
          return item;
        }
      );

      const updatedCurrentApplication = {
        ...state.currentApplication,
        vzk_anordnung_timelineArrayRelationShip: timeline,
      };

      return {
        ...state,
        selectedApplications: updatedSelectedApplications,
        currentApplication: updatedCurrentApplication,
      };
    },
    updateTimelineValues(state, action) {
      const { timelineIndex, itemValue, property, applicationId } =
        action.payload;

      const updatedCurrentApplicationTimeline =
        state.currentApplication.vzk_anordnung_timelineArrayRelationShip.map(
          (value, index) => {
            if (index === timelineIndex) {
              return {
                ...value,
                data: {
                  [property]: itemValue,
                },
              };
            }
            return value;
          }
        );

      return {
        ...state,
        currentApplication: {
          ...state.currentApplication,
          vzk_anordnung_timelineArrayRelationShip:
            updatedCurrentApplicationTimeline,
        },
      };
    },
    updateName(state, action) {
      const { timelineIndex, updatedName, applicationId } = action.payload;

      const updatedApplications = state.allApplications.map((item) => {
        if (item.id.toString() === applicationId) {
          const updatedTimeline = item.timeline.map((value, index) => {
            if (index === timelineIndex) {
              return {
                ...value,
                name: updatedName,
              };
            }
            return value;
          });

          return {
            ...item,
            timeline: updatedTimeline,
          };
        }
        return item;
      });

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item.id.toString() === applicationId) {
            const updatedTimeline = item.timeline.map((value, index) => {
              if (index === timelineIndex) {
                return {
                  ...value,
                  name: updatedName,
                };
              }
              return value;
            });

            return {
              ...item,
              timeline: updatedTimeline,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        allApplications: updatedApplications,
        selectedApplications: updatedSelectedApplications,
      };
    },
    updateTimelineTitle(state, action) {
      const { updatedTitle, applicationId } = action.payload;

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item?.uuid === applicationId) {
            return {
              ...item,
              title: updatedTitle,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        selectedApplications: updatedSelectedApplications,
      };
    },
    updateTimelineStatus(state, action) {
      const { updatedStatus, applicationId } = action.payload;

      const updatedApplications = state.allApplications.map((item) => {
        if (item.id.toString() === applicationId) {
          return {
            ...item,
            timelineStatus: updatedStatus,
          };
        }
        return item;
      });

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item.id.toString() === applicationId) {
            return {
              ...item,
              timelineStatus: updatedStatus,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        allApplications: updatedApplications,
        selectedApplications: updatedSelectedApplications,
      };
    },
    deleteTimelineObject(state, action) {
      const { timelineIndex, applicationId } = action.payload;

      const updatedApplications = state.allApplications.map((item) => {
        if (item.id.toString() === applicationId) {
          const updatedTimeline = item.timeline.filter(
            (value, index) => index !== timelineIndex
          );

          return {
            ...item,
            timeline: updatedTimeline,
          };
        }
        return item;
      });

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item.id.toString() === applicationId) {
            const updatedTimeline = item.timeline.filter(
              (value, index) => index !== timelineIndex
            );

            return {
              ...item,
              timeline: updatedTimeline,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        allApplications: updatedApplications,
        selectedApplications: updatedSelectedApplications,
      };
    },
  },
});

export default slice;

export const {
  storeAllApplications,
  storeSelectedApplications,
  storeCurrentApplication,
  storeSelectedRowKeys,
  storeTimeline,
  updateTimelineValues,
  updateName,
  updateTimelineTitle,
  updateTimelineStatus,
  deleteTimelineObject,
} = slice.actions;

export const getAllApplications = (state) => {
  return state.application.allApplications;
};

export const getSelectedApplications = (state) => {
  return state.application.selectedApplications;
};

export const getCurrentApplication = (state) => {
  return state.application.currentApplication;
};

export const getTimeline = (state) => {
  return state.application.timeline;
};

export const getApplicationById = (id) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    const selectedApplications = getState().application.selectedApplications;

    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: getAnordnungByIdQuery,
        variables: { id },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.data.vzk_anordnung.length > 0) {
          const selectedApplication =
            getState().application.selectedApplications.find(
              (element) => element.uuid?.toString() === id
            );
          dispatch(storeCurrentApplication(result.data.vzk_anordnung[0]));
          dispatch(
            getAttachments(
              result.data.vzk_anordnung[0]
                .vzk_anordnung_timelineArrayRelationShip,
              id
            )
          );
          if (!selectedApplication) {
            dispatch(
              storeSelectedApplications([
                ...selectedApplications,
                result.data.vzk_anordnung[0],
              ])
            );
          }
        }
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};

export const getAttachments = (timeline, uuid) => {
  const getQuery = (type) => {
    switch (type) {
      case "text":
        return getTextByIdQuery;
      case "request":
        return getRequestByIdQuery;
      case "file":
        return getFileByIdQuery;
      case "drawing":
        return getDrawingByIdQuery;
    }
  };

  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    let updatedTimeline = [];

    timeline.forEach((attachment) => {
      const type = attachment.vzk_attachment_typ.name.toLowerCase();
      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          query: getQuery(type),
          variables: { id: attachment.fk_uuid },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const getAttachmentData = () => {
            switch (type) {
              case "text":
                return result.data.vzk_attachment_text[0];
              case "request":
                return result.data.vzk_attachment_request[0];
              case "file":
                return result.data.vzk_attachment_file[0];
              case "drawing":
                return result.data.vzk_attachment_drawing[0];
            }
          };
          const attachmentData = getAttachmentData();
          updatedTimeline.push({ ...attachment, data: attachmentData });
          if (updatedTimeline.length === timeline.length) {
            updatedTimeline.sort((a, b) => a.id - b.id);
            dispatch(storeTimeline({ id: uuid, timeline: updatedTimeline }));
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    });
  };
};

export const getAllApplicationsDb = () => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        query: getAllAnordnungenQuery,
        variables: null,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatch(storeAllApplications(result.data.vzk_anordnung));
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
};
