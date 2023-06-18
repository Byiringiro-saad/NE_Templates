/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

//styles
import styles from "./container.module.scss";

//components
import Box from "./box";

const Container = ({ notes }) => {
  const [untrashed, setUntrashed] = useState([]);

  useEffect(() => {
    const untrashedNotes = notes?.filter((note) => !note?.trash);
    setUntrashed(untrashedNotes);
  }, [notes]);

  return (
    <div className={styles.container}>
      {untrashed?.map((note) => (
        <Box key={note._id} note={note} />
      ))}
      {untrashed?.length === 0 && (
        <p className={styles.empty}>No notes here!</p>
      )}
    </div>
  );
};

export default Container;
