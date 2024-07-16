import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InitialImage from '../assets/latest-news.jpg';
import NavBar from './navbar';
import { FaBars } from "react-icons/fa";
import SideNavBar from './sideNavBar';

const Home = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLabel, setShowLabel] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 600;
            setShowLabel(!isMobile);
        };

        handleResize(); // Check initial screen size

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [news, setNews] = useState("<h1>Welcome to My Home Page</h1><p>Stay updated with the latest news and announcements.</p><h2>Upcoming Events</h2><p>Join us for our annual conference on innovation in technology.</p><h2>Latest News</h2><p>Our new product line will be launching next month.</p><h2>Announcements</h2><p>We are expanding our services to new regions.</p><h2>Contact Us</h2><p>For press inquiries, please reach out to our media team.</p>");
    const [image, setImage] = useState(InitialImage);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }, []);

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
            setNews(data.news);
            setImage(data.image);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div>
            {!showLabel && <FaBars
                className="tablet:text-3xl phone:text-xl cursor-pointer float-left"
                onClick={toggleSidebar}
            />}
            {sidebarOpen && <SideNavBar toggleSidebar={toggleSidebar} />}
            {showLabel && <NavBar />}
            <div className='tablet:m-1 tablet:p-2 phone:m-5 phone:p-2'>
                <img
                    src={image}
                    alt="Image"
                    className="tablet:w-[550px] tablet:float-right m-5 p-2 phone:w-[300px] phone:flex phone:mx-auto rounded-[10px] shadow-[0_0_10px_grey]"
                />
                <div dangerouslySetInnerHTML={{ __html: news }} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
