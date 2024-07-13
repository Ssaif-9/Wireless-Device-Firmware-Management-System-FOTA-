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
      car_model();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function car_model() {
  document.getElementById("car-model").innerHTML = "";
  console.log("car_model");
  console.log(document.getElementById("car-model").value);

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
      car_year();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function car_year() {
  document.getElementById("car-year").innerHTML = "";
  console.log("car_year");
  console.log(document.getElementById("car-brand").value);
  console.log(document.getElementById("car-model").value);
  console.log(document.getElementById("car-year").value);

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

async function upload() {
  const maker = document.getElementById("car-brand").value;
  const model = document.getElementById("car-model").value;
  const year = document.getElementById("car-year").value;
  const car_parts = document.getElementById("car-parts").value;
  const fileInput = document.getElementById("file");
  // Create a FormData object and append the file to it
  const formData = new FormData();
  formData.append("hex", fileInput.files[0]); // Assuming you only want to upload one file

  // Append other form data
  formData.append("maker", maker);
  formData.append("model", model);
  formData.append("year", year);
  formData.append("car_parts",car_parts)
//   console.log(formData.get);
  try {
    // Create options for the fetch request
    const options = {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data", // Do not set this
      },
      body: formData, // Use FormData for file uploads
    };

    // Make the POST request using fetch
    const response = await fetch("http://localhost:8626/admin/upload", options);

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // window.alert("Data Uploaded successfully");
      return responseData;
    } else {
      const errorText = await response.text();
      throw { status: response.status, message: errorText };
    }
  } catch (error) {
    console.error("Error:", error.status, error.message);
    document.getElementById("error_show").textContent = error.message;
    document.getElementById("error_show").style.display = "block";
    throw error;
  }
}

window.onclick = function(event) {
  if (event.target != document.getElementById("submit")){
      document.getElementById("error_show").style.display = "none";
  }
}
