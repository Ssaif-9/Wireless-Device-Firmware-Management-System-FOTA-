// userPermission.js
const sequelize = require("./postgres");
// const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('./user.js');
const Permissions = require('./permissions.js');

// Define UserPermission model
const UserPermission = sequelize.define('UserPermission', { },{
  sequelize,
  modelName: 'UserPermission',
  tableName: 'UserPermission',
  timestamps: false,
});

// Establish associations
User.belongsToMany(Permissions, { through: UserPermission });
Permissions.belongsToMany(User, { through: UserPermission });



// // Sync the models with the database
// sequelize.sync({ force: false }) // Set force: true only for development; it drops existing tables
//   .then(() => {
//     console.log('Tables created and associations established');
//     const permissionsData = [
//           { permission: 'Add_new_inv_data' },
//           { permission: 'Edit_inv_data' },
//           { permission: 'See_all_data_analysis' },
//           { permission: 'Create_new_user' },
//           { permission: 'Add_Delete_field' },
//           { permission: 'See_Delete_users_data' }
//        ];
      
//        permissionsData.forEach(async (permission) => {
//           await Permissions.findOrCreate({
//             where: { permission: permission.permission },
//             defaults: permission,
//           });
//        });
      
//        const adminUser = {
//           first_name: 'Nashaat',
//           last_name: 'Youssef',
//           username: 'admin',
//           password: bcrypt.hashSync('admin', 10),
//        };

//        User.findOne({ where: { username: 'admin' } }).then((user) => {
//         if (!user) {
//             // User not found, create it or handle the situation as needed
//             console.log('User not found. Creating a new user...');
//             // Example of creating a new user
//             User.create(adminUser).then((newUser) => {
//                 Permissions.findAll().then((permissions) => {
//                     newUser.addPermissions(permissions).then(() => {
//                         console.log('Permissions added to the new user.');
//                     });
//                 });
//             });
      
//       //  User.findOrCreate({
//       //     where: { username: adminUser.username },
//       //     defaults: adminUser,
//       //  }).then(([user, created]) => {
//       //     console.log(user.get({ plain: true }));
//       //     console.log(created);
//       //  });

//       //  console.log(User.findOne({ where: { username: 'admin' } }));

      
//       //  User.findOne({ where: { username: 'admin' } }).then((user) => {
//       //   if (!user) {
//       //      // User not found, create it or handle the situation as needed
//       //      console.log('User not found. Creating a new user...');
//       //      // Example of creating a new user
//       //      User.create({
//       //        username: 'admin',
//       //        // Add other necessary fields here
//       //      }).then((newUser) => {
//       //        Permissions.findAll().then((permissions) => {
//       //          newUser.addPermissions(permissions).then(() => {
//       //            console.log('Permissions added to the new user.');
//       //          });
//       //        });
//       //      });
//         } else {
//            // User found, add permissions
//            Permissions.findAll().then((permissions) => {
//              user.addPermissions(permissions).then(() => {
//                console.log('Permissions added to the existing user.');
//              });
//            });
//         }
//        }).catch((error) => {
//         console.error('Error finding or creating user:', error);
//        });
//   })
//   .catch((err) => {
//     console.error('Error syncing tables:', err);
//   });

module.exports = UserPermission;