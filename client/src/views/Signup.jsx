import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    await axiosClient
      .post(`/signup`, payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Signup here</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={nameRef} type="text" name="" placeholder="Full Name" />
      <input ref={emailRef} type="email" name="" placeholder="email" />
      <input ref={passwordRef} type="password" name="" placeholder="password" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        name=""
        placeholder="password confirmation"
      />
      <button className="btn btn-block">Signup</button>
      <p className="message">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
