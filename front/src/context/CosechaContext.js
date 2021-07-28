import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const CosechaContext = createContext();

const cosechaReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return { ...state, list: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

const CosechaContextProvider = (props) => {
  let history = useHistory();
  const [cosecha, dispatch] = useReducer(cosechaReducer, {
    list: [],
    current: {},
  });

  useEffect(() => {
    try {
      list();
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  }, []);

  const list = async () => {
    try {
      const { data } = await axios.get("/cosecha");
      if (data) dispatch({ type: "REFRESH", payload: data });
    } catch (error) {
      //   throw new ErrorResponse(error.response.data.error, error.response.status);
    }
    return [];
  };

  const getCosecha = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/cosecha/${uuid}`);

      // console.log("Cosecha from DB: ", data);
      if (data) dispatch({ type: "SET_CURRENT", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      //   throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const delCosecha = async (uuid) => {
    try {
      const { data } = await axios.delete(`/cosecha/${uuid}`);
      if (data) {
        await list();
        if (cosecha.current && cosecha.current.uuid === uuid)
          dispatch({ type: "SET_CURRENT", payload: {} });

        return true;
      }
    } catch (error) {
      //   throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const addCosecha = async (cosecha) => {
    try {
      const { data } = await axios.post(`/cosecha`, { ...cosecha });
      if (data) await list();
      return data;
    } catch (error) {
      //   throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const editCosecha = async (uuid, cosecha) => {
    try {
      const { data } = await axios.put(`/cosecha/${uuid}`, { ...cosecha });

      if (data) {
        await list();
        return data;
      }
    } catch (error) {
      //   throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  return (
    <CosechaContext.Provider
      value={{ cosecha, list, getCosecha, delCosecha, addCosecha, editCosecha }}
    >
      {props.children}
    </CosechaContext.Provider>
  );
};

export default CosechaContextProvider;
