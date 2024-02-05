document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is logged in by verifying the presence of a token in local storage
    var token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null" || token === "") {
      // If the user is not logged in, redirect them to the login page
      window.location.href = "login.html";
        // Stop the execution of this function
        // return;
    }
    });
// window.onload = function() {
//     // Check if the user is logged in by verifying the presence of a token in local storage
//     var token = localStorage.getItem("token");
//     if (!token || token === "undefined" || token === "null" || token === "") {
//       // If the user is not logged in, redirect them to the login page
//       window.location.href = "login.html";
//     }
//     };

  
    //      Logout
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }