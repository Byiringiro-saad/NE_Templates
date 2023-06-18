import { Link } from "react-router-dom";

//styles
import styles from "./auth.module.scss";

const Start = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          Stay <span>Centered</span>
        </p>
      </div>
      <div className={styles.content}>
        <Link to="/login" className={styles.start}>
          Login into account
        </Link>
        <Link to="/signup" className={styles.start}>
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default Start;
