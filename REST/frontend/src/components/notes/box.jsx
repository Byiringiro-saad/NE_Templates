/* eslint-disable react/prop-types */

import { useState } from "react";
import moment from "moment/moment";

//styles
import styles from "./box.module.scss";

//icons
import { TbDots } from "react-icons/tb";
import { GrClose } from "react-icons/gr";

//components
import ChooseFolder from "../portal/note/folder";

const Box = ({ note }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [chooseFolder, setChooseFolder] = useState(false);

  const handleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChooseFolder = () => {
    setChooseFolder(!chooseFolder);
  };

  return (
    <div className={styles.container}>
      {chooseFolder && <ChooseFolder close={handleChooseFolder} />}
      {showOptions && (
        <div className={styles.options}>
          <GrClose className={styles.icon} onClick={handleOptions} />
          <div className={styles.option} onClick={handleChooseFolder}>
            <p className={styles.op}>Add to folder</p>
          </div>
          <div className={styles.option}>
            <p className={styles.op}>Move to trash</p>
          </div>
        </div>
      )}
      <p className={styles.title}>{note?.title}</p>
      <p className={styles.date}>{moment(note?.createdAt).format("MMM Do")}</p>
      <p className={styles.content}>{note?.content}</p>
      <TbDots className={styles.icon} onClick={handleOptions} />
    </div>
  );
};

export default Box;
