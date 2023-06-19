/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

//styles
import styles from "./home.module.scss";

//components
import Container from "../notes/container";

const Trash = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {}, []);

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
