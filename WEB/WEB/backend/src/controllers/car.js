const { Json } = require('sequelize/lib/utils');
const carService = require('../services/car');

const carController = {
    // Function to get car make         Done
    getCarMake: async (req, res) => {
        try {
            const cars = await carService.getCarMake();
            if (cars === 'No cars found') {
                res.status(404).send({
                    error: "No cars found"
                });
            }
            res.send(cars);
        } catch (error) {
          res.status(500).send();
        }
      },
        // Function to get car model        Done
      getCarModel: async (req, res) => {
        try {
            const cars = await carService.getCarModel(req.body.maker);
            if (cars === 'No cars found') {
                res.status(404).send({
                    error: "No cars found"
                });
            }
            res.send(cars);
        } catch (error) {
          res.status(500).send();
        }
      },
        // Function to get car year        Done
      getCarYear: async (req, res) => {
        try {
            const cars = await carService.getCarYear(req.body.maker, req.body.model);
            if (cars === 'No cars found') {
                res.status(404).send({
                    error: "No cars found"
                });
            }
            res.send(cars);
        } catch (error) {
          res.status(500).send();
        }
      },
    //   Function to get car users        Done
      getCarUsers: async (req, res) => {
        if (req.user.role !== 'admin' && req.user.role !== 'member') {
            console.error('You do not have permission to perform this action!');
            return res.status(403).send({
                error: 'You do not have permission to perform this action!'
            });
        }
        console.log("User have permission to get car users");
        try {
            const users = await carService.getCarUsers(req.body.maker, req.body.model, req.body.year);
            if (users === 'No cars found') {
                throw new Error('No cars found ');   
            } 
            if (users === 'No users found') {
                throw new Error('No users found');
            }
            res.send({"message":"Users fetched successfully!", users});
        } catch (error) {
          res.status(404).send({ "error: ": error.message });
        }
      },
    //   Function to add car              Done
      addCar: async (req, res) => {
        if (!req.user.permissions.includes(2)) {
            console.error('You do not have permission to perform this action!');
            return res.status(403).send({
                error: 'You do not have permission to perform this action!'
            });
        }
        console.log("User have permission to add car");
        try {
            const payload = {
                maker: req.body.maker,
                model: req.body.model,
                year: req.body.year
            };
            const car = await carService.addCar(payload);
            if (car === 'All fields are required!') {
                return res.status(400).send({
                    error: "All fields are required!"
                });
            }
            if (car === 'Car already exists') {
                return res.status(409).send({
                    message: "Car already exists"
                });
            }
            res.status(201).send({message: 'Car Created successful!', car});
            } catch (error) {
            res.status(400).send({ "error": error });
        }
      },
    //   Function to update car           Done
      updateCar: async (req, res) => {
        if (!req.user.permissions.includes(2)) {
            console.error('You do not have permission to perform this action!');
            return res.status(403).send({
                error: 'You do not have permission to perform this action!'
            });
        }
        console.log("User have permission to edit car");
        try {
            const car = await carService.updateCar(req.params.id, req.body);
            if (car === 'Car not found') {
                return res.status(404).send({
                    error: "Car not found"
                });
            }
            if (car === 'Invalid updates!') {
                return res.status(400).send({
                    error: "Invalid updates!"
                });
            }
            res.send({message: 'Car updated successful!', car});
        } catch (error) {
            res.status(500).send();
        }
      },
    //   Function to delete car           Done
      deleteCar: async (req, res) => {
        if (!req.user.permissions.includes(2)) {
            console.error('You do not have permission to perform this action!');
            return res.status(403).send({
                error: 'You do not have permission to perform this action!'
            });
        }
        console.log("User have permission to delete car");
        try {
            const car = await carService.deleteCar(req.body.maker, req.body.model, req.body.year);
            if (car === 'Car not found') {
                return res.status(404).send({
                    error: "Car not found"
                });
            }
            res.send({car, message: 'Car deleted successful!'});
        } catch (error) {
          res.status(500).send();
        }
      }
}

module.exports = carController;