function show_notification() {
    const notificationElement = document.getElementById("notification");
    const notificationList = document.getElementById("list");

    console.log("popup");
    console.log(notificationElement.style.display);
    
    if (notificationElement.style.display === "block") {
        notificationElement.style.display = "none";
    } else {
        notificationElement.style.display = "block";
    }
    
    notificationElement.style.transition = "display 0.5s"; // Add transition effect
    notificationList.style.transition = "display 0.5s"; // Add transition effect
}