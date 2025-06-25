import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Root from "./root/Root";
import Login from "./pages/Login";
import Home from "./pages/Home";
import People from "./pages/People";
import Saved from "./pages/Saved";
import SavedPreview from "./pages/SavedPreview";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import IndivisualChat from "./pages/IndivisualChat";
import Explore from "./pages/Explore";
import IndivisualExplore from "./pages/IndivisualExplore";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="people" element={<People />} />
          <Route path="saved" element={<Saved />} />
          <Route path="saved/:foldername" element={<SavedPreview />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<IndivisualChat />} />
          <Route path="explore" element={<Explore />} />
          <Route path="explore/:id" element={<IndivisualExplore />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
