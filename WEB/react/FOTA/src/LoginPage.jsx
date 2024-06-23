import { useState, useEffect } from 'react'
import loginImage from './assets/310a7790dfad7f4b16e2c4abf39a0978.png'
import './App.css'
// import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function LoginPage() {
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
  }
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    // const error = document.getElementById('error_show');
    // error.innerHTML = '';
    // if (email === '') {
    //   error.innerHTML = 'Please enter your email';
    //   return;
    // }
    // if (password === '') {
    //   error.innerHTML = 'Please enter your password';
    //   return;
    // }

    const data = {
      email,
      password
    };
    console.log(data);
    try {
      // Create an options object for the fetch request
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        },
        body: JSON.stringify(data), // Convert the data to JSON format
      };

      // Make the POST request using fetch
      const response = await fetch(`${backendUrl}/users/login`, options);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON and return it
        const responseData = await response.json();
        // console.log(responseData);
        localStorage.setItem("token", responseData.user.token);
        localStorage.setItem("user", JSON.stringify(responseData.user.user));
        if (responseData.user.user.role === "admin" || responseData.user.user.role === "member") {
          window.location.href = "./adNews";
        }
        else {
          window.location.href = "./home";
        }

        return responseData;
      } else {
        // If there was an error, handle the error response
        const errorText = await response.json(); // Get the error message as plain text
        console.error(errorText);
        throw { status: response.status, message: errorText.error };
      }
    } catch (error) {
      // Log the error message and status code
      console.error('Error:', error.status, error.message);
      // document.getElementById("error_show").textContent = error.message;
      // document.getElementById("error_show").style.display = "block";
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Optionally, you can rethrow the error or handle it in another way
      throw error;
    }
  }
  return (
    <>
      <h1 className="text-center m-[2%] font-serif text-[#487379] text-2xl">LOGIN</h1>
      <form onSubmit={handleLogin}>

        <div className="phone:w-4/5 tablet:w-[850px] bg-white shadow-[0px_0px_10px_#ccc] mx-auto my-0 phone:p-2.5 tablet:p-5 rounded-[10px]" id="login-body">

          <div className="img block phone:mx-auto phone:text-center phone:my-0 tablet:float-end">
            <img src={loginImage} alt="img" className='tablet:w-[300px] phone:w-[250px] phone:mx-auto' />
          </div>
          <h1 className='text-[#487379] text-2xl block phone:text-center phone:mx-auto phone:my-0 tablet:mt-4 tablet:mb-8 font-serif'>Hello</h1>
          <div>
            {showLabel &&
              <div className='tablet:float-left not-italic text-[larger] font-serif phone:text-[x-large]'>
                <label htmlFor="email" className='block text-[#59888f] mt-1 mb-[33%]'>Email</label>
                <label htmlFor="password" className='block text-[#59888f] mb-[30%]'>Password</label>
              </div>
            }
            <div className='login-input phone:block phone:justify-center phone:text-center phone:mx-auto phone:my-0 tablet:float-right tablet:mb-[3%]'>
              <input type="email"
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required className='mb-1 phone:p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center tablet:p-2 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm' />
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
              {/* <i className="bg-black absolute " id="eye"></i> */}
            </div>
          </div>
          {showLabel && <br />}
          {showLabel && <br />}
          {showLabel && <br />}
          {showLabel && <br />}
          {showLabel && <br />}
          {/* <span id="error_show"></span> */}
          <div className='login-button phone:w-40 mb-[3%] phone:block phone:mx-auto tablet:inline-flex tablet:items-baseline tablet:w-auto'>
            <div className='tablet:flex tablet:mt-[-9%] tablet:mx-auto'>
              <input type="submit" value="Login" id="submit" className='bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] border-none text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer w-[100px] m-2.5 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] mx-8' />
              <p className='my-auto tablet:ml-44 tablet:w-auto phone:text-center text-[#59888f]'><b><a href="./forget_password" className='no-underline text-[#59888f] hover:text-[#71cbdb]'>Forgot Password!</a></b></p>

            </div>
          </div>
          {showLabel &&
            <p className='tablet:ml-[-280px] tablet:w-[100%] tablet:text-center tablet:text-lg tablet:mt-[-2%] text-[#59888f] not-italic text-[medium]'>Don't have account <b><a href="./signup" className='text-base no-underline text-[#59888f] hover:text-[#71cbdb]'>Create Account!</a></b></p>
          }
          {!showLabel &&
            <p className='text-center tablet:text-lg text-[#59888f] not-italic text-[medium]'><b><a href="./signup" className='no-underline text-[#59888f] hover:text-[#71cbdb]'>Create Account!</a></b></p>
          }
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default LoginPage
