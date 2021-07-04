import { useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import validate from "../../components/useForm/validate";
import useForm from "../../components/useForm/useForm";

const Register = () => {
  const history = useHistory();

  const params = {
    username: { value: "", type: "text", title: "Nombre de usuario" },
    email: { value: "", type: "email", title: "Correo electrónico" },
    password: { value: "", type: "password", title: "Contraseña" },
    confirm: { value: "", type: "confirm", title: "Confirmar Contraseña" },
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

  const registerHandler = async (e) => {
    e.preventDefault();

    handleSubmit(e);
  };

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      axios
        .post("/auth/register", {
          username: form.username.value,
          email: form.email.value,
          password: form.password.value,
        })
        .then(function (response) {
          console.log(response);
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
          </section>
          <div className="input-container name">
            <label className="form-label" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Escriba su nombre de usuario"
              value={form.username.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.username}</div>
          </div>
          <div className="input-container email">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.email}</div>
          </div>
          <div className="input-container password">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Al menos 6 caracteres"
              value={form.password.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.password}</div>
          </div>
          <div className="input-container password">
            <label className="form-label" htmlFor="password">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirme su contraseña"
              id="password"
              value={form.confirm.value}
              onChange={(e) => handleChange(e)}
            />
            <div className="error">{errors.confirm}</div>
          </div>
          <div className="error">{errors.serverError}</div>
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

export default Register;
