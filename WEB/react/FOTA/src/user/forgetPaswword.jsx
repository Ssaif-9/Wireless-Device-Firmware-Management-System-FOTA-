import React from "react";
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import gif from './assets/email.gif'

function ForgetPassword() {
    document.getElementsByTagName('body')[0].style='background-color: #ceeff4; overflow: auto;'

    const backendUrl = import.meta.env.VITE_URL;
    const [email, setEmail] = useState('');
    const emailRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        console.log('Email:', email);

        const error = document.getElementById('error_show');
        error.innerHTML = '';
        if (email === '') {
            error.innerHTML = 'Please enter your email';
            return;
        }

        const data = {
            email
        };
        console.log(data);
        try {
            // Create an options object for the fetch request
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch(`${backendUrl}/users/forgot`, options);
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                toast.success(result.message,
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                localStorage.setItem("email", JSON.stringify(data));
                window.location.href = "./reset_password";
            } else {
                // toast.error(result.error,
                //     {
                //         position: "top-center",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //     });
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,    
                });
        }
    };

    return (
        <div>
            <div className="w-auto tablet:max-w-md phone:max-w-md bg-white shadow-[0px_0px_10px_#ccc] tablet:mx-auto phone:mx-8 tablet:my-[10%] phone:my-[50%] p-5 rounded-[10px]">
                <h1 className="text-center text-[#487379] text-lg"><b>Forget Password</b></h1>
                <h6 className="text-base text-[#487379] font-bold my-2 text-center"> Enter your Email to get a reset code!!</h6>
                <form onSubmit={handleForgetPassword}>
                    <div className="flex justify-center mx-auto my-0 text-[#487379]">
                        {/* <label htmlFor="email" className="text-xl text-[#487379]">Email</label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                            className="mt-2 phone:p-2 tablet:w-[60%] phone:w-[75%] box-border border text-center p-[5px] rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50"
                        />
                    </div>
                    <div id="error_show" className="error"></div>
                    <div className="flex justify-center">
                        <button type="submit" className="border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px] m-3 p-3.5 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}


export default ForgetPassword;