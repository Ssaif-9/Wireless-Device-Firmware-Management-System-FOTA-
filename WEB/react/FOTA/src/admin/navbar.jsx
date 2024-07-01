import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navbar = () => {

    const backendUrl = import.meta.env.VITE_URL;

    useEffect(() => {
        // Check if user is logged in
        if (localStorage.getItem('token') === null) {
            window.location.href = './login';
        }
    }
        , [])

    const logout = async () => {
        await fetch(backendUrl + '/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = './login';
            }
            else {
                toast.error('Failed to logout',
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
        }).catch(error => {
            toast.error('Failed to logout',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        });
    }



    return (
        <>
            <div className="p-2 m-1">
                <nav className='bg-[#f2f2f2] shadow-[0_0_10px_rgba(0,0,0)] mb-3 p-3 rounded-[10px] '>
                    <ul className="flex justify-between m-0 p-0 list-none">
                        <li>
                            <a href="./adNews" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Add News</a>
                        </li>
                        <li>
                            <a href="./adUCar" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Add Car Updates</a>
                        </li>
                        <li>
                            <a href="./adECar" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Edit Cars</a>
                        </li>
                        <li>
                            <a href="./adLD" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Live Diagnostics</a>
                        </li>
                        <li>
                            <a href="./adAMem" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Add Members</a>
                        </li>
                        <li>
                            <a href="./delMem" className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Delete Members</a>
                        </li>
                        <li onClick={logout}>
                            <a className='no-underline text-[#333] transition-[0.3s] p-2.5 rounded-br-[20px] rounded-t-[20px] rounded-bl-[20px] rounded-[5px] hover:bg-[#7bbec8]'>Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default navbar;