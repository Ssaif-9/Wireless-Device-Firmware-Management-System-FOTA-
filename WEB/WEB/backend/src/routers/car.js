const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const carController = require("../controllers/car");

//        Get Car Make
router.get("/cars/make", carController.getCarMake);

//        Get Car Model
router.post("/cars/model", carController.getCarModel);

//        Get Car Year
router.post("/cars/year", carController.getCarYear);

//        Get Car Users
router.post("/cars/users",auth, carController.getCarUsers);

//        Add Car
router.post("/cars", auth, carController.addCar);

//        Update Car
router.patch("/cars/:id", auth, carController.updateCar);

//        Delete Car
router.delete("/cars", auth, carController.deleteCar);

module.exports = router;
