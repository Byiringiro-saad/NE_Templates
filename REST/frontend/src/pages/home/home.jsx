/* eslint-disable no-unused-vars */

import { toast } from "react-toastify";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";

//components
import Box from "../../components/folder/box";
import Top from "../../components/sidebar/top";

//icons
import { RiFileAddFill } from "react-icons/ri";

//styles
import styles from "./home.module.scss";

//features
import axios from "../../features/axios";

//components
import CreateNote from "../../components/portal/note/note";
import CreateFolder from "../../components/portal/folder/folder";

//images
import loader from "../../assets/loader.svg";

const Home = () => {
  const [createNote, setCreateNote] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateFolder = () => {
    setCreateFolder(!createFolder);
  };

  const handleCreateNote = () => {
    setCreateNote(!createNote);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/folders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFolders(res.data.folders);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {createNote && <CreateNote close={handleCreateNote} />}
      {createFolder && <CreateFolder close={handleCreateFolder} />}
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Top />
          <div className={styles.header}>
            <p className={styles.head}>My Folders</p>
          </div>
          <div className={styles.btn} onClick={handleCreateFolder}>
            <p>New Folder</p>
          </div>
          <div className={styles.folders}>
            {loading ? (
              <img src={loader} alt="loader" className={styles.loader} />
            ) : (
              <>
                {folders?.map((folder) => (
                  <Box key={folder._id} folder={folder} />
                ))}
              </>
            )}
            {folders?.length === 0 && !loading && (
              <p className={styles.empty}>No folders found!</p>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.one} onClick={handleCreateNote}>
              <RiFileAddFill className={styles.white} />
              <p className={styles.title}>New note</p>
            </div>
          </div>
          <div className={styles.notes}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
