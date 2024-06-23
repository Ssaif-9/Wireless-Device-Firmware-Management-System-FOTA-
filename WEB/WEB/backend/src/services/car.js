// const Car = require("../models/car");
// const User = require("../models/user");

const Car = require("../schemas/car");
const User = require("../schemas/user");

const carService = {
  getCarMake: async () => {
    const cars = (await Car.findAll({ attributes: ["maker"], group: "maker"}));
    returnCars = [];

    cars.forEach((car) => {
      returnCars.push(car.maker);
    }
    );
    if (returnCars.length === 0) {
      return "No cars found";
    }
    return returnCars.sort();
  },
  getCarModel: async (maker) => {
    const cars = await Car.findAll({ attributes:["model"],group: "model", where:{ maker: maker }})
    returnCars = [];

    cars.forEach((car) => {
      returnCars.push(car.model);
    });
    if (returnCars.length === 0) {
      return "No cars found";
    }
    return returnCars.sort();
  },
  getCarYear: async (maker, model) => {
    const cars = await Car.findAll({ attributes:["year"],group: "year", where:{ maker: maker, model: model }})
    returnCars = [];

    cars.forEach((car) => {
      returnCars.push(car.year);
    });
    if (returnCars.length === 0) {
      return "No cars found";
    }
    return returnCars.sort();
  },
  getCarUsers: async (maker, model, year) => {
    const car = await Car.findOne({
      where: {
        maker: maker,
        model: model,
        year: year,
      }
    });
    if (!car) {
      return "No cars found";
    }
    const users = await car.getUsers();
    if (users.length === 0) {
      return "No users found";
    }
    returnUsers = [];
    users.forEach((user) => {
      returnUsers.push({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        verified: user.verified
      });
    });
    return returnUsers;
  },
  addCar: async (payload) => {
    if (!payload.maker || !payload.model || !payload.year) {
      return "All fields are required!";
    }
    const existingCar = await Car.findOne({
      where: {
        maker: payload.maker,
        model: payload.model,
        year: payload.year,
      }
    });
    if (existingCar) {
      return "Car already exists";
    }
    const car = await Car.create(payload);
    return car;
  },
  updateCar: async (id,payload) => {
    const updates = Object.keys(payload);
    const allowedUpdates = ["maker", "model", "year"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
      return "Invalid updates!";
    }
    const car = await Car.findOne({
      where: {
        id: id
      }
    });
    if (!car) {
      return "Car not found";
    }
    updates.forEach(async (update) => {
      car[update] = payload[update];
    }
    );
    await car.save();
    return car;
  },
    deleteCar: async (maker,model,year) => {
        const car = await Car.findOne({
            where: {
                maker: maker,
                model: model,
                year: year
            }
        });
        if (!car) {
            return "Car not found";
        }
        await car.destroy();
        return car;
    },
};

module.exports = carService;
