import { useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";

const Login = () => {
  const history = useHistory();

  const params = {
    username: { value: "", type: "text", title: "Nombre de usuario" },
    password: { value: "", type: "password", title: "Contraseña" },
  };

  const {
    handleChange,
    form,
    handleSubmit,
    errors,
    setError,
    submitting,
    setSubmitting,
  } = useForm(params, validate);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      axios
        .post("/auth/login", {
          username: form.username.value,
          password: form.password.value,
        })
        .then(function (response) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("username", response.data.username);

          history.push("/");
        })
        .catch(function (error) {
          setError({ serverError: error.response.data.error });
        });
    }
  }, [submitting]);

  const loginHandler = async (e) => {
    e.preventDefault();
    handleSubmit(e);
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

          <div className="input-container">
            <label className="form-label" htmlFor="email">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Escriba su nombre de usuario"
              value={form.username.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.username}</div>
          </div>
          <div className="input-container">
            <label className="form-label" htmlFor="email">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Escriba su contraseña"
              value={form.password.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.password}</div>
          </div>
          <div className="error">{errors.serverError}</div>
          <br />
          <div>
            <span>
              No tienes una cuenta? <Link to="/register">Crear una</Link>
            </span>
          </div>
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
