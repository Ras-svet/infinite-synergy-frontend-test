import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Users from "../Users/Users";
import NotFound from "../NotFound/NotFound";
import PopupConfirm from "../PopupConfirm/PopupConfirm"

function App() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <>
      <div className="body">
        <div className="page">
          <Routes>
            <Route exact path="/" element={
              <>
                <main className="main">
                  <Users />
                </main>
              </>
            } />

            <Route path="*" element={
              <main className="main">
                <NotFound />
              </main>
            } />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;