import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
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
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span>{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            required
            id="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label>
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
          Do not have an account? <Link to="/register">Sign up</Link>
        </span>
        <br/>
        <button type="submit" className="signup-btn">
          Login
        </button>
       
      </form>
      </div>
    </div>
  );
};

export default LoginScreen;
