import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import ErrorResponse from "../utils/errorResponse";

export const ProveedorContext = createContext();

const proveedorReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return { ...state, list: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

const ProveedorContextProvider = (props) => {
  const [prov, dispatch] = useReducer(proveedorReducer, {
    list: [],
    current: {},
  });

  // useEffect(() => {
  //   list();
  // }, []);

  const list = async () => {
    try {
      const { data } = await axios.get("/proveedor");
      if (data) dispatch({ type: "REFRESH", payload: data });
    } catch (error) {
      dispatch({ type: "REFRESH", payload: [] });
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const getOne = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/proveedor/${uuid}`);
      if (data) dispatch({ type: "SET_CURRENT", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const delOne = async (uuid) => {
    try {
      const { data } = await axios.delete(`/proveedor/${uuid}`);
      if (data) {
        await list();
        if (prov.current && prov.current.uuid === uuid)
          dispatch({ type: "SET_CURRENT", payload: {} });

        return true;
      }
    } catch (error) {
      console.log(error);
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const addOne = async (newProv) => {
    try {
      const { data } = await axios.post(`/proveedor`, { ...newProv });
      if (data) await list();
      return data;
    } catch (error) {
      console.log(error);
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  const edit = async (uuid, newProv) => {
    try {
      const { data } = await axios.put(`/proveedor/${uuid}`, { ...newProv });

      if (data) {
        await list();
        return data;
      }
    } catch (error) {
      throw new ErrorResponse(error.response.data.error, error.response.status);
    }
  };

  return (
    <ProveedorContext.Provider
      value={{ prov, list, getOne, delOne, addOne, edit }}
    >
      {props.children}
    </ProveedorContext.Provider>
  );
};

export default ProveedorContextProvider;
