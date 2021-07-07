import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import ErrorResponse from "../utils/errorResponse";

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
  const [cosecha, dispatch] = useReducer(cosechaReducer, {
    list: [],
    current: {},
  });

  //   useEffect(() => {
  //     list();
  //   }, []);

  const list = async () => {
    try {
      const { data } = await axios.get("/cosecha");
      if (data) dispatch({ type: "REFRESH", payload: data });
    } catch (error) {
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
    return [];
  };

  const getOne = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/cosecha/${uuid}`);
      if (data) dispatch({ type: "SET_CURRENT", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const delOne = async (uuid) => {
    try {
      const { data } = await axios.delete(`/cosecha/${uuid}`);
      if (data) {
        await list();
        if (cosecha.current && cosecha.current.uuid === uuid)
          dispatch({ type: "SET_CURRENT", payload: {} });

        return true;
      }
    } catch (error) {
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const addOne = async (newProv) => {
    try {
      const { data } = await axios.post(`/cosecha`, { ...newProv });
      if (data) await list();
      return data;
    } catch (error) {
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const edit = async (uuid, newProv) => {
    try {
      const { data } = await axios.put(`/cosecha/${uuid}`, { ...newProv });

      if (data) {
        await list();
        return data;
      }
    } catch (error) {
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  return (
    <CosechaContext.Provider
      value={{ cosecha, list, getOne, delOne, addOne, edit }}
    >
      {props.children}
    </CosechaContext.Provider>
  );
};

export default CosechaContextProvider;
