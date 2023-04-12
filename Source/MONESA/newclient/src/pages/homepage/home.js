import { useState } from 'react';
import Login from './Login';
import Registerfor from './Register';

export default function Firstpage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const togglePopup2 = () => {
        setIsOpen2(!isOpen2);
    }

    return (
        <>
            {isOpen && <Login handleClose={togglePopup}></Login>}
            {isOpen2 && <Registerfor handleClose={togglePopup2}></Registerfor>}
            <p class="firstpage">
                <p class="Navbar">
                    <p class="logo1"></p>
                    <p class='logo2'></p>
                    <p class="button">
                        <button class="Log" onClick={togglePopup}>Login</button>
                        <button class="Reg" onClick={togglePopup2}>Register</button>
                    </p>
                </p>

                <p class="picture">
                    <p class="ecslip"></p>
                </p>

                <p class="content">
                    <p class="Text">
                        <p class="text1">A saving space for yourself or manage your familly's spending</p>
                        <p class="text2">Great website that allows you to control your money  from any place at any time without any interruption.</p>
                        <button type="button" class="go" onClick={togglePopup}>Saving Now</button>
                    </p>
                </p>
            </p>
        </>
    );
}