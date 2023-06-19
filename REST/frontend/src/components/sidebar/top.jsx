//styles
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

//styles
import styles from "./top.module.scss";

//features
import axios from "../../features/axios";

//icons
import { BsTrashFill } from "react-icons/bs";
import { MdStickyNote2 } from "react-icons/md";

const Top = () => {
  const [notes, setNotes] = useState(0);
  const [trash, setTrash] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotes(res.data?.data.notesCount);
        setTrash(res.data?.data?.trashNotesCount);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }, []);

  const goHome = () => {
    navigate("/home");
  };

  const goToTrash = () => {
    navigate("/home/trash");
  };

  return (
    <div className={styles.container}>
      <div className={styles.one} onClick={goToTrash}>
        <BsTrashFill className={styles.white} />
        <p className={styles.title}>Trash</p>
        <p className={styles.num}>{trash}</p>
      </div>
      <div className={styles.one} onClick={goHome}>
        <MdStickyNote2 className={styles.bright} />
        <p className={styles.title}>Notes</p>
        <p className={styles.num}>{notes}</p>
      </div>
    </div>
  );
};

export default Top;
