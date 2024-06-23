import React from "react";
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gif from '../assets/email.gif'

function OtpInput() {

    if (!localStorage.getItem('user')) {
        window.location.href = '/signup';
    }

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [resendCode, setResendCode] = useState(false);
    const [error, setError] = useState("");

    function isAlphaNumeric(str) {
        if (str === "" || str === " " || str === null || str === undefined || str.length > 1) {
            return false;
        }
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    const handleChange = (element, index) => {
        if (element.value === "" || element.value === " ") {
            if (element.previousSibling) {
                element.previousSibling.focus();
                if (element.previousSibling.value === "" && index > 1 || element.previousSibling.value === " " && index > 1) {
                    element.previousSibling.previousSibling.focus();
                }
            }
            setOtp([...otp.map((d, i) => (i === index ? "" : d))]);
            return;

        }
        setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    useEffect(() => {
        const otpString = otp.join("");
        setIsOtpValid(otpString.length === 6);
    }, [otp]);

    useEffect(() => {
        if (isOtpValid) {
            setError("");
        } else {
            setError("Please enter a valid OTP");
        }
    }, [isOtpValid]);

    const backendUrl = import.meta.env.VITE_URL;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOtpValid) {
            setError("");
            console.log("Valid OTP is", otp.join(""));
            const code = otp.join("");
            const error = document.getElementById('error_show');
            error.innerHTML = '';

            const data = localStorage.getItem('user');
            console.log(data);
            const user = JSON.parse(data);
            const data1 = {
                name: user.name,
                phone: user.phone,
                email: user.email,
                password: user.password,
                maker: user.maker,
                model: user.model,
                year: user.year,
                code: code
            };
            console.log(data1);

            try {
                // Create an options object for the fetch request
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data1)
                };
                // Send the request with fetch()
                fetch(`${backendUrl}/users`, options)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        if (json.error) {
                            error.innerHTML = json.error;
                            toast.error(json.error);
                        } else {
                            toast.success(json.message);
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                            toast.success('Please login to continue');
                        }
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setError("Please enter a valid OTP");
        }
    };
    const handleOnPasteOtp = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        // 👇 Split the data into individual character
        // 👇 and set the value of each input
        const value = data.split("").slice(0, otp.length);
        value.forEach((val, index) => {
            otp[index] = val;
        });
        setOtp([...otp]);
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;



    const [timeLeft, setTimeLeft] = useState(3 * 60); // 5 minutes in seconds

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
            toast.error('Time out');
        }
    }, [timeLeft]);

    // const handleVerification = async (e) => {
    //     e.preventDefault();
    //     // console.log('Verification Code:', verificationCode);

    //     const error = document.getElementById('error_show');
    //     error.innerHTML = '';
    //     // if (verificationCode === '') {
    //     //     error.innerHTML = 'Please enter your verification code';
    //     //     return;
    //     // }

    //     const data = {
    //         verificationCode
    //     };
    //     console.log(data);
    //     try {
    //         // Create an options object for the fetch request
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         };
    //         // Send the request with fetch()
    //         const response = await fetch(`${backendUrl}/users/me/verify`, options);
    //         const json = await response.json();
    //         console.log(json);
    //         if (json.error) {
    //             toast.error(json.error);
    //         } else {
    //             toast.success(json.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const handleResendCode = async (e) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;
            console.log(email);
            const response = await fetch(`${backendUrl}/users/otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                // Parse the response JSON and return it
                const responseData = await response.json();
                console.log(responseData);
                toast.success(responseData.message);
            } else {
                // If there was an error, handle the error response
                const errorText = await response.json(); // Get the error message as plain text
                throw { status: response.status, message: errorText.error };
              }
            } catch (error) {
              // Log the error message and status code
              console.error('Error:', error.status, error.message);
              toast.error(error.message , {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }


        return (
            <div>
                <ToastContainer />
                <form onSubmit={handleSubmit} className="w-auto tablet:max-w-lg phone:max-w-md bg-white shadow-[0px_0px_10px_#ccc] tablet:mx-auto phone:mx-8 tablet:my-[10%] phone:my-[30%] p-5 rounded-[10px]">
                    <img src={gif} alt="email" className="w-20 h-20 mx-auto" />
                    <h1 className="text-2xl font-bold mb-2 text-center">Verification</h1>
                    <h6 className="text-base text-[#487379] font-bold mb-2 text-center"> verification code has been sent to {email}</h6>
                    <div className="flex justify-center text-[#487379] text-6xl mb-2 ">
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </div>
                    <h1 className="text-center">Enter OTP</h1>
                    <div className="flex  justify-center">
                        <input type="text"
                            maxLength="1"
                            className="w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            onPaste={handleOnPasteOtp}
                            value={otp[0]}
                            onChange={(e) => handleChange(e.target, 0)}
                            onKeyDown={(e) => {
                                if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                    e.target.value = e.key;
                                    e.target.nextSibling.focus();
                                    setOtp([...otp.map((d, i) => (i === 0 ? e.key : d))]);
                                }
                            }}
                        />
                        <input type="text"
                            maxLength="1"
                            className="w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            value={otp[1]}
                            onPaste={handleOnPasteOtp}
                            onChange={(e) => handleChange(e.target, 1)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && e.target.value == '') { e.target.previousSibling.focus() }
                                else {
                                    if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                        e.target.value = e.key;
                                        e.target.nextSibling.focus();
                                        setOtp([...otp.map((d, i) => (i === 1 ? e.key : d))]);
                                    }
                                }
                            }} />
                        <input type="text"
                            maxLength="1"
                            className="mr-4 w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            value={otp[2]}
                            onPaste={handleOnPasteOtp}
                            onChange={(e) => handleChange(e.target, 2)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && e.target.value == '') { e.target.previousSibling.focus() }
                                else {
                                    if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                        e.target.value = e.key;
                                        e.target.nextSibling.focus();
                                        setOtp([...otp.map((d, i) => (i === 2 ? e.key : d))]);
                                    }
                                }
                            }}
                        />
                        <input type="text"
                            maxLength="1"
                            className="w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            value={otp[3]}
                            onPaste={handleOnPasteOtp}
                            onChange={(e) => handleChange(e.target, 3)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && e.target.value == '') { e.target.previousSibling.focus() }
                                else {
                                    if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                        e.target.value = e.key;
                                        e.target.nextSibling.focus();
                                        setOtp([...otp.map((d, i) => (i === 3 ? e.key : d))]);
                                    }
                                }
                            }}
                        />
                        <input type="text"
                            maxLength="1"
                            className="w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            value={otp[4]}
                            onPaste={handleOnPasteOtp}
                            onChange={(e) => handleChange(e.target, 4)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && e.target.value == '') { e.target.previousSibling.focus() }
                                else {
                                    if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                        e.target.value = e.key;
                                        e.target.nextSibling.focus();
                                        setOtp([...otp.map((d, i) => (i === 4 ? e.key : d))]);
                                    }
                                }
                            }}
                        />
                        <input type="text"
                            maxLength="1"
                            className="w-12 h-14 text-[32px] text-center font-[bold] text-[#487379] transition-all duration-[0.1s] m-0.5 p-2.5 rounded-[5px] border-2 border-solid border-[#55525c] focus:shadow-[0_0_2px_2px_#a527ff6a] focus:border-2 focus:border-solid focus:border-[#a527ff]"
                            value={otp[5]}
                            onPaste={handleOnPasteOtp}
                            onChange={(e) => handleChange(e.target, 5)}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && e.target.value == '') { e.target.previousSibling.focus() }
                                else {
                                    if (e.target.value !== '' && e.key !== "Backspace" && isAlphaNumeric(e.key)) {
                                        e.target.value = e.key;
                                        setOtp([...otp.map((d, i) => (i === 5 ? e.key : d))]);
                                    }
                                }
                            }}
                        />
                    </div>
                    {resendCode && <p className="mt-5 text-lg"
                        onClick={() => {
                            setTimeLeft(3 * 60); setResendCode(false)
                            handleResendCode()
                        }}><a>Resend code!!</a></p>}

                    <div className="flex justify-center">
                        <button type="submit" className=" bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px] m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]">
                            Verify
                        </button>
                    </div>

                </form>
                <p id="error_show" style={{ color: 'red' }}></p>
            </div>
        );
    }

    export default OtpInput;