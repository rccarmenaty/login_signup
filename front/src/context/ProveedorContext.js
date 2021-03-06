import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  const [prov, dispatch] = useReducer(proveedorReducer, {
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
      const { data } = await axios.get("/proveedor");
      dispatch({ type: "REFRESH", payload: data });
      return true;
    } catch (error) {
      dispatch({ type: "REFRESH", payload: [] });
      if (error.response && error.response.status === 410)
        history.push("/logout");
    }
  };

  const getProveedor = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/proveedor/${uuid}`);
      dispatch({ type: "SET_CURRENT", payload: data });
      return true;
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const delProveedor = async (uuid) => {
    try {
      await axios.delete(`/proveedor/${uuid}`);

      await list();
      if (prov.current && prov.current.uuid === uuid)
        dispatch({ type: "SET_CURRENT", payload: {} });
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const addProveedor = async (newProv) => {
    try {
      await axios.post(`/proveedor`, { ...newProv });
      await list();
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const editProveedor = async (uuid, newProv) => {
    try {
      await axios.put(`/proveedor/${uuid}`, { ...newProv });
      await list();
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        prov,
        list,
        getProveedor,
        delProveedor,
        addProveedor,
        editProveedor,
      }}
    >
      {props.children}
    </ProveedorContext.Provider>
  );
};

export default ProveedorContextProvider;
