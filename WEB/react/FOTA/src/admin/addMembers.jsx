import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'

const AddMembers = () => {

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [permission, setPermission] = useState([]);

    const AddMember = async () => {
        const data = {
            name: name,
            email: email,
            password: password,
            role: role,
            permissions: permission
        }
        console.log(data)
        const response = await fetch(`${backendUrl}/admin/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success(res.message);
        }
    }

    useEffect(() => {
        if (document.getElementById('role').value === 'member') {
            document.getElementById('addMember').disabled = true;
            document.getElementById('deleteMember').disabled = true;
        }
    }
    ,[role]);

    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center mt-10">
                <div className="relative tablet:w-[500px] shadow-2xl p-5 m-5 bg-white rounded-lg">
                    {/* <div className="col-md-6 offset-md-3"> */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className='text-center text-lg text-[#59888f] font-serif'>ADD MEMBER</h3>
                        </div>
                        <div className="not-italic text-[large] font-serif text-[#59888f] mx-10">
                            <div className="flex justify-between">
                                {showLabel && <label className='float-left'>Name</label>}
                                <input type="text"
                                    className="float-right box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[240px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                    required
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex justify-between">
                                {showLabel && <label>Email</label>}
                                <input type="email"
                                    className="box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[240px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                    required
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex justify-between">
                                {showLabel && <label>Password</label>}
                                <input type="password"
                                    className="box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[240px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                    required
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="flex justify-between">
                                {showLabel && <label>Role</label>}
                                <select className="box-border rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] mb-[4px] text-center p-2 border border-solid border-[#53f0f3] phone:w-[230px] phone:mx-auto tablet:w-[240px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]"
                                    id='role'
                                    onChange={(e) => {
                                        setRole(e.target.value)
                                        // console.log(e.target.value)
                                        const targetRole = e.target.value;
                                        if (targetRole === 'admin') {
                                            setPermission(['1', '2', '3', '4', '5', '6']);
                                            document.getElementById('addNews').checked = true;
                                            document.getElementById('addUpdate').checked = true;
                                            document.getElementById('addMember').checked = true;
                                            document.getElementById('editCars').checked = true;
                                            document.getElementById('rvLDiag').checked = true;
                                            document.getElementById('deleteMember').checked = true;
                                            document.getElementById('addMember').disabled = false;
                                            document.getElementById('deleteMember').disabled = false;
                                        } else {
                                            // If role is not admin, clear all permissions
                                            setPermission([]);
                                            document.getElementById('addNews').checked = false;
                                            document.getElementById('addUpdate').checked = false;
                                            document.getElementById('addMember').checked = false;
                                            document.getElementById('editCars').checked = false;
                                            document.getElementById('rvLDiag').checked = false;
                                            document.getElementById('deleteMember').checked = false;
                                            document.getElementById('addMember').disabled = true;
                                            document.getElementById('deleteMember').disabled = true;
                                            

                                        }
                                    }}>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <hr />
                            <div className="text-center">
                                <h3 className='m-3'>Permissions</h3>
                                <div className='flex justify-between'>
                                    <div className="form-check">
                                        <input className="form-check-input" id='addNews' type="checkbox" value="4" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Add News</label>
                                    </div>
                                    <div className="mx-[24%]">
                                        <input className="form-check-input" id='addUpdate' type="checkbox" value="3" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Add Update</label>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="form-check">
                                        <input className="form-check-input" id='addMember' type="checkbox" value="1" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Add Member</label>
                                    </div>
                                    <div className="mx-[17.5%]">
                                        <input className="form-check-input" id='deleteMember' type="checkbox" value="6" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Delete Member</label>
                                    </div>
                                </div>
                                <div className='flex justify-between'>

                                    <div className="form-check">
                                        <input className="form-check-input" id='editCars' type="checkbox" value="2" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Edit Cars</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" id='rvLDiag' type="checkbox" value="5" onChange={(e) => setPermission([...permission, e.target.value])} />
                                        <label className="form-check-label">Receive Live Diagnostics</label>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] tablet:w-[25%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' onClick={AddMember}>Add Member</button>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddMembers