const User = require("./user");
const Permissions = require("./permissions");
const UserPermission = require("./userPermissions");
const UserCar = require("./userCar");
const Car = require("./car");
const News = require("./news");
const LiveDiagnostics = require("./liveDiagnostics");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = require("./postgres");
// const { DataTypes, Model } = require("sequelize");
User.hasMany(LiveDiagnostics, { as: 'liveDiagnostics', onDelete: 'CASCADE' });
LiveDiagnostics.belongsTo(User);
LiveDiagnostics.belongsTo(Car);
Car.hasMany(LiveDiagnostics, { as: 'liveDiagnostics', onDelete: 'CASCADE' });

// Sync the models with the database
sequelize
  .sync({ force: false }) // Set force: true only for development; it drops existing tables
  .then(async () => {
    console.log("Tables created and associations established");
    const permissionsData = [
      { permission: "Add_new_admin_member" },
      { permission: "Edit_add_delete_car_data" },
      { permission: "Upload_car_updates" },
      { permission: "Add_news" },
      { permission: "Receive_live_diag" },
      { permission: "Delete_admin_member" }   
      // { permission: "See_Delete_users_data" },
    ];

    permissionsData.forEach(async (permission) => {
      await Permissions.findOrCreate({
        where: { permission: permission.permission },
        defaults: permission,
      });
    });

    const adminUser = {
      name: "Johan",
      email: "eng.yohannaayad@gmail.com",
      role: "admin",
      verified: true,
      password: bcrypt.hashSync("admin", 10),
    };

    User.findOne({ where: { email: adminUser.email } })
      .then((user) => {
        if (!user) {
          // User not found, create it or handle the situation as needed
          console.log("User not found. Creating a new user...");
          // Example of creating a new user
          User.create(adminUser).then((newUser) => {
            Permissions.findAll().then((permissions) => {
              newUser.addPermissions(permissions).then(() => {
                console.log("Permissions added to the new user.");
              });
            });
          });
        } else {
          // User found, add permissions
          Permissions.findAll().then((permissions) => {
            user.addPermissions(permissions).then(() => {
              console.log("Permissions added to the existing user.");
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error finding or creating user:", error);
      });

    // Insert data into Car table
    if (await Car.count() > 0) {
      console.log("Car table already has data");
      return;
    } else {
      const csv = require("csvtojson");
      const jsonArray = await csv().fromFile(process.env.CSV_FILE_PATH);
      await Car.bulkCreate(jsonArray);
      console.log("CSV data has been imported into Sequelize.");
    }
  });