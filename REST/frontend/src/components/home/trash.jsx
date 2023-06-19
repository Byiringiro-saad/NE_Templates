/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

//styles
import styles from "./home.module.scss";

//components
import Container from "../notes/container";
import axios from "../../features/axios";

const Trash = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("/notes/trash").then((res) => {});
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.head}>Trash</p>
      </div>
      <Container notes={notes} />
    </div>
  );
};

export default Trash;
