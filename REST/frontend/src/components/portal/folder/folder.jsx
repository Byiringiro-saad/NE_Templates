/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//styles
import styles from "./folder.module.scss";

//features
import axios from "../../../features/axios";

//images
import loader from "../../../assets/loader.svg";

const CreateFolder = ({ close }) => {
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
          "/folders",
          {
            name: data?.folder,
            color: data?.color,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("Folder created!");
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
    if (errors?.folder) {
      switch (errors.folder.type) {
        case "required":
          toast.error("Folder name is required!");
          break;

        case "minLength":
          toast.error("Folder name must be at least 3 characters!");
          break;

        case "maxLength":
          toast.error("Folder name must be at most 15 characters!");
          break;

        default:
          break;
      }
    } else if (errors?.color) {
      switch (errors?.color?.type) {
        case "required":
          toast.error("Color code is required!");
          break;

        case "minLength":
          toast.error("Color code must be at least 3 characters!");
          break;

        case "maxLength":
          toast.error("Color code must be at most 6 characters!");
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
          <p className={styles.title}>Create Folder</p>
          <div className={styles.close} onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Folder Name"
              {...register("folder", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
              className={errors.folder && styles.error}
            />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Color Code"
              {...register("color", {
                required: true,
                minLength: 3,
                maxLength: 6,
              })}
              className={errors.color && styles.error}
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

export default CreateFolder;
