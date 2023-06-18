import { Outlet } from "react-router";

//styles
import styles from "./index.module.scss";

//images
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import logo from "../../assets/logo.png";

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.one}>
        <img src={one} alt="one" />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <Outlet />
      </div>
      <div className={styles.two}>
        <img src={two} alt="two" />
      </div>
    </div>
  );
};

export default Index;
