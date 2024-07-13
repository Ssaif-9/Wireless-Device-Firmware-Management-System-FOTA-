import { useState, useEffect } from 'react'
import loginImage from './assets/310a7790dfad7f4b16e2c4abf39a0978.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import './assets/HomePage.css';
import './index.css';


function LoginPage() {
  const backendUrl = import.meta.env.VITE_URL;
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth <= 600;
    setShowLabel(!isMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600;
      setShowLabel(!isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    setIcon(type === 'password' ? eye : eyeOff);
    setType(type === 'password' ? 'text' : 'password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${backendUrl}/users/login`, options);

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.user.token);
        localStorage.setItem("user", JSON.stringify(responseData.user.user));
        window.location.href = responseData.user.user.role === "admin" || responseData.user.user.role === "member" ? "./adNews" : "./home";
      } else {
        const errorText = await response.json();
        throw { status: response.status, message: errorText.error };
      }
    } catch (error) {
      toast.error(error.message, {
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
    <div id='login' className="bg-[url('https://johan22.sirv.com/Designer%20(3_1).jpeg')] bg-no-repeat bg-cover min-h-screen flex items-center justify-center ">
      <div>
        <h1 id='h1' className="text-center m-[2%] text-[#ffffff] text-2xl rounded-full bg-[#53f0f3cd] shadow-[0_0_40px_#53f0f3] transition-shadow duration-500 outline-none ring-2 ring-[#53f0f3] ring-opacity-50 italic" 
          >
          LOGIN
        </h1>
        <form onSubmit={handleLogin}>
          <div className=" text-center phone:w-4/5 tablet:max-w-xl mt-2 bg-[rgba(255,255,255,0.5)] shadow-[0px_0px_10px_#ccc] mx-auto my-0 phone:p-2.5 tablet:p-5 rounded-[10px]" id="login-body">
            <h1 id='h1' className='text-[#000000] text-2xl block phone:text-center phone:mx-auto phone:my-0 tablet:mb-4 font-serif'>Hello</h1>
            <div>
              {/* {showLabel &&
                <div className='tablet:float-left not-italic text-[larger] font-serif phone:text-[x-large] font-semibold'>
                  <label htmlFor="email" className='block text-[#ffffff] mt-1 mb-[28%]'>Email</label>
                  <label htmlFor="password" className='block text-[#ffffff] mb-[30%]'>Password</label>
                </div>
              } */}
              {/* <div className='login-input phone:block phone:justify-center phone:text-center phone:mx-auto phone:my-0 tablet:float-right tablet:mb-[3%]'> */}
              <div>
                <input type="email"
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required className='mb-2 phone:p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center tablet:p-2 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm' />
                {showLabel && <br />}
                <div className="tablet:inline-flex phone:inline-flex">
                  <input
                    type={type}
                    name='password'
                    autoComplete="current-password"
                    id='password'
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required className='mb-1 phone:p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center tablet:p-2 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
                  />
                  <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle}>
                    <Icon className="absolute mr-10 -mt-1 tablet:-ml-1" icon={icon} size={23} />
                  </span>
                </div>
              </div>
            </div>
            {/* {showLabel && <br />} */}
            {/* {showLabel && <br />}
            {showLabel && <br />}
            {showLabel && <br />} */}
            {showLabel && <br />}
            <div className='login-button phone:w-40 mb-[3%] phone:block phone:mx-auto tablet:inline-flex tablet:items-baseline tablet:w-auto'>
              <div className='tablet:flex tablet:mt-[-9%] tablet:mx-auto'>
                <input type="submit" value="Login" id="submit" className='bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] border-none text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px]  p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] mx-8' />
              </div>
            </div>
            <p className='my-auto tablet:ml-0 tablet:w-auto phone:text-center text-[#59888f]'><b><a href="./forget_password" className='no-underline text-[#1e00ff] hover:text-[#01a2ec]'>Forgot Password!</a></b></p>

            <br />
            {showLabel &&
              <p className='tablet tablet:w-[100%] tablet:text-center tablet:text-lg tablet:mt-[-2%] text-[#000000] not-italic text-[medium] font-bold'>Don't have account <b><a href="./signup" className='text-base no-underline text-[#1e00ff] hover:text-[#01a2ec]'>Create Account!</a></b></p>
            }
            {!showLabel &&
              <p className='text-center tablet:text-lg text-[#59888f] not-italic text-[medium]'><b><a href="./signup" className='no-underline text-[#59888f] hover:text-[#71cbdb]'>Create Account!</a></b></p>
            }
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginPage;
