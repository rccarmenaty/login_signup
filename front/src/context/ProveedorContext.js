import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

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

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    try {
      const { data } = await axios.get("/proveedor");
      if (data) dispatch({ type: "REFRESH", payload: data });
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const getOne = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/proveedor/${uuid}`);
      if (data) dispatch({ type: "SET_CURRENT", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_CURRENT", payload: {} });
    }
  };

  const delOne = async (uuid) => {
    try {
      const { data } = await axios.delete(`/proveedor/${uuid}`);
      if (data) {
        await list();
        if (prov.current && prov.current.uuid === uuid)
          dispatch({ type: "SET_CURRENT", payload: {} });
      }
    } catch (error) {}
  };

  const addOne = async (newProv) => {
    try {
      const { data } = await axios.post(`/proveedor`, { ...newProv });
      if (data) await list();
      return data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  return (
    <ProveedorContext.Provider value={{ prov, list, getOne, delOne, addOne }}>
      {props.children}
    </ProveedorContext.Provider>
  );
};

export default ProveedorContextProvider;
