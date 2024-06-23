import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';
import NavBar from './navbar'
// import Sidebar from "react-sidebar";





const Home = () => {
    const backendUrl = import.meta.env.VITE_URL;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [showLabel, setShowLabel] = useState(true);
    useEffect(() => {

        const isMobile = window.innerWidth <= 600;

        console.log(isMobile);
        if (isMobile) {
            setShowLabel(false);
        }
    }, []);
    useEffect(() => {
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 600;
            if (isMobile) {
                setShowLabel(false);
            } else {
                setShowLabel(true);
            }
        });
    }
    );

    const [news, setNews] = useState('')
    const [image, setImage] = useState('')
    // const [title, setTitle] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }, [])

    useEffect(() => {
        fetch(`${backendUrl}/users/news`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setNews(data.news)
                setImage(data.image)
                // setTitle(data.title)
                // console.log(data.body);
                // console.log(data.image);
                // console.log(data.title);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <>
            {showLabel && <NavBar />}
            <div className='tablet:m-1 tablet:p-2 phone:m-5 phone:p-2'>
                {/* <h1 className="font-bold text-3xl">{title}</h1> */}
                <img
                    src={image}
                    alt="Image"
                    className="tablet:w-[550px] tablet:float-right m-5 p-2 phone:w-[300px] phone:flex phone:mx-auto rounded-[10px] shadow-[0_0_10px_grey]"
                />
                <div dangerouslySetInnerHTML={{ __html: news }} />
                {/* <p className="text-lg mt-5 mx-4 text-justify">{news}</p> */}

            </div>
            {/* </Sidebar > */}
            <ToastContainer />
        </>
    )
}

export default Home
