import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'

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


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }, [])
    const [userCars, setUserCars] = useState('');
    const [liveDiag, setLiveDiag] = useState('')

    useEffect(() => {
        // console.log(localStorage.getItem('token'))
        fetch(`${backendUrl}/users/me/cars`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log(responseData);
                const carBrandList = document.getElementById("user-cars");
                document.getElementById("user-cars").innerHTML = "";
                responseData.forEach((item) => {
                    const listItem = document.createElement("option");
                    listItem.textContent = item.maker + " " + item.model + " " + item.year;
                    carBrandList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [, userCars]);


    const HandleLiveDiag = () => {
        const carBrand = userCars.split(" ")[0];
        const carModel = userCars.split(" ")[1];
        const carYear = userCars.split(" ")[2];

        const data = {
            car: {
                maker: carBrand,
                model: carModel,
                year: carYear,
            },
            diagnostics: liveDiag
        }
        fetch(`${backendUrl}/users/me/diagnostic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log(responseData);   
                toast.success(responseData.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                const carBrandList = document.getElementById("user-cars");
                document.getElementById("user-cars").innerHTML = "";
                const listItem = document.createElement("option");
                listItem.textContent = "Select Car";
                carBrandList.appendChild(listItem);

                document.getElementById("diagnostics").value = "";
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Error sending diagnostics",
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
            {showLabel && <NavBar />}
            <div className='mx-7 phone:mt-5 tablet:mt-28'>
                {/* <div className="flex justify-between items-center"> */}
                <div className="relative tablet:w-[500px] bg-white shadow-2xl z-[1] m-auto p-2.5 rounded-[5px] inset-x-0  phone:w-[280px] phone:mt-20" id="popup-addCar">
                    <h1 className='text-center text-[#59888f] font-serif text-[large] mb-5 mt-2'>ADD UPDATE</h1>
                    {showLabel &&
                        <div className="float-left not-italic text-[large] font-serif ml-2">
                            <label htmlFor="user-cars" className='block text-[#59888f] mt-1 mb-[22%]'>Select Car:</label>
                            {/* <label htmlFor="car-model" className='block text-[#59888f] mt-1 mb-[22%]'>Car Model:</label>
                            <label htmlFor="car-year" className='block text-[#59888f] mt-1 mb-[22%]'>Car Year:</label> */}
                            <label htmlFor="diagnostics" className='block text-[#59888f] mt-1 mb-[22%]'>Diagnostics:</label>
                        </div>
                    }
                    <div className="tablet:float-right phone:text-center phone:mt-4 tablet:mr-2">
                        <select
                            name="user-cars"
                            id="user-cars"
                            value={userCars}
                            onChange={(e) => {
                                setUserCars(e.target.value)
                            }}
                            onClick={(e) => {
                                // setCarBrandFlag('true')
                                setUserCars(e.target.value)
                            }}
                            required
                            className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                        >
                            <option value="">Select Car</option>
                        </select>
                        <br />
                        <textarea type="text"
                            className='overflow-y-auto box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                            required
                            id="diagnostics"
                            onChange={(e) => setLiveDiag(e.target.value)}
                        />
                    </div>
                    <div className="block tablet:w-[20%] mx-auto phone:w-[40%] mb-5 text-center">
                        <input type="submit" onClick={HandleLiveDiag} className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] tablet:w-[100%] phone:w-[80%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Home
