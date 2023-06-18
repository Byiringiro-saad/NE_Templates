/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//styles
import styles from "./note.module.scss";

//features
import axios from "../../../features/axios";

//images
import loader from "../../../assets/loader.svg";

const CreateNote = ({ close }) => {
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!loading) {
      setLoading(true);
      axios
        .post(
          "/notes",
          {
            title: data?.title,
            content: data?.content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("Note created!");
          close();
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
    if (errors?.title) {
      switch (errors.title.type) {
        case "required":
          toast.error("Title is required!");
          break;

        case "minLength":
          toast.error("Title must be at least 3 characters!");
          break;

        case "maxLength":
          toast.error("Title must be at most 15 characters!");
          break;

        default:
          break;
      }
    } else if (errors?.content) {
      switch (errors?.content?.type) {
        case "required":
          toast.error("Content is required!");
          break;

        case "minLength":
          toast.error("Content must be at least 5 characters!");
          break;

        default:
          break;
      }
    }
  }, [verify, errors]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>Create Note</p>
          <div className={styles.close} onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
              className={errors.title && styles.error}
            />
          </div>
          <div className={styles.input}>
            <textarea
              type="text"
              placeholder="Content"
              {...register("content", {
                required: true,
                minLength: 5,
              })}
              className={errors.content && styles.error}
            />
          </div>
          <button
            className={styles.btn}
            type="submit"
            onClick={() => {
              handleSubmit()();
              handleVerify();
            }}
          >
            {loading ? <img src={loader} alt="loader" /> : <p>Create</p>}
          </button>
        </form>
      </div>
      <div className={styles.background} onClick={() => close()} />
    </div>,
    document.getElementById("portal")
  );
};

export default CreateNote;
