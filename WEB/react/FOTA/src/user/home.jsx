import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';
import InitialImage from '../assets/latest-news.jpg'
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

        // console.log(isMobile);
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

    const [news, setNews] = useState("    <h1>Welcome to My Home Page</h1><p>Stay updated with the latest news and announcements.</p><h2>Upcoming Events</h2><p>Join us for our annual conference on innovation in technology.</p><h2>Latest News</h2><p>Our new product line will be launching next month.</p><h2>Announcements</h2><p>We are expanding our services to new regions.</p><h2>Contact Us</h2><p>For press inquiries, please reach out to our media team.</p>")
    const [image, setImage] = useState(InitialImage)
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
                setNews(data.news)
                setImage(data.image)
                // setTitle(data.title)
                // console.log(data.body);
                // console.log(data.image);
                // console.log(data.title);
            })
            .catch((error) => {
                console.error('Error:', error);
                // toast.error('Error fetching news',
                //     {
                //         position: "top-center",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //     });
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
