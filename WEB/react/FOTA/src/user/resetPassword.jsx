import React from "react";
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

// import gif from './assets/email.gif'

function ResetPassword() {
    const backendUrl = import.meta.env.VITE_URL;
    // const [resendCode, setResendCode] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resendCode, setResendCode] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');


    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [type2, setType2] = useState('password');
    const [icon2, setIcon2] = useState(eyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    const handleToggle2 = () => {
        if (type2 === 'password') {
            setIcon2(eye);
            setType2('text')
        } else {
            setIcon2(eyeOff)
            setType2('password')
        }
    }


    const [timeLeft, setTimeLeft] = useState(1.5 * 60); // 5 minutes in seconds

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on component unmount
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    useEffect(() => {
        if (timeLeft === 0) {
            setResendCode(true);
            toast.error('Time out',
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
    }, [timeLeft]);



    useEffect(() => {
        const email = JSON.parse(localStorage.getItem("email"));
        setEmail(email.email);
    }, []);

    const handleResendCode = async () => {
        console.log('Email:', email);
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
            } else {
                toast.error(result.message,
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



            const handleResetPassword = async (e) => {
                e.preventDefault();
                console.log('Email:', email);
                console.log('Password:', password);
                console.log('Confirm Password:', confirmPassword);
                console.log('Code:', code);

                // const error = document.getElementById('error_show');
                // error.innerHTML = '';
                if (password === '') {
                    // error.innerHTML = 'Please enter your password';
                    toast.error('Please enter your password',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    return;
                }
                if (confirmPassword === '') {
                    // error.innerHTML = 'Please enter your confirm password';
                    toast.error('Please enter your confirm password',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    return;
                }
                if (code === '') {
                    // error.innerHTML = 'Please enter your code';
                    toast.error('Please enter your code',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    return;
                }
                if (password !== confirmPassword) {
                    // error.innerHTML = 'Password and Confirm Password do not match';
                    toast.error('Password and Confirm Password do not match',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    return;
                }

                const data = {
                    email,
                    password,
                    code
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
                    const response = await fetch(`${backendUrl}/users/reset`, options);
                    const result = await response.json();
                    // console.log(result);
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
                        localStorage.removeItem("email");
                        window.location.href = "./login";
                    } else {
                        // console.log(result.error);
                        toast.error(result.error,
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
                    <div className="w-auto tablet:max-w-md phone:max-w-md bg-white shadow-[0px_0px_10px_#ccc] tablet:mx-auto phone:mx-8 tablet:my-[10%] phone:my-[40%] p-5 rounded-[10px]">
                        <h1 className="text-center text-[#487379] text-lg"><b>Reset Password</b></h1>
                        <h6 className="text-base text-[#487379] font-bold my-2 text-center"> Enter your Reset Code to reset your password</h6>
                        <div className="flex justify-center text-[#487379] text-6xl mb-2 ">
                            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                        </div>
                        <form onSubmit={handleResetPassword}>
                            <div className="flex flex-col items-center">
                                {/* <label htmlFor="email" className="text-xl text-[#487379]">Email</label> */}
                                <div class="inline-flex">
                                    <input
                                        type={type}
                                        name='password'
                                        autoComplete="current-password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        inputMode='text'
                                        required
                                        className='box-border rounded-br-[25px] rounded-t-[25px] mb-2 rounded-bl-[25px] text-center p-[5px] border border-solid border-[#53f0f3] phone:w-[200px] phone:mx-auto tablet:w-[250px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                    />
                                    <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle}>
                                        <Icon className="absolute mr-10 -mt-2.5" icon={icon} size={22} />
                                    </span>
                                </div>
                                <div class="inline-flex">
                                    <input
                                        type={type2}
                                        name='confirmPassword'
                                        autoComplete="current-repassword"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        inputMode='text'
                                        required
                                        className='box-border rounded-br-[25px] rounded-t-[25px] mb-2 rounded-bl-[25px] text-center p-[5px] border border-solid border-[#53f0f3] phone:w-[200px] phone:mx-auto tablet:w-[250px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                    />
                                    <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle2}>
                                        <Icon className="absolute mr-10 -mt-2.5" icon={icon2} size={22} />
                                    </span>
                                </div>
                                {/* <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm Password"
                            className="mt-2 w-[60%] box-border border text-center p-[5px] rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3]"
                        /> */}
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                    placeholder="Code"
                                    className="box-border rounded-br-[25px] rounded-t-[25px] mb-2 rounded-bl-[25px] text-center p-[5px] border border-solid border-[#53f0f3] phone:w-[200px] phone:mx-auto tablet:w-[250px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                />
                            </div>
                            {resendCode && <p className="mt-5 text-lg text-[#487379] text-center cursor-pointer hover:text-[#53f0f3] hover:underline hover:font-bold"
                                onClick={() => {
                                    setTimeLeft(1.5 * 60); setResendCode(false)
                                    handleResendCode()
                                }}><a className="bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px] m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]">Resend code!!</a></p>}


                            <div className="flex justify-center">
                                <button type="submit" className="bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px] m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            );


        }

        export default ResetPassword;