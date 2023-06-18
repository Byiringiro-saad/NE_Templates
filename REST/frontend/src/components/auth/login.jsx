/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//styles
import styles from "./auth.module.scss";

//images
import loader from "../../assets/loader.svg";

//features
import axios from "../../features/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [verify, setVerify] = useState(false);
  const [laoding, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleVerify = () => {
    setVerify(!verify);
  };

  const onSubmit = (data) => {
    if (!laoding) {
      setLoading(true);
      axios
        .post("/users/login", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Welcome back!");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (errors?.email) {
      switch (errors?.email?.type) {
        case "required":
          toast.error("Email is required");
          break;

        case "pattern":
          toast.error("Email is not valid");
          break;

        default:
          break;
      }
    } else if (errors?.password) {
      switch (errors?.password?.type) {
        case "required":
          toast.error("Password is required");
          break;

        case "minLength":
          toast.error("Password must be at least 5 characters");
          break;

        case "maxLength":
          toast.error("Password must be at most 20 characters");
          break;

        default:
          break;
      }
    }
  }, [errors, verify]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          Log in to your <span>account</span>
        </p>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              className={errors.email ? styles.error : ""}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
              className={errors.password ? styles.error : ""}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              handleSubmit()();
              handleVerify();
            }}
          >
            {laoding ? <img src={loader} alt="loader" /> : "Log in"}
          </button>
        </form>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};

export default Login;
