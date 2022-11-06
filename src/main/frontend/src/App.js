import React from "react";
import './App.css';
import SignUp from './components/SignUpPage';
import UserProfiles from './components/ImageUploadPage';
import SignIn from "./components/SigInPage";

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<SignUp/>} />
          <Route exact path='/signin' element={<SignIn/>}/>
          <Route exact path='/imageupload' element={<UserProfiles/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
