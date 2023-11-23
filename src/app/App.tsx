import React from "react";

import Dashboard from "../pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SprintViewer from "../features/SprintViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sprint" element={<SprintViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
