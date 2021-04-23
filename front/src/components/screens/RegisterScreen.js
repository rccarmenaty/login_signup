import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (password !== confirmPassword) {
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
        { username, email, password },
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
        <form>
          <section className="right">
            <h2>Registro</h2>
            
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
              value={username}
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
              value={email}
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
              value={password}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
            <div >
              <p>Ya tienes una cuenta? <Link to="/login">Entrar</Link></p>
            </div>
          
          <button className="signup-btn" type="submit">Registrarse</button>    
        </form>
         </div>
    </div>
  );
};

export default RegisterScreen;
