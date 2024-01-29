import React, {useState} from 'react';
// import './Styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Task from './Pages/Task';
import AllTask from "./Pages/AllTask";
// import Home from './Pages/Home';
// import VoiceNote from './Pages/VoiceNote';
// import Navbar from '../controllers/Component/Navbar';
// import {ApiContext} from "./ApiContext";
// import {ToastContainer} from "react-toastify";
function App() {
    const [refreshValue, setRefreshValue] = useState(false);
    const [refreshButtonDisabled, setRefreshButtonDisabled] = useState(false);

    return (
        <>
            {/*<ApiContext.Provider value={{refreshValue, setRefreshValue,refreshButtonDisabled,setRefreshButtonDisabled}}>*/}
                <div className="App-Body">
                    <BrowserRouter>
                        {/*<header>*/}
                            {/*<Navbar/>*/}
                        {/*</header>*/}
                        <Routes>
                            <Route path="/task" element={<Task />} />
                            <Route path="/" element={<AllTask />} />
                            {/*<Route path="/voice-note/*" element={<VoiceNote />} />*/}
                        </Routes>
                    </BrowserRouter>
                    {/*<ToastContainer />*/}
                </div>
            {/*</ApiContext.Provider>*/}
        </>
    );
}
export default App;
