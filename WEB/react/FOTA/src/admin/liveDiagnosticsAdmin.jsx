import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar';

const LiveDiagnostics = () => {
    const backendUrl = import.meta.env.VITE_URL;
    const [liveDiag, setLiveDiag] = useState([]);
    const [liveDiagData, setLiveDiagData] = useState([]);
    const [filter, setFilter] = useState('All');
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [read,setRead] =useState()
    const [currentDiagIndex, setCurrentDiagIndex] = useState(null);

    useEffect(() => {
        fetch(`${backendUrl}/admin/live_diag`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    setLiveDiag(data.diagnostics);
                } else {
                    showToast('Failed to fetch Live Diagnostics');
                }
            })
            .catch(() => showToast('Failed to fetch Live Diagnostics'));
    }, [backendUrl]);

    useEffect(() => {
        const fetchDiagData = async () => {
            if (liveDiag.length > 0) {
                const promises = liveDiag.map(async (diag) => {
                    if (filter === 'All' || (filter === 'Read' && diag.read) || (filter === 'Unread' && !diag.read)) {
                        const user = await fetchData(`${backendUrl}/admin/user/${diag.UserId}`, 'Failed to fetch User');
                        const car = await fetchData(`${backendUrl}/cars/${diag.CarId}`, 'Failed to fetch Car');
                        return { user: user.user, car, read: diag.read, diagnostics: diag.diagnostics };
                    }
                    return undefined;
                });

                const results = await Promise.all(promises);
                setLiveDiagData(results.filter((diag) => diag !== undefined));
            }
        };

        fetchDiagData();
    }, [liveDiag, filter, backendUrl]);

    useEffect(() => {
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        liveDiagData.forEach((diag, index) => {
            const tr = document.createElement('tr');
            createTableCell(tr, `${diag.car.maker} ${diag.car.model} ${diag.car.year}`);
            createTableCell(tr, `<a href="mailto:${diag.user.email}" class="text-blue-500 no-underline hover:underline">${diag.user.email}</a>`);
            createTableCell(tr, diag.read ? 'Read' : 'Unread');

            const button = document.createElement('button');
            button.className = 'text-blue-500 no-underline hover:underline';
            button.innerText = 'Message';
            button.onclick = () => showPopup(index);
            createTableCell(tr, button);

            tbody.appendChild(tr);
        });
    }, [liveDiagData]);

    const fetchData = async (url, errorMsg) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.ok) {
                return await response.json();
            } else {
                showToast(errorMsg);
            }
        } catch {
            showToast(errorMsg);
        }
    };

    const showToast = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const createTableCell = (tr, content) => {
        const td = document.createElement('td');
        td.className = 'border text-center p-2.5 border-solid border-[#333] break-words whitespace-normal'; // Tailwind classes

        if (typeof content === 'string') {
            td.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            td.appendChild(content);
        }

        tr.appendChild(td);
    };

    const refresh = () => {
        fetch(`${backendUrl}/admin/live_diag`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    setLiveDiag(data.diagnostics);
                } else {
                    showToast('Failed to fetch Live Diagnostics');
                }
            })
            .catch(() => showToast('Failed to fetch Live Diagnostics'));
    };

    const showPopup = (index) => {
        setCurrentMessage(liveDiagData[index].diagnostics);
        setRead(liveDiagData[index].read)
        setCurrentDiagIndex(index);
        setPopupVisible(true);
    };

    const markAsRead = async () => {
        if (currentDiagIndex !== null) {
            let updatedLiveDiagData = [...liveDiagData];
            const diagId = liveDiag[currentDiagIndex].id;
            await fetch(`${backendUrl}/admin/live_diag/${diagId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(async (response) => {
                if (response.ok) {
                    const responseData = await response.json();
                    toast.success(responseData.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    }
                    )
                }
            })
            updatedLiveDiagData[currentDiagIndex].read = true;
            setLiveDiagData(updatedLiveDiagData);
            setPopupVisible(false);
            refresh()
        }
    };
    // Function to handle keydown event
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) { // Escape key
            setPopupVisible(false);
        }
    };

    const handleClickOutside = (event) => {
        if (event.target === document.querySelector('.fixed')) {
            setPopupVisible(false);
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


    return (
        <div>
            <NavBar />
            <div className='flex justify-between items-center'>
                <h1>Live Diagnostics</h1>
                <div className='float-right flex items-center'>
                    <button className="border-none flex text-center uppercase transition-[0.5s] bg-[200%_auto] text-white shadow-[0_0_20px_#eee] cursor-pointer w-auto m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] phone:text-sm bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)]"
                        onClick={refresh}
                    >
                        Refresh
                    </button>
                    <select className="ml-2 p-2 rounded border border-gray-300 float-right" value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Read">Read</option>
                        <option value="Unread">Unread</option>
                    </select>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full mb-5 border-collapse'>
                    <thead>
                        <tr>
                            <th scope="col" className='border text-center p-2.5 border-solid border-[#333] bg-[#7bbec8] text-white text-base font-serif'>Car</th>
                            <th scope="col" className='border text-center p-2.5 border-solid border-[#333] bg-[#7bbec8] text-white text-base font-serif'>User</th>
                            <th scope="col" className='border text-center p-2.5 border-solid border-[#333] bg-[#7bbec8] text-white text-base font-serif'>Read</th>
                            <th scope="col" className='border text-center p-2.5 border-solid border-[#333] bg-[#7bbec8] text-white text-base font-serif'>Diagnostics</th>
                        </tr>
                    </thead>
                    <tbody id='tbody'>
                    </tbody>
                </table>
            </div>

            {popupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg mx-20">
                        <h2 className="text-xl font-bold mb-4">Diagnostics Message</h2>
                        <p className="mb-4">{currentMessage}</p>
                        { !read && <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={markAsRead}
                            
                        >
                            Mark as Read
                        </button>}
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => setPopupVisible(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default LiveDiagnostics;
