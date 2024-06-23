import { useState, useEffect } from 'react'
import Select from 'react-select';
import Validator, { isTime } from 'validator';
import loginImage from './assets/310a7790dfad7f4b16e2c4abf39a0978.png'
// import './signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';



function SignUpPage() {
  // console.log(import.meta.env.VITE_URL);
  const backendUrl = import.meta.env.VITE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carBrandFlag, setCarBrandFlag] = useState('false');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');




  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [type2, setType2] = useState('password');
  const [icon2, setIcon2] = useState(eyeOff);
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const handleToggle2 = () => {
    if (type2 === 'password') {
      setIcon2(eye);
      setType2('text')
    } else {
      setIcon2(eyeOff)
      setType2('password')
    }
  }


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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const ids = [
        "name",
        "phone-number",
        "car-brand",
        "car-model",
        "car-year",
        "email",
        "password",
        "repassword",
        "image",
        "signup-body"
      ];

      if (ids.some(id => event.target === document.getElementById(id))) {
        document.getElementById("error_show").style.display = "none";
        document.getElementById("phone-number").style.borderColor = "#53f0f3";
        document.getElementById("name").style.borderColor = "#53f0f3";
        document.getElementById("car-brand").style.borderColor = "#53f0f3";
        document.getElementById("car-model").style.borderColor = "#53f0f3";
        document.getElementById("car-year").style.borderColor = "#53f0f3";
        document.getElementById("email").style.borderColor = "#53f0f3";
        document.getElementById("password").style.borderColor = "#53f0f3";
        document.getElementById("password").style.borderColor = "#53f0f3";
        document.getElementById("repassword").style.borderColor = "#53f0f3";
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


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


  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // if (!name || !phone || !carBrand || !carModel || !carYear || !email || !password || !repassword) {
      //   console.error("Please fill all the fields!");
      //   throw new Error("Please fill all the fields!");
      // }
      if (!name) {
        console.error("Name is required!");
        throw new Error("Name is required!");
      }

      if (!phone) {
        console.error("Phone Number is required!");
        throw new Error("Phone Number is required!");
      }

      if (!carBrand) {
        console.error("Car Brand is required!");
        throw new Error("Car Brand is required!");
      }

      if (!carModel) {
        console.error("Car Model is required!");
        throw new Error("Car Model is required!");
      }

      if (!carYear) {
        console.error("Car Year is required!");
        throw new Error("Car Year is required!");
      }

      if (!email) {
        console.error("Email is required!");
        throw new Error("Email is required!");
      }

      if (!password) {
        console.error("Password is required!");
        throw new Error("Password is required!");
      }

      if (!repassword) {
        console.error("Re-Password is required!");
        throw new Error("Re-Password is required!");
      }



      if (phone.length !== 11) {
        console.error("Phone Number must be 11 numbers!");
        throw new Error("Phone Number must be 11 numbers!");
      }

      if (!Validator.isEmail(email)) {
        console.error("Please enter a valid E-mail!!");
        throw new Error("Please enter a valid E-mail!!");
      }

      if (password !== repassword) {
        console.error("Password Not Match");
        throw new Error("Password Does Not Match!");
      }

      if (!Validator.isStrongPassword(password)) {
        console.error("Password Must be more than 7 characters and contains #$*...etc.!");
        throw new Error("Password Must be more than 7 characters and contains #$*...etc.!!");
      }
      const data = {
        name: name,
        phone: phone,
        maker: carBrand,
        model: carModel,
        year: carYear,
        email: email,
        password: password,
      };

      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));

      const response = await fetch(`${backendUrl}/users/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        // Parse the response JSON and return it
        const responseData = await response.json();
        console.log(responseData);
        // localStorage.setItem("token", responseData.token);
        // localStorage.setItem("user", JSON.stringify(responseData.user));

        window.location.href = "./verify";
        document.getElementById("name").value = "";
        document.getElementById("phone-number").value = "";
        document.getElementById("car-brand").value = "";
        document.getElementById("car-model").value = "";
        document.getElementById("car-year").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repassword").value = "";
        return responseData;
      } else {
        // If there was an error, handle the error response
        const errorText = await response.json(); // Get the error message as plain text
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
      // Handle border color based on error message
      if (error.message === "Phone Number must be 11 numbers!" || error.message === "Phone Number is required!" || error.message === "Phone already exists!") {
        document.getElementById("phone-number").style.borderColor = "red";
      }
      if (error.message === "Name is required!") {
        document.getElementById("name").style.borderColor = "red";
      }
      if (error.message === "Car Brand is required!") {
        document.getElementById("car-brand").style.borderColor = "red";
      }
      if (error.message === "Car Model is required!") {
        document.getElementById("car-model").style.borderColor = "red";
      }
      if (error.message === "Car Year is required!") {
        document.getElementById("car-year").style.borderColor = "red";
      }
      if (error.message === "Email is required!") {
        document.getElementById("email").style.borderColor = "red";
      }
      if (error.message === "Password is required!") {
        document.getElementById("password").style.borderColor = "red";
      }
      if (error.message === "Re-Password is required!") {
        document.getElementById("repassword").style.borderColor = "red";
      }
      if (error.message === "Please enter a valid E-mail!!" || error.message === "Email Already Exist") {
        document.getElementById("email").style.borderColor = "red";
      }
      if (error.message === "Password Does Not Match!" || error.message === "Password Must be more than 7 characters and contains #$*...etc.!!") {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("repassword").style.borderColor = "red";
      }

      // Optionally, you can rethrow the error or handle it in another way
      throw error;
    }
  };






  return (
    <>
      <body className='bg-[#ceeff4] font-serif'>
        <title>Signup</title>
        <h1 className="text-center m-[2%] font-serif text-[#487379] text-2xl">SIGNUP</h1>
        <div className="bg-white shadow-[0px_0px_10px_#ccc] mx-auto my-0 rounded-[10px] tablet:w-auto tablet:max-w-5xl tablet:p-5 phone:w-4/5 phone:p-2.5" id="signup-body">
          {/* <p className="header">Welcome to our project</p> */}
          <div className="block tablet:float-right phone:text-center">
            {showLabel && <br />}
            {showLabel && <br />}
            {showLabel && <br />}
            {showLabel && <br />}
            <img
              src={loginImage}
              alt="img"
              id="image"
              className='phone:w-[250px] tablet:w-auto tablet:max-w-[380px] tablet:my-auto mx-auto'
            />
          </div>
          <h1 className='phone:block phone:text-center phone:mx-auto phone:my-0 text-[#487379] text-2xl'>Hello</h1>

          <form onSubmit={handleSignUp}>
            <div className='flex'>


              {showLabel && <div className="float-left not-italic text-[large] font-serif">
                <br />
                <label htmlFor="name" className='block text-[#59888f] mb-[17%]'>FullName</label>
                <label htmlFor="phone-number" className='block text-[#59888f] mb-[17%]'>Phone</label>
                <label htmlFor="car-brand" className='block text-[#59888f] mb-[17%]'>Car Brand</label>
                <label htmlFor="car-model" className='block text-[#59888f] mb-[17%]'>Car Model</label>
                <label htmlFor="car-year" className='block text-[#59888f] mb-[17%]'>Car Year</label>
                <label htmlFor="email" className='block text-[#59888f] mb-[17%]'>Email</label>
                <label htmlFor="password" className='block text-[#59888f] mb-[17%]'>Password</label>
                <label htmlFor="repassword" className='block text-[#59888f] mb-[17%]'>Re-Password</label>
              </div>}
              <div className="mx-auto phone:block phone:justify-center phone:my-0">
                <br />
                <input type="text"
                  id="name"
                  name='name'
                  value={name}
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  inputMode='text'
                  required
                  className='mb-1 p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm' />
                <br />
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  placeholder="01x-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => {
                    let formattedValue = e.target.value
                      .replace(/[^0-9]/g, "") // Remove non-numeric characters
                      .slice(0, 11); // Limit to 11 characters (3 + 4 + 4)

                    if (formattedValue.length > 3 && formattedValue.length <= 7) {
                      formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                    } else if (formattedValue.length > 7) {
                      formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
                    }

                    setPhone(formattedValue);
                  }}
                  inputMode="tel"
                  maxLength={13} // Adjusted maxLength to account for "-" characters
                  required
                  className='mb-1 p-2 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50' />
                <br />
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
                    setCarModel(document.getElementById('car-model').value)
                    setCarYear(document.getElementById('car-year').value)
                  }}
                  required
                  className='mb-1 p-2 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
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
                    setCarYear(document.getElementById('car-year').value)
                  }}
                  required
                  className='mb-1 p-2 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
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
                  className='mb-1 p-2 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
                >
                  <option value="">Car Year</option>
                </select>
                <br />
                <input type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode='email'
                  required
                  className='mb-1 p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
                />
                <br />
                <div class="inline-flex">
                  <input
                    type={type}
                    name='password'
                    autoComplete="current-password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputMode='text'
                    required
                    className='mb-1 p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
                    />
                  <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle}>
                    <Icon className="absolute mr-10 -mt-1" icon={icon} size={22} />
                  </span>
                </div>
                <br />
                <div class="inline-flex">
                  <input
                    type={type2}
                    name='repassword'
                    autoComplete="current-repassword"
                    id="repassword"
                    placeholder="Re-Password"
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    inputMode='text'
                    required
                    className='mb-1 p-1.5 tablet:w-[280px] phone:w-[230px] box-border border text-center rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] border-solid border-[#53f0f3] shadow-[0px_0px_10px_#ccc] hover:border-[#53f0f3] hover:shadow-[0px_0px_20px_#53f0f3] transition-[0.5s] focus:outline-none focus:ring-2 focus:ring-[#53f0f3] focus:ring-opacity-50 text-[#59888f] text-sm'
                    />
                  <span className="flex justify-around items-center text-[#59888f]" onClick={handleToggle2}>
                    <Icon className="absolute mr-10 -mt-1" icon={icon2} size={22} />
                  </span>
                </div>
              </div>
            </div>
            <div className="phone:block phone:mx-auto phone:my-auto tablet:inline-block tablet:w-auto tablet:m-[0%]">
              <input type="submit" defaultValue="Signup" className='bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] text-center uppercase transition-[0.5s] bg-[200%_auto] border-none text-[white] shadow-[0_0_20px_#eee] cursor-pointer rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center] p-3 phone:flex phone:mx-auto phone:w-22 tablet:flex-auto tablet:w-[100px] tablet:m-2.5' />
              <p className='tablet:inline tablet:m-0 text-center text-[#59888f] not-italic text-[medium]'>
                Already have account?<a href="./login" className='text-base no-underline text-[#59888f] hover:text-[#71cbdb]'><b>Login</b></a>
              </p>
            </div>
          </form >
        </div >
      </body>

      <ToastContainer />
    </>
  )
}

export default SignUpPage
