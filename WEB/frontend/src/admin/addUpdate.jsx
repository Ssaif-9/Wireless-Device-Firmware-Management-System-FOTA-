import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'

const AddUpdate = () => {
    const backendUrl = import.meta.env.VITE_URL;
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
    const [carParts, setCarParts] = useState('');
    const [hex, setHex] = useState();
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


    const HandleUploadUpdate = async () => {
        if(carParts ==='' || carParts == null){
            toast.error('Please select Car Part', {
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
        const data = new FormData();
        await data.append('maker', carBrand);
        await data.append('model', carModel);
        await data.append('year', carYear);
        await data.append('part', carParts);
        await data.append('hex', hex);

        const response = await fetch(`${backendUrl}/admin/upload`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: data
        });
        if (response.ok) {
            toast.success('File Uploaded Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Error uploading update', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <NavBar />
            <div className='mx-7 phone:mt-5 tablet:mt-28'>
                {/* <div className="flex justify-between items-center"> */}
                    <div className="relative tablet:w-[500px] bg-white shadow-2xl z-[1] m-auto p-2.5 rounded-[5px] inset-x-0  phone:w-[280px] phone:mt-20" id="popup-addCar">
                        <h1 className='text-center text-[#59888f] font-serif text-[large] mb-5 mt-2'>ADD UPDATE</h1>
                        {showLabel && 
                        <div className="float-left not-italic text-[large] font-serif ml-2">
                            <label htmlFor="car-brand" className='block text-[#59888f] mt-1 mb-[22%]'>Car Brand:</label>
                            <label htmlFor="car-model" className='block text-[#59888f] mt-1 mb-[22%]'>Car Model:</label>
                            <label htmlFor="car-year" className='block text-[#59888f] mt-1 mb-[22%]'>Car Year:</label>
                            <label htmlFor="car-parts" className='block text-[#59888f] mt-1 mb-[22%]'>Car Parts:</label>
                            <label htmlFor="hex" className='block text-[#59888f] mt-1 mb-[22%] text-lg'>Hex File:</label>
                        </div>
                        }
                        <div className="tablet:float-right phone:text-center phone:mt-4 tablet:mr-2">
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
                            <select name="car-parts" 
                            id="car-parts"
                            onChange={(e) => {
                                setCarParts(e.target.value)
                            }
                            }
                            onClick={(e) => setCarParts(e.target.value)}
                            required
                            className='box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                            >
                                <option value="1">Collision System</option>
                                <option value="2">Engine</option>
                                <option value="3">Transmission</option>
                                <option value="4">Steering</option>
                                <option value="5">Suspension</option>
                                <option value="6">Electrical</option>
                                <option value="7">Air Conditioner</option>    
                                <option value="8">Dynamo</option>
                                <option value="9">Battery</option>
                                <option value="10">Lights</option>
                            </select>
                            <br />
                            <input type="file"
                                id="hex"
                                name='hex'
                                accept=".hex"
                                onChange={(e) => setHex(e.target.files[0])}
                                className='mb-[4px] text-center p-2 phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:ring-1 hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] text-[#59888f]'
                            />
                        </div>
                        <div className="block tablet:w-[20%] mx-auto phone:w-[40%] mb-5 text-center">
                            <input type="submit" onClick={HandleUploadUpdate} className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] tablet:w-[100%] phone:w-[80%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                        </div>
                    </div>
                </div>
            {/* </div> */}
            <ToastContainer />
        </>
    )
}

export default AddUpdate;