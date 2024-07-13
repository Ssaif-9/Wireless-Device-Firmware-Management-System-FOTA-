const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return re.test(password);
}
const validatePhone = (phone) => {
  const re = /^01[0125][0-9]{8}$/;
  return re.test(phone);
};
const validateName = (name) => {
  const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return re.test(name);
};

function car_brand() {
  fetch("http://localhost:8626/cars/make")
    .then((response) => response.json())
    .then((data) => {
      // Update the HTML content with the fetched data
      // console.log(data);
      const dataList = document.getElementById("car-brand");
      data.forEach((item) => {
        const listItem = document.createElement("option");
        listItem.textContent = item;
        dataList.appendChild(listItem);
      });
      car_model()
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function car_model() {
  document.getElementById("car-model").innerHTML = "";
  const make = document.getElementById("car-brand");
  // console.log(make);
  fetch("http://localhost:8626/cars/model", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ maker: make.value }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      const modelList = document.getElementById("car-model");
      responseData.forEach((item) => {
        const listItem = document.createElement("option");
        listItem.textContent = item;
        modelList.appendChild(listItem);
      });
      car_year()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function car_year() {
  document.getElementById("car-year").innerHTML = "";
  const make = document.getElementById("car-brand");
  const model = document.getElementById("car-model");
  fetch("http://localhost:8626/cars/year", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ maker: make.value, model: model.value }),
  })
    .then((response) => response.json())
    .then((responseData) => {
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
async function submit() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone-number").value;
  const brand = document.getElementById("car-brand").value;
  const model = document.getElementById("car-model").value;
  const year = document.getElementById("car-year").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;
  try {
    if (!validateName(name)) {
      console.error("Please enter a valid Name!");
      throw new Error("Please enter a valid Name!");
    }
    if (!validatePhone(phone)) {
      console.error("Phone Number must be 11 numbers!");
      throw new Error("Phone Number must be 11 numbers!");
    }
    if (!validateEmail(email)) {
      console.error("Please enter a valid E-mail!!");
      throw new Error("Please enter a valid E-mail!!");
    }
    if (password != repassword) {
      console.error("Password Not Match");
      throw new Error("Password Does Not Match!");
    }
    if (!validatePassword(password)) {
      console.error(
        "Password Must be more than 7 characters and contains #$*...etc.!"
      );
      throw new Error(
        "Password Must be more than 7 characters and contains #$*...etc.!!"
      );
    }
    if (brand == "") {
      console.error("Please enter a valid Brand!");
      throw new Error("Please enter a valid Brand!");
    }
    if (model == "") {
      console.error("Please enter a valid Model!");
      throw new Error("Please enter a valid Model!");
    }
    if (year == "") {
      console.error("Please enter a valid Year!");
      throw new Error("Please enter a valid Year!");
    }
    const data = {
      name: name,
      phone: phone,
      maker: brand,
      model: model,
      year: year,
      email: email,
      password: password,
    };
    // console.log(data); 
    // Create an options object for the fetch request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
      },
      body: JSON.stringify(data), // Convert the data to JSON format
    };
  
    // Make the POST request using fetch
    const response = await fetch("http://localhost:8626/users", options);
  
    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Parse the response JSON and return it
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      
      window.location.href = "./home.html";
      document.getElementById("name").value = "";
      document.getElementById("phone-number").value = "";
      document.getElementById("car-brand").value = "";
      document.getElementById("car-model").value = "";
      document.getElementById("car-year").value  = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("repassword").value = "";
      return responseData;
    } else {
      // If there was an error, handle the error response
      const errorText = await response.text(); // Get the error message as plain text
    throw { status: response.status, message: errorText };
  }
  } catch (error) {
    // Log the error message and status code
    console.error('Error:', error.status, error.message);
    document.getElementById("error_show").textContent = error.message;
    document.getElementById("error_show").style.display = "block";  
    // Optionally, you can rethrow the error or handle it in another way
    throw error;
  }
}

window.onclick = function (event) {
  if (
    event.target === document.getElementById("name") ||
    event.target === document.getElementById("phone-number") ||
    event.target === document.getElementById("car-brand") ||
    event.target === document.getElementById("car-model") ||
    event.target === document.getElementById("car-year") ||
    event.target === document.getElementById("email") ||
    event.target === document.getElementById("password") ||
    event.target === document.getElementById("repassword") ||
    event.target === document.getElementById("image") ||
    event.target === document.getElementById("signup-body")
    
  ) {
    document.getElementById("error_show").style.display = "none";
  }
};
