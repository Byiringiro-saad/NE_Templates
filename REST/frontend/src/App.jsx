import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Index from "./pages/index";
import Home from "./pages/home/home";

//components
import Start from "./components/auth/start";
import Login from "./components/auth/login";
import Notes from "./components/home/notes";
import Signup from "./components/auth/signup";
import Folder from "./components/home/folder";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Notes />} />
          <Route path=":id" element={<Folder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
