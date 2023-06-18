/* eslint-disable no-unused-vars */

import { toast } from "react-toastify";
import { useEffect, useState } from "react";

//styles
import styles from "./home.module.scss";

//components
import Container from "../notes/container";

//faetures
import axios from "../../features/axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.head}>All Notes</p>
      </div>
      <Container notes={notes} />
    </div>
  );
};

export default Notes;
