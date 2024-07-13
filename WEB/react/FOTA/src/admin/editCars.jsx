import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'

const EditCars = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const [isAddButtonClicked, setAddButtonClicked] = useState(false);
    const [isDeleteButtonClicked, setDeleteButtonClicked] = useState(false);

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
    });

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
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [carBrandFlag, isDeleteButtonClicked]);
    useEffect(() => {
        if (isDeleteButtonClicked && !isAddButtonClicked) {
            if (carBrand != "") {
                car_model();
            }
        }
    }, [carBrand]);

    useEffect(() => {
        if (isDeleteButtonClicked && !isAddButtonClicked) {
            if (carModel != "") {
                car_year();
            }
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

    const HandleDeleteCars = async () => {
        const data = {
            maker: carBrand,
            model: carModel,
            year: carYear
        };
        if (data.maker === "" || data.model === "" || data.year === "") {
            toast.error('Please fill all the fields', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Log data to ensure correct values are being sent
        // console.log('Request Data:', data);

        try {
            const response = await fetch(`${backendUrl}/cars`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });

            // Log the response status and message for debugging
            // console.log('Response Status:', response.status);
            // console.log('Response Message:', await response.text());

            if (response.ok) {
                toast.success('Car Deleted Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setCarBrandFlag('true');
                setCarBrandFlag('false');

            } else {
                toast.error('Error deleting car', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            toast.error('Network error', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    const HandleAddCars = async () => {
        const data = {
            maker: carBrand,
            model: carModel,
            year: carYear
        };
        if (data.maker === "" || data.model === "" || data.year === "") {
            toast.error('Please fill all the fields', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (data.year.length !== 4 || isNaN(data.year) || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
            toast.error('Please enter a valid year', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }


        // Log data to ensure correct values are being sent
        // console.log('Request Data:', data);

        try {
            const response = await fetch(`${backendUrl}/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });

            // Log the response status and message for debugging
            // console.log('Response Status:', response.status);
            // console.log('Response Message:', await response.text());

            if (response.ok) {
                toast.success('Car Added Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                document.getElementById("car-brand").value = "";
                document.getElementById("car-model").value = "";
                document.getElementById("car-year").value = "";
            } else {
                // json = await response.json();
                // console.log('Response:', response.statusText);
                if (response.statusText === 'Conflict') {
                    toast.error('Car already exists', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else
                    toast.error('Error adding car', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            toast.error('Network error', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    useEffect(() => {
        setAddButtonClicked(true);
    }
        , []);

    useEffect(() => {
        if (!isAddButtonClicked && !isDeleteButtonClicked) {
            setAddButtonClicked(!isAddButtonClicked);
        }
    }
        , [isAddButtonClicked, isDeleteButtonClicked]);

    return (
        <>
            <NavBar />
            <div className='mx-7 phone:mt-5 tablet:mt-28'>
                {/* <div className="flex justify-between items-center"> */}
                <div className="relative tablet:w-[500px] bg-white shadow-2xl z-[1] m-auto p-2.5 rounded-[5px] inset-x-0  phone:w-[280px] phone:mt-20" id="popup-addCar">
                    <h1 className='text-center text-[#59888f] font-serif text-[large] mb-5 mt-2'>Edit Cars</h1>
                    <div className='flex mb-5 mx-10 justify-between'>
                        <button
                            className={`mr-5 border-none tablet:w-[100%] phone:w-[80%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] 
          ${isAddButtonClicked && !isDeleteButtonClicked ? 'bg-green-500' : 'bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)]'}
        `}
                            onClick={() => {
                                setAddButtonClicked(!isAddButtonClicked);
                                setDeleteButtonClicked(false);
                            }}
                        >
                            Add Cars
                        </button>
                        <button
                            className={`ml-5 border-none tablet:w-[100%] phone:w-[80%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] 
          ${isDeleteButtonClicked && !isAddButtonClicked ? 'bg-red-500' : 'bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)]'}
        `}
                            onClick={() => {
                                setDeleteButtonClicked(!isDeleteButtonClicked);
                                setAddButtonClicked(false);
                            }}
                        >
                            Delete Cars
                        </button>
                    </div>
                    {showLabel &&
                        <div className="float-left not-italic text-[large] font-serif ml-2">
                            <label htmlFor="car-brand" className='block text-[#59888f] mt-1 mb-[22%]'>Car Brand:</label>
                            <label htmlFor="car-model" className='block text-[#59888f] mt-1 mb-[22%]'>Car Model:</label>
                            <label htmlFor="car-year" className='block text-[#59888f] mt-1 mb-[22%]'>Car Year:</label>
                        </div>
                    }

                    {isDeleteButtonClicked && !isAddButtonClicked &&
                        <div div className="tablet:float-right phone:text-center phone:mt-4 tablet:mr-2">
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
                        </div>
                    }
                    {isAddButtonClicked && !isDeleteButtonClicked &&
                        <div div className="tablet:float-right phone:text-center phone:mt-4 tablet:mr-2">
                            <input
                                type="text"
                                className="float-right box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                required
                                placeholder="Car Brand"
                                name="car-brand"
                                id="car-brand"
                                onChange={(e) => setCarBrand(e.target.value)}
                            />
                            <br />
                            <input
                                type="text"
                                className="float-right box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                required
                                name='car-model'
                                id='car-model'
                                placeholder="Car Model"
                                onChange={(e) => setCarModel(e.target.value)}
                            />
                            <br />
                            <input
                                type="text"
                                className="float-right box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                required
                                name="car-year"
                                id="car-year"
                                pattern="\d*"
                                max={new Date().getFullYear() + 1}
                                maxLength={4}
                                inputMode="numeric"
                                placeholder="Car Year"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setCarYear(value);
                                    }
                                    else {
                                        e.target.value = '';
                                    }
                                }}
                            />

                        </div>
                    }
                    <div className="block tablet:w-[20%] mx-auto phone:w-[40%] mb-5 text-center">
                        <input type="submit" onClick={() => {
                            if (isAddButtonClicked) {
                                HandleAddCars();
                            } else {
                                HandleDeleteCars();
                            }
                        }} className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] tablet:w-[100%] phone:w-[80%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                    </div>
                </div>
            </div >
            {/* </div> */}
            < ToastContainer />
        </>
    )
}

export default EditCars;