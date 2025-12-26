import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import CreateIdentity from "./pages/auth/CreateIdentity";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile/:id?" element={<Profile />} />
        <Route path="/create-identity" element={<CreateIdentity />} />
      </Route>
    </Routes>
  );
}

export default App;
