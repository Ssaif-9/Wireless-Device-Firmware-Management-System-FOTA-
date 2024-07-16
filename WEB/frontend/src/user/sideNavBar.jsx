import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideNavBar = ({ toggleSidebar }) => {
    const backendUrl = import.meta.env.VITE_URL;

    const logout = async () => {
        await fetch(backendUrl + '/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = './login';
            }
            else {
                toast.error('Failed to logout',
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            }
        }).catch(error => {
            toast.error('Failed to logout',
                {
                    position: "top-right",
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
        <div className="sidebar fixed top-0 left-0 w-[250px] h-full bg-gray-800 text-white p-4 z-50">
            <button onClick={toggleSidebar} className="mb-4 text-2xl">&times;</button>
            <nav>
                <ul>
                    <li><a href="./home" className="block py-2 px-4 hover:bg-gray-700">Home</a></li>
                    <li><a href="./ownedCars" className="block py-2 px-4 hover:bg-gray-700">Owned Cars</a></li>
                    <li><a href="./profile" className="block py-2 px-4 hover:bg-gray-700">Profile</a></li>
                    <li><a href="./about" className="block py-2 px-4 hover:bg-gray-700">About</a></li>
                    <li><a href='/liveDiag' className="block py-2 px-4 hover:bg-gray-700">Live Diagnostics</a></li>
                    <li onClick={logout} className="block py-2 px-4 hover:bg-gray-700 cursor-pointer">Logout</li>
                </ul>
            </nav>
        </div>
    );
}

export default SideNavBar;
