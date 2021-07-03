import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    // const config = {
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    // };

    try {
      const { data } = await axios.post(
        "/auth/login",
        { username, password }
        // config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("username", data.username);

      history.push("/");
    } catch (error) {
      setError(JSON.stringify(error));
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="split-screen">
      <div className="left">
        <section className="copy">
          <h1>Text header meesage related to the company</h1>
          <p>Sub-header, second message</p>
        </section>
      </div>
      <div className="right">
        <form onSubmit={loginHandler}>
          <h2>Acceder</h2>
          {error && <span>{error}</span>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Nombre de Usuario
            </label>
            <input
              type="text"
              required
              id="username"
              placeholder="Type your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Contraseña
            </label>
            <input
              type="password"
              required
              id="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span>
            No tienes una cuenta? <Link to="/register">Crear una</Link>
          </span>
          <br />
          <button type="submit" className="signup-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
