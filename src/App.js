import Login from "./components/securiry/Login";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserList from "./components/user/UserList";

function App() {
  const { user, token } = useSelector((state) => state.user);
  const naviagte = useNavigate();
  useEffect(() => {
    if (!user || !token) naviagte("/login");
  }, [user, token, naviagte]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
