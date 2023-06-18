/* eslint-disable no-unused-vars */

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//styles
import styles from "./auth.module.scss";

//features
import axios from "../../features/axios";

//images
import loader from "../../assets/loader.svg";

const Signup = () => {
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!loading) {
      setLoading(true);

      axios
        .post("/users/signup", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Welcome onboard!");
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

  const handleVerify = () => {
    setVerify(!verify);
  };

  useEffect(() => {
    if (errors?.username) {
      switch (errors?.username?.type) {
        case "required":
          toast.error("Username is required");
          break;

        case "minLength":
          toast.error("Username must be more that 5 characters");
          break;

        case "maxLength":
          toast.error("Username must be less that 20 characters");
          break;

        default:
          break;
      }
    } else if (errors?.email) {
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
          toast.error("Password must be more that 5 characters");
          break;

        case "maxLength":
          toast.error("Password must be less that 20 characters");
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
          Create an <span>account</span>
        </p>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              id="uname"
              {...register("username", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              className={errors.username ? styles.error : ""}
            />
          </div>
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
                maxLength: 20,
                minLength: 5,
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
            {loading ? <img src={loader} alt="loader" /> : "Create account"}
          </button>
        </form>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};

export default Signup;
