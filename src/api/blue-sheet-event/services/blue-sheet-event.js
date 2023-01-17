"use strict";
const SheetsHelper = require("../../../utils/sheets");
const _ = require("lodash");
const moment = require("moment");
/**
 * blue-sheet-event service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::blue-sheet-event.blue-sheet-event",
  ({ strapi }) => ({
    async syncGoogleSheet() {
      // if (process.env.NODE_ENV === "development") return;
      try {
        const { sheets } = await SheetsHelper.authentication();
        // const { data: sheetData } = await sheets.spreadsheets.get({
        //   spreadsheetId: SheetsHelper.SPREADSHEET_ID,
        // });

        // const sheetId = await sheetData.sheets.[0].properties.sheetId;

        // const events = await strapi.entityService.findMany(
        //   "api::blue-sheet-event.blue-sheet-event",
        //   {
        //     populate: "*",
        //   }
        // );

        // const sheetOperations = [
        //   SheetsHelper.buildHeaderRows(sheetId),
        //   ...SheetsHelper.getSyncRequest(data.spreadsheetId, sheetId, events),
        // ];

        // const request = {
        //   spreadsheetId: data.spreadsheetId,
        //   resource: {
        //     requests: sheetOperations,
        //   },
        // };

        // const sheet = await sheets.spreadsheets.batchUpdate(
        //   request,
        //   (error, res) => {
        //     if (error) {
        //       console.log(error);
        //     }
        //     return res;
        //   }
        // );

        // console.log("THE RESPONSE", dates);
        // console.log("THE RESPONSE 2", events);
        //

        const headersRequest = {
          spreadsheetId: "1B7dzeuZmdqjWzQVuHoyyI11Zr1bmF2rwoLBXc08caKM",
          dateTimeRenderOption: "FORMATTED_STRING",
          majorDimension: "ROWS",
          ranges: ["'Fri, Mar 11'!A3:I3"],
          valueRenderOption: "FORMATTED_VALUE",
        };

        const headersResponse = await sheets.spreadsheets.values.batchGet(
          headersRequest
        );

        const headersData = await headersResponse.data;

        const getAllRequest = {
          spreadsheetId: "1B7dzeuZmdqjWzQVuHoyyI11Zr1bmF2rwoLBXc08caKM",
          ranges: [
            "'Fri, Mar 11'!A4:I",
            "'Sat, Mar 12'!A4:I",
            "'Sun, Mar 13'!A4:I",
            "'Mon, Mar 14'!A4:I",
            "'Tues, Mar 15'!A4:I",
            "'Wed, Mar 16'!A4:I",
            "'Thurs, Mar 17'!A4:I",
            "'Fri, Mar 18'!A4:I",
            "'Sat, Mar 19'!A4:I",
            "'Sun, Mar 20'!A4:I",
          ],
          includeGridData: true,
        };

        const { data } = await sheets.spreadsheets.get(getAllRequest);
        const theSheets = await data.sheets
          .map((sheet) => {
            const newRowData = sheet.data[0].rowData.map((row) => {
              let newItem = {
                blueSheet: [2],
              };

              row.values.forEach((item, index) => {
                switch (index) {
                  case 0:
                    newItem.staffPick = item.formattedValue ? true : false;
                  case 1:
                    newItem.name = item.formattedValue;
                    break;
                  case 2: {
                    if (
                      item.formattedValue === "TBA" ||
                      item.formattedValue === "Late"
                    ) {
                      newItem.startTime = "Invalid Date";
                    } else {
                      newItem.startTime = moment(
                        item.formattedValue,
                        "h:mm A"
                      ).format("HH:mm:ss.SSS");
                    }

                    break;
                  }

                  case 3: {
                    if (
                      item.formattedValue === "TBA" ||
                      item.formattedValue === "Late"
                    ) {
                      newItem.endTime = "Invalid Date";
                    } else {
                      newItem.endTime = moment(
                        item.formattedValue,
                        "h:mm A"
                      ).format("HH:mm:ss.SSS");
                    }

                    break;
                  }
                  case 4:
                    newItem.venue = item.formattedValue;
                    break;
                  case 5:
                    newItem.address = item.formattedValue;
                    break;
                  case 6:
                    newItem.freeDrinks = item.formattedValue ? true : false;
                    break;
                  case 7:
                    newItem.freeFood = item.formattedValue ? true : false;
                    break;
                  case 8:
                    newItem.notes = item.formattedValue;
                  default:
                    break;
                }

                if (item.hyperlink) {
                  newItem.link = item.hyperlink;
                }

                newItem.startDate = moment(
                  sheet.properties.title,
                  "ddd, MMM D"
                ).format("YYYY-MM-DD");

                newItem.startTime === "Invalid Date" &&
                  delete newItem.startTime;

                newItem.endTime === "Invalid Date" && delete newItem.endTime;
              });

              return newItem;
            });

            return newRowData;
          })
          .flat();
        const deleted = await strapi.db
          .query("api::blue-sheet-event.blue-sheet-event")
          .deleteMany({});

        const response = await strapi.db
          .query("api::blue-sheet-event.blue-sheet-event")
          .createMany({
            data: theSheets,
          });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
  })
);
