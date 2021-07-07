import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import ErrorResponse from "../utils/errorResponse";

export const InsumoContext = createContext();

const insumoReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return { ...state, list: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

const InsumoContextProvider = (props) => {
  const [ins, dispatch] = useReducer(insumoReducer, {
    list: [],
    current: {},
  });

  const list = async () => {
    const { data } = await axios.get("/insumo");
    if (data) dispatch({ type: "REFRESH", payload: data });
  };

  const getOne = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/insumo/${uuid}`);
      if (data) dispatch({ type: "SET_CURRENT", payload: data });
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      throw error;
    }
  };

  const delOne = async (uuid) => {
    try {
      const { data } = await axios.delete(`/insumo/${uuid}`);
      if (data) {
        await list();
        if (ins.current && ins.current.uuid === uuid)
          dispatch({ type: "SET_CURRENT", payload: {} });
      }
    } catch (error) {
      throw error;
    }
  };

  const addOne = async (newProv) => {
    const { data } = await axios.post(`/insumo`, { ...newProv });
    if (data) await list();
  };

  const edit = async (uuid, newIns) => {
    await axios.put(`/insumo/${uuid}`, { ...newIns });
    await list();
  };

  return (
    <InsumoContext.Provider value={{ ins, list, getOne, delOne, addOne, edit }}>
      {props.children}
    </InsumoContext.Provider>
  );
};

export default InsumoContextProvider;
