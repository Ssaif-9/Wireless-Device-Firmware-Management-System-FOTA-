import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/entypo/cross';
import NavBar from './navbar'

const DeleteMember = () => {
    const backendUrl = import.meta.env.VITE_URL;
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
    const [members, setMembers] = useState([]);
    const [tableHeader, setTableHeader] = useState(['Name', 'Role', 'Email', 'Delete'])
    const [getMembers, setGetMembers] = useState(true)
    useEffect(() => {
        async function fetchMembers() {
            try {
                console.log('fetching members');
                const response = await fetch(`${backendUrl}/admin/members`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });

                if (response.ok) {
                    const res = await response.json();
                    setMembers(res.members);
                    setGetMembers(false);
                    console.log(res);
                } else {
                    const errorRes = await response.json();
                    console.error(errorRes);
                    toast.error('No Members Found!!', {
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
                console.error('Error fetching members:', error);
                toast.error('An error occurred while fetching members.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

        if (getMembers) {
            fetchMembers();
        }
    }, [getMembers, backendUrl]);


    return (
        <>
            <>
                {showLabel && <NavBar />}
                <div className='mx-7 phone:mt-5'>
                    <div className="flex justify-between items-center">
                        <h2 className='text-xl'>System Members</h2>
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
                            {members.map((member, index) => (
                                <tr key={index}>
                                    <td className='border text-center p-2.5 border-solid border-[#333]'>{member.name}</td>
                                    <td className='border text-center p-2.5 border-solid border-[#333]'>{member.role}</td>
                                    <td className='border text-center p-2.5 border-solid border-[#333]'>
                                        <a href={`mailto:${member.email}`}>{member.email}</a>
                                    </td>
                                    <td className='border text-center p-2.5 border-solid border-[#333]'>
                                        <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => {
                                            fetch(`${backendUrl}/admin/members`, {
                                                method: 'DELETE',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                },
                                                body: JSON.stringify({ email: member.email })
                                            }).then(async (response) => {
                                                if (response.ok) {
                                                    const res = await response.json()
                                                    console.log(res)
                                                    setMembers(members.filter((mem) => mem.email !== member.email))
                                                    toast.success('Member Deleted Successfully',
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
                                                else {
                                                    console.error(await response.json())
                                                    toast.error('Member Deletion Failed!!',
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
                                            })
                                        }}>
                                            <Icon icon={cross} size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
            <ToastContainer />
        </>
    )
}

export default DeleteMember