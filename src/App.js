import {Route, Routes, BrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";
import Game from "./pages/Game";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/signout" element={<SignOut/>}/>
                <Route path="/game/:id" element={<Game/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/:username" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
