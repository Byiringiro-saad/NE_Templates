/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

//styles
import styles from "./home.module.scss";

//faetures
import axios from "../../features/axios";

//components
import Container from "../notes/container";

const Folder = () => {
  const params = useParams();

  const [folder, setFolder] = useState({});

  useEffect(() => {
    axios
      .get(`/folders/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFolder(res.data.folder);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [params]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.head}>{folder?.name}</p>
      </div>
      <Container notes={folder?.notes} />
    </div>
  );
};

export default Folder;
