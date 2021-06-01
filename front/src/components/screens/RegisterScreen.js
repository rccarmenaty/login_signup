import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [user_name, setUsername] = useState("");
  const [user_full_name, setUser_full_name] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (user_password !== confirmPassword) {
      setConfirmPassword("");
      setPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { user_full_name, user_name, user_email, user_password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);

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
        <form onSubmit={registerHandler}>
          <section className="right">
            <h2>Registro</h2>
            {error && <h5>{error}</h5>}
          </section>
          <div className="input-container name">
            <label className="form-label" htmlFor="fname">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              id="fname"
              placeholder="Escriba su nombre completo"
              value={user_full_name}
              onChange={(e) => setUser_full_name(e.target.value)}
            />
          </div>
          <div className="input-container name">
            <label className="form-label" htmlFor="fname">
              Nombre de Usuario
            </label>
            <input
              type="text"
              required
              id="fname"
              placeholder="Escriba su nombre de usuario"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container email">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              required
              id="email"
              placeholder="Correo electrónico"
              value={user_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container password">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              required
              id="password"
              placeholder="Al menos 6 caracteres"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container password">
            <label className="form-label" htmlFor="password">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="Confirme su contraseña"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <p>
              Ya tienes una cuenta? <Link to="/login">Acceder</Link>
            </p>
          </div>

          <button className="signup-btn" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
