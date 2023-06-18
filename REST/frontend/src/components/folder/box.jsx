/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

//styles
import styles from "./box.module.scss";

//icons
import { FcFolder } from "react-icons/fc";

const Box = ({ folder }) => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const goToFolder = () => {
    navigate(`/home/${folder._id}`);
  };

  useEffect(() => {
    const untrashed = folder?.notes?.filter((note) => !note?.trash);
    setNotes(untrashed);
  }, [folder]);

  return (
    <div className={styles.container} onClick={goToFolder}>
      <div className={styles.icon}>
        <FcFolder />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{folder?.name}</p>
        <p className={styles.notes}>{notes?.length} Notes</p>
        <p className={styles.titles}>
          {notes?.map((note) => note.title + ", ")}
        </p>
      </div>
    </div>
  );
};

export default Box;
