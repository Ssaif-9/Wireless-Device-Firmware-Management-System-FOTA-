import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'
import defaultImage from '../assets/8380015.jpg'
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { cross } from 'react-icons-kit/entypo/cross';
import Compressor from 'compressorjs';
import { FaBars } from "react-icons/fa";
import SideNavBar from './sideNavBar';


const Profile = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const [showLabel, setShowLabel] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
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
    });

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }


    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [img, setImg] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetch(`${backendUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                setUser(data)
            })
            .catch(err => {
                console.err(err)
                toast.error('An error occurred while fetching user data',
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
            })
    }
        , []);

    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [newPassword, setNewPassword] = useState(password);
    const [newImg, setNewImg] = useState(img);
    const [showEditMenu, setShowEditMenu] = useState(false);

    const ShowEditMenu = () => {
        setShowEditMenu(!showEditMenu)
    }




    useEffect(() => {
        setEmail(user.email)
        setPhone(user.phone)
        setName(capitalizeName(user.name))
        setPassword(user.password)
        if (user.avatar === null) {
            setImg(defaultImage)
        } else {
            setImg(user.avatar)
        }
    }, [user])

    const capitalizeName = (myName) => {
        if (!myName) return ''; // Check if myName is defined

        myName = myName.trim();

        const words = myName.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" "); // Make sure to return the joined string
    }

    const closeEditMenu = () => {
        setShowEditMenu(false)
    }

    // Function to handle keydown event
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) { // Escape key
            setShowEditMenu(false);
        }
    };

    const handleClickOutside = (event) => {
        if (event.target === document.querySelector('.fixed')) {
            setShowEditMenu(false);
        }
    }

    // Add event listener when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleEdit = (async () => {
        if (newName) {
            if (newName.length < 3) {
                toast.error('Name must be at least 3 characters long',
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                return
            }
        }
        if (newPhone) {
            if (newPhone.length < 11) {
                toast.error('Phone number must be at least 11 characters long',
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                return
            }
        }
        if (newPassword) {
            if (newPassword.length < 7) {
                toast.error('Password must be at least 6 characters long',
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                return
            }
        }
        var data = {}
        if (newName && newPhone && newPassword) {
            data = {
                name: newName,
                phone: newPhone,
                password: newPassword,
                // avatar: newImg
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newName && newPhone) {
            data = {
                name: newName,
                phone: newPhone,
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newName && newPassword) {
            data = {
                name: newName,
                password: newPassword,
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newPhone && newPassword) {
            data = {
                phone: newPhone,
                password: newPassword,
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newName) {
            data = {
                name: newName,
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newPhone) {
            data = {
                phone: newPhone,
            }
            await handleEditUser(data)
            // console.log(data)
        } else if (newPassword) {
            data = {
                password: newPassword,
            }
            await handleEditUser(data)
            // console.log(data)
        }
        if (newImg) {
            await handleEditImage(newImg)
        }
    })

    const handleEditUser = (async (data) => {
        // console.log(data)
        await fetch(`${backendUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error,
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                } else {
                    // console.log(data)
                    setShowEditMenu(false)
                    if (newName) { setName(capitalizeName(newName)) }
                    if (newPhone) { setPhone(newPhone) }
                    if (newPassword) { setPassword(newPassword) }
                    toast.success('Profile Updated Successfully',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                }
            })
            .catch(err => {
                console.error(err)
            })
    })

    const compressImage = (image) => {
        return new Promise((resolve, reject) => {
            new Compressor(image, {
                quality: 0.6,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };
    const handleEditImage = async (data) => {
        try {
            // console.log(data)
            const newImg = await compressImage(data);
            // console.log({"newImg": newImg});
            const formData = new FormData();
            // formData.append('avatar', data);
            formData.append('avatar', newImg, newImg.name);

            const response = await fetch(`${backendUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData // Pass the FormData object directly as the body
            });

            const responseData = await response.json();

            if (response.ok) {
                setShowEditMenu(false);
                setImg(URL.createObjectURL(newImg)); // Set image using URL.createObjectURL
                // setImg(URL.createObjectURL(data.get('avatar'))); // Set image using URL.createObjectURL
                toast.success('Profile Image Updated Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(responseData.error, {
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
            console.error('Error occurred:', error);
            toast.error(error, {
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
        <>
            {!showLabel && <header className='phone:mt-5'>
                {!showLabel && <FaBars
                    className="tablet:text-3xl phone:text-xl cursor-pointer float-left"
                    onClick={toggleSidebar}
                />}
                {sidebarOpen && <SideNavBar toggleSidebar={toggleSidebar} />}
            </header>
            }
            {showLabel && <NavBar />}

            <body>  </body>
            <div className="tablet:max-w-[750px] phone:max-w-fit bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] mx-auto tablet:my-2 phone:my-10 p-5">
                <img src={img} className='tablet:w-[200px] phone:w-[150px] tablet:h-[200px] phone:h-[150px] object-cover object-center flex justify-center items-center shadow-[0_0_10px_rgba(0,0,0.1)] transition-[0.3s] phone:mt-3 mb-5 mx-auto my-0 rounded-[50%]' alt="Profile Picture" />
                <h1 className='tablet:text-4xl phone:text-3xl tablet:mb-5 phone:mb-4 text-center'>{name}</h1>
                <hr className='border-[#ccc] border-solid border-[1px] mb-5' />
                {showEditMenu && (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-75'>
                        <div className='relative w-[500px] shadow-2xl p-5 m-5 bg-white rounded-lg'>
                            <div className="absolute top-0 right-0 mt-2 mr-2" onClick={closeEditMenu}>
                                <Icon className="text-[#59888f] hover:text-teal-400 focus:text-teal-400" icon={cross} size={22} />
                            </div>
                            <div className='flex justify-between mt-5'>
                                <div className='float-left'>
                                    <label htmlFor="name" className='block text-[#59888f] mb-[9%] text-xl'>FullName</label>
                                    <label htmlFor="phone-number" className='block text-[#59888f] mb-[15%] text-xl'>Phone</label>
                                    <label htmlFor="password" className='block text-[#59888f] mb-[15%] text-xl'>Password</label>
                                    <label htmlFor="avatar" className='block text-[#59888f] mb-[9%] text-xl'>Avatar</label>
                                </div>
                                <div className='float-right'>
                                    <div className='float-right'>
                                        <input type="text"
                                            id="name"
                                            name='name'
                                            // value={name}
                                            placeholder="Your Name"
                                            onChange={(e) => setNewName(e.target.value)}
                                            inputMode='text'
                                            required
                                            className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[230px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa]  text-[#59888f]' />
                                        <br />
                                        <input
                                            type="number"
                                            name="phone-number"
                                            id="phone-number"
                                            placeholder="01x-xxxx-xxxx"
                                            // value={phone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                            inputMode='tel'
                                            required
                                            maxLength={11}
                                            max={11}
                                            className='box-bor-der rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[212px] phone:mx-auto tablet:w-[215px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa]  text-[#59888f]'
                                        />
                                        <br />
                                        <div className="inline-flex m-0 p-0">
                                            <input
                                                type={type}
                                                name='password'
                                                autoComplete="current-password"
                                                id="password"
                                                placeholder="Password"
                                                // value={password}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                inputMode='text'
                                                required
                                                className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[230px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                            />
                                            <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle}>
                                                <Icon className="absolute mr-10 -mt-1" icon={icon} size={22} />
                                            </span>
                                        </div>
                                        <br />
                                        <input
                                            type="file"
                                            id="avatar"
                                            name='avatar'
                                            accept="image/*"
                                            onChange={(e) => setNewImg(e.target.files[0])}
                                            className='mb-[4px] text-center p-2 phone:w-[230px] phone:mx-auto tablet:w-[230px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <input type="submit" onClick={handleEdit} defaultValue="Add" className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] w-[25%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                            </div>
                        </div>
                    </div>
                )}

                <div className='flex text-xl'>
                    <div className='mb-2.5'>
                        <p>
                            <strong>Email:</strong>
                        </p>
                        <p>
                            <strong>Phone:</strong>
                        </p>
                    </div>
                    <div className='ml-4 text-lg'>
                        <p className='text-xl underline underline-offset-7'><em>{email}</em></p>
                        <p className='text-xl'>{phone}</p>
                    </div>
                </div>
                <div className='text-center'>
                    <button onClick={ShowEditMenu} value='Edit Profile' className="border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[150px] m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] mx-8">Edit Profile</button>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

export default Profile