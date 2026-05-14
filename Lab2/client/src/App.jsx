import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import CreatePostPage from "./pages/CreatePostPage";
import DetailPostPage from "./pages/DetailPostPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<DetailPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
