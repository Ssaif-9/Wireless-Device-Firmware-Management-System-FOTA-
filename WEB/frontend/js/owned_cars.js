function getOwnedCars() {
    fetch('http://localhost:8626/users/me/cars',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch cars");
        }
    }).then((data) => {
        // console.log(data);
        const cars = data;
        const carList = document.getElementById("carList");
        carList.innerHTML = "";
        const carRow = document.createElement("tr");
        carList.appendChild(carRow);
        const carItem = document.createElement("th");
        carItem.textContent = "Maker";
        carList.appendChild(carItem);
        const carItem2 = document.createElement("th");
        carItem2.textContent = "Model";
        carList.appendChild(carItem2);
        const carItem3 = document.createElement("th");
        carItem3.textContent = "Year";
        carList.appendChild(carItem3);


        cars.forEach((car) => {
            const carRow = document.createElement("tr");
            carList.appendChild(carRow);
            const carItem = document.createElement("td");
            carItem.textContent = `${car.maker}`;
            carList.appendChild(carItem);
            const carItem2 = document.createElement("td");
            carItem2.textContent = `${car.model}`;
            carList.appendChild(carItem2);
            const carItem3 = document.createElement("td");
            carItem3.textContent = `${car.year}`;
            carList.appendChild(carItem3);
        });
    }).catch((error) => {
        console.error(error);
    });
}

    function addCar() {
        const maker = document.getElementById("car-brand").value;
        const model = document.getElementById("car-model").value;
        const year = document.getElementById("car-year").value;

        // console.log(maker);
        // console.log(model);
        // console.log(year);

        fetch('http://localhost:8626/users/me/cars',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                maker,
                model,
                year
            })
        }).then((response) => {
            if (response.ok) {
                closePopup();
                return response.json();
            } else {
                throw new Error("Failed to add car");
            }
        }).then((data) => {
            console.log(data);

            getOwnedCars();
        }).catch((error) => {
            document.getElementById("error_show").textContent = error.message;
            document.getElementById("error_show").style.display = "block";
            console.error(error);
        });
    }

    function popup() {
        console.log("popup");
        console.log(document.getElementById("popup").style.display);
        document.getElementById("popup").style.display === "block" ? document.getElementById("popup").style.display = "none" : document.getElementById("popup").style.display = "block";
    }

    window.onclick = function(event) {
        if (event.target === document.getElementById("popup") || event.target === document.getElementById("car-brand") || event.target === document.getElementById("car-model") || event.target === document.getElementById("car-year") || event.target === document.getElementById("error_show")){
            document.getElementById("error_show").style.display = "none";
        }
    }

    // window.onclick = function(event) {
    //     if (event.target != document.getElementById('popup')){
    //         popup.style.display = 'none';
    //     }
    // }




    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

    // Close the dropdown if the user clicks outside of it




    // window.onclick = function(event) {
    //     if (event.target !== document.getElementById("popup")) {
    //         document.getElementById("popup").style.display = "none";
    //     }
    // }








//         for Car Selection
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