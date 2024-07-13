import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/entypo/cross';
import NavBar from './navbar'

const OwnedCars = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const [showLabel, setShowLabel] = useState(true);
    const [popupAddCar, setPopupAddCar] = useState(false);
    const [popupRemoveCar, setPopupRemoveCar] = useState(false);
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
    const [carBrandFlag, setCarBrandFlag] = useState('false');
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carYear, setCarYear] = useState('');
    useEffect(() => {
        if (carBrandFlag === 'true') {
            document.getElementById("car-brand").innerHTML = "";
            fetch(`${backendUrl}/cars/make`)
                .then((response) => response.json())
                .then((data) => {
                    // Update the HTML content with the fetched data
                    // setCarBrandFlag('false')
                    const dataList = document.getElementById("car-brand");
                    // setCarBrand(data[0]);
                    data.forEach((item) => {
                        const listItem = document.createElement("option");
                        listItem.textContent = item;
                        dataList.appendChild(listItem);
                    });
                    setCarBrandFlag('false')
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [carBrandFlag]);
    useEffect(() => {
        if (carBrand != "") {
            car_model();
        }
    }, [carBrand]);

    useEffect(() => {
        if (carModel != "") {
            car_year();
        }
    }, [carModel]);

    function car_model() {
        document.getElementById("car-model").innerHTML = "";
        fetch(`${backendUrl}/cars/model`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ maker: carBrand }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                setCarModel(responseData[0]);
                const modelList = document.getElementById("car-model");
                responseData.forEach((item) => {
                    const listItem = document.createElement("option");
                    listItem.textContent = item;
                    modelList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function car_year() {
        document.getElementById("car-year").innerHTML = "";
        fetch(`${backendUrl}/cars/year`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ maker: carBrand, model: carModel }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                setCarYear(responseData[0]);
                const yearList = document.getElementById("car-year");
                responseData.forEach((item) => {
                    const listItem = document.createElement("option");
                    listItem.textContent = item;
                    yearList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        }
    }, []);

    const [ownedCars, setOwnedCars] = useState([])
    const [ownedCarsFlag, setOwnedCarsFlag] = useState(true)

    useEffect(() => {
        if (ownedCarsFlag) {
            fetch(`${backendUrl}/users/me/cars`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setOwnedCars(data)
                    setOwnedCarsFlag(false)
                })
        }
    }, [,ownedCarsFlag])

    const [tableHeader, setTableHeader] = useState(['Car Brand', 'Car Model', 'Car Year'])
    const [tableData, setTableData] = useState([])

    const removeOwnedCars = async () => {
        try {
            const response = await fetch(`${backendUrl}/users/me/cars`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
            if (response.ok) {
                const responseData = await response.json()
                // console.log(responseData)
                setTableHeader(['Car Brand', 'Car Model', 'Car Year', 'Remove'])
                const tableData = []
                const tempTableData = []
                responseData.forEach(car => {
                    tableData.push([car.maker, car.model, car.year, <button onClick={() => {
                        removeCar(car.maker, car.model, car.year)
                    }} className="border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-auto m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]">Remove</button>])
                    tempTableData.push(car)
                })

                setTableData(tableData)
                setOwnedCars(tempTableData)
                setPopupRemoveCar(!popupRemoveCar)
            }
        } catch (error) {
            console.error('Error:', error.status, error.message)
            toast.error(error.message)
        }
    }



    const PopupToggleAddCar = () => {
        if (popupRemoveCar){
            setPopupRemoveCar(!popupRemoveCar)
        }
        setPopupAddCar(!popupAddCar)
    }

    useEffect(() => {
        if (!popupRemoveCar) {
            setTableHeader(['Car Brand', 'Car Model', 'Car Year'])
        }
    }, [!popupRemoveCar])

    const PopupToggleRemoveCar = () => {
        removeOwnedCars()
    }
    // Function to handle keydown event
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) { // Escape key
            setPopupAddCar(false);
        }
    };

    const handleClickOutside = (event) => {
        if (event.target === document.querySelector('.fixed')) {
            setPopupAddCar(false);
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


    const addCar = async () => {
        const data = {
            maker: carBrand,
            model: carModel,
            year: carYear
        }
        // console.log(data)
        try {
            const response = await fetch(`${backendUrl}/users/me/cars`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(data)
                })
            if (response.ok) {
                const responseData = await response.json()
                // console.log(responseData)
                toast.success('Car added successfully',
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                setPopupAddCar(!popupAddCar)
                // setOwnedCars(responseData.user.cars)
                setOwnedCarsFlag(true)
                setCarBrandFlag('false')
                // window.location.reload()
            } else {
                const errorText = await response.json()
                console.error(errorText)
                toast.error(errorText.error,
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
        } catch (error) {
            console.error('Error:', error.status, error.message)
            toast.error(error.message)
        }
    }

    const removeCar = async (maker, model, year) => {
        const data = {
            maker: maker,
            model: model,
            year: year
        }
        // console.log(data)
        try {
            const response = await fetch(`${backendUrl}/users/me/cars`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(data)
                })
            if (response.ok) {
                const responseData = await response.json()
                // console.log(responseData)
                toast.success('Car removed successfully',
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                // setPopupRemoveCar(!popupRemoveCar)
                // setOwnedCarsFlag(true)
                PopupToggleRemoveCar()

                // setPopupRemoveCar(!popupRemoveCar)
                // window.location.reload()
            } else {
                const errorText = await response.json()
                console.error(errorText)
                toast.error(errorText.error,
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
        } catch (error) {
            console.error('Error:', error.status, error.message)
            toast.error(error.message)
        }
    }


    return (
        <>
            <>
                {showLabel && <NavBar />}
                <div className='mx-7 phone:mt-5'>
                    <div className="flex justify-between items-center">
                        <h2 className='text-xl'>Owned Cars</h2>
                        <div>
                            <button className={`border-none flex float-right text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-auto m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] phone:text-sm ${popupAddCar ? "bg-green" :"bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)]"} `} id="button"
                                onClick={PopupToggleAddCar}
                            >
                                Add Car
                            </button>
                            <button className={`border-none flex float-right text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-auto m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] phone:text-sm ${popupRemoveCar ? "bg-red-600" :"bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)]"} `} id="removeBtn"
                                onClick={removeOwnedCars}
                            >
                                Remove Car
                            </button>
                        </div>
                    </div>
                    <table id="carList" className='w-full mb-5 border-collapse'>
                        <thead>
                            <tr>
                                {tableHeader.map(headers => (
                                    <th className='border text-center p-2.5 border-solid border-[#333] bg-[#7bbec8] text-white text-base font-serif' key={headers}>{headers}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {popupRemoveCar ?
                                (tableData.map((car, index) => (
                                    <tr key={index}>
                                        {car.map((data, dataIdx) => (
                                            <td className='border text-center p-2.5 border-solid border-[#333]' key={`${data}-${index}-${dataIdx}`}>{data}</td>
                                        ))}
                                    </tr>
                                ))
                                ) :
                                (ownedCars.map((car, carIdx) => (
                                    <tr key={`${car.maker}-${car.model}-${car.year}-${carIdx}`}>
                                        <td className='border text-center p-2.5 border-solid border-[#333]'> {car.maker} </td>
                                        <td className='border text-center p-2.5 border-solid border-[#333]'> {car.model} </td>
                                        <td className='border text-center p-2.5 border-solid border-[#333]'> {car.year} </td>
                                    </tr>
                                ))
                                )}
                        </tbody>
                    </table>
                </div>
                {popupAddCar && (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-75'>
                        <div className='relative w-[500px] shadow-2xl p-5 m-5 -mt-[10%] bg-white rounded-lg'>
                            <div className="absolute top-0 right-0 mr-2" onClick={() => setPopupAddCar(false)}>
                                <Icon className="text-[#59888f] hover:text-teal-400 focus:text-teal-400" icon={cross} size={22} />
                            </div>
                            <div className="absolute bg-[#f9f9f9] shadow-[0_2px_5px_rgba(0,0,0,0.1)] z-[1] w-[500px] m-auto p-2.5 rounded-[5px] inset-x-0  phone:w-[280px]" id="popup-addCar">
                                {showLabel && <div className="float-left not-italic text-[large] font-serif">
                                    <label htmlFor="car-brand" className='block text-[#59888f] mt-1 mb-[22%]'>Car Brand:</label>
                                    <label htmlFor="car-model" className='block text-[#59888f] mt-1 mb-[22%]'>Car Model:</label>
                                    <label htmlFor="car-year" className='block text-[#59888f] mt-1 mb-[22%]'>Car Year:</label>
                                </div>
                                }
                                <div className="tablet:float-right phone:text-center phone:mt-4">
                                    {// still need to add the error message here                            
                                    }
                                    <select
                                        name="car-brand"
                                        id="car-brand"
                                        value={carBrand}
                                        onChange={(e) => {
                                            setCarBrand(e.target.value)
                                        }}
                                        onClick={(e) => {
                                            setCarBrandFlag('true')
                                            setCarBrand(e.target.value)
                                        }}
                                        required
                                        className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                    >
                                        <option value="">Car Brand</option>
                                    </select>
                                    <br />
                                    <select name="car-model"
                                        id="car-model"
                                        value={carModel}
                                        onChange={(e) => { setCarModel(e.target.value) }}
                                        onClick={(e) => {
                                            setCarModel(e.target.value)
                                        }}
                                        required
                                        className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                    >
                                        <option value="">Car Model</option>
                                    </select>
                                    <br />
                                    <select name="car-year"
                                        id="car-year"
                                        value={carYear}
                                        onChange={(e) => {
                                            setCarYear(e.target.value)
                                        }
                                        }
                                        onClick={(e) => setCarYear(e.target.value)}
                                        required
                                        className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                    >
                                        <option value="">Car Year</option>
                                    </select>
                                    <br />
                                </div>
                                <div className="block tablet:w-[20%] mx-auto phone:w-[40%]">
                                    {/* <span id="error_show" /> */}
                                    <input type="submit" defaultValue="Add" onClick={addCar} className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] w-[100%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
            <ToastContainer />
        </>
    )
}

export default OwnedCars