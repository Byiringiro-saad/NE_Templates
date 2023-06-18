/* eslint-disable no-unused-vars */

import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//styles
import styles from "./note.module.scss";

//images
import loader from "../../../assets/loader.svg";

//features
import axios from "../../../features/axios";

const ChooseFolder = ({ close }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
  };

  useEffect(() => {
    axios
      .get("/folders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFolders(res.data.folders);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>Choose Folder</p>
          <div className={styles.close} onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <form className={styles.body} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <select
              name="folder"
              id="folder"
              {...register("folder", {
                required: true,
              })}
            >
              {folders.map((folder, index) => (
                <option key={index} value="one">
                  {folder?.name}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.btn} type="submit">
            {loading ? <img src={loader} alt="loader" /> : <p>Save</p>}
          </button>
        </form>
      </div>
      <div className={styles.background} onClick={() => close()} />
    </div>,
    document.getElementById("portal")
  );
};

export default ChooseFolder;
