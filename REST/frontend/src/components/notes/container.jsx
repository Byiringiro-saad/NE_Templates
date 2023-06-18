/* eslint-disable react/prop-types */

//styles
import styles from "./container.module.scss";

//components
import Box from "./box";

const Container = ({ notes }) => {
  return (
    <div className={styles.container}>
      {notes?.map((note) => (
        <Box key={note._id} note={note} />
      ))}
      {notes?.length === 0 && <p className={styles.empty}>No notes here!</p>}
    </div>
  );
};

export default Container;
