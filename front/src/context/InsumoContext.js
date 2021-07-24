import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  const [ins, dispatch] = useReducer(insumoReducer, {
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
      const { data } = await axios.get("/insumo");
      dispatch({ type: "REFRESH", payload: data });
      return true;
    } catch (error) {
      if (error.response && error.response.status === 410)
        history.push("/logout");
    }
  };

  const getOne = async (uuid) => {
    if (!uuid) dispatch({ type: "SET_CURRENT", payload: {} });
    try {
      const { data } = await axios.get(`/insumo/${uuid}`);
      dispatch({ type: "SET_CURRENT", payload: data });
      return true;
    } catch (error) {
      dispatch({ type: "SET_CURRENT", payload: {} });
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const resetCurrent = () => {
    dispatch({ type: "SET_CURRENT", payload: {} });
  };

  const delOne = async (uuid) => {
    try {
      const { data } = await axios.delete(`/insumo/${uuid}`);

      await list();
      if (ins.current && ins.current.uuid === uuid)
        dispatch({ type: "SET_CURRENT", payload: {} });
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const addOne = async (newProv) => {
    try {
      const { data } = await axios.post(`/insumo`, { ...newProv });
      await list();
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  const edit = async (uuid, newIns) => {
    try {
      await axios.put(`/insumo/${uuid}`, { ...newIns });
      await list();
      return true;
    } catch (error) {
      if (error.response.status === 410) history.push("/logout");
      else throw new Error(error.response.data.error);
    }
  };

  return (
    <InsumoContext.Provider
      value={{ ins, list, getOne, delOne, addOne, edit, resetCurrent }}
    >
      {props.children}
    </InsumoContext.Provider>
  );
};

export default InsumoContextProvider;
