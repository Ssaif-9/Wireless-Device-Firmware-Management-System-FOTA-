const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return re.test(password);
}

async function submit() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        if (!validateEmail(email)){
            console.error("Invalid Email")
            throw new Error("Invalid Email!!")
        }
        if (!validatePassword(password)){
            console.error("Invalid Password")
            throw new Error("Invalid Password!!")
        }
    }catch (error) {
            console.log({"Error": error});
        }
        const data = {
            email: email,
            password: password
        };
        // console.log(data);
        
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
            const response = await fetch("http://localhost:8626/users/login", options);
          
            // Check if the request was successful (status code 2xx)
            if (response.ok) {
              // Parse the response JSON and return it
              const responseData = await response.json();
              console.log(responseData);
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("user", JSON.stringify(responseData.user));
                if (responseData.user.role === "admin"){
                  window.location.href = "./admin_home.html"
                }
                else{
                  window.location.href = "./home.html";
                }
                
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

        window.onclick = function(event) {
          if (event.target != document.getElementById("submit")){
              document.getElementById("error_show").style.display = "none";
          }
      }