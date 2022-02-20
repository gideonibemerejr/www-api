// const { google } = require("googleapis");
// const { OAuth2Client } = require("google-auth-library");
// const util = require("util");

// /**
//  * Create a new Sheets helper.
//  * @constructor
//  */

// const SheetsHelper = async function () {
//   const auth = await google.auth.getClient({
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });
//   this.service = google.sheets({
//     version: "v4",
//     auth,
//   });
// };

// module.exports = SheetsHelper;

// /**
//  * Create a spreadsheet with the given name.
//  * @param  {string}   title    The name of the spreadsheet.
//  * @param  {Function} callback The callback function.
//  */

// SheetsHelper.prototype.createSpreadsheet = function (title, callback) {
//   const self = this;
//   const request = {
//     resource: {
//       properties: {
//         title: title,
//       },
//       sheets: [
//         {
//           properties: {
//             title: "Master List",
//             gridProperties: {
//               columnCount: 11,
//               frozenRowCount: 1,
//             },
//           },
//         },
//         // TODO: Add more sheets.
//       ],
//     },
//   };
//   self.service.spreadsheets.create(request, function (err, response) {
//     if (err) {
//       return callback(err);
//     }
//     const spreadsheet = response.data;
//     // TODO: Add header rows.
//     return callback(null, spreadsheet);
//   });
// };
