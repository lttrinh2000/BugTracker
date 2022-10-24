import React from "react";
import './App.css';
import SignUp from './components/SignUpAccount';
import UserProfiles from './components/ImageUpload';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<SignUp/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
