import React, { useEffect, useState } from "react";
import axios from "axios";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/proveedor/list", config);
        setPrivateData(data);
        console.log(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Internal error");
        history.push("/login");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span>{error}</span>
  ) : (
    <>
      <div>
        {privateData.map((e) => (
          <p key={e.uuid}>{e.nombre}</p>
        ))}
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateScreen;
