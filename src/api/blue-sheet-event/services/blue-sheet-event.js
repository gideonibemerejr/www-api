"use strict";
const SheetsHelper = require("../../../utils/sheets");
/**
 * blue-sheet-event service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::blue-sheet-event.blue-sheet-event",
  ({ strapi }) => ({
    async syncGoogleSheet() {
      try {
        const { sheets } = await SheetsHelper.authentication();
        const { data } = await sheets.spreadsheets.get({
          spreadsheetId: SheetsHelper.SPREADSHEET_ID,
        });

        const sheetId = await data.sheets?.[0].properties.sheetId;

        const events = await strapi.entityService.findMany(
          "api::blue-sheet-event.blue-sheet-event",
          {
            populate: "*",
          }
        );

        const sheetOperations = [
          SheetsHelper.buildHeaderRows(sheetId),
          ...SheetsHelper.getSyncRequest(data.spreadsheetId, sheetId, events),
        ];

        const request = {
          spreadsheetId: data.spreadsheetId,
          resource: {
            requests: sheetOperations,
          },
        };

        const sheet = await sheets.spreadsheets.batchUpdate(
          request,
          (error, res) => {
            if (error) {
              console.log(error);
            }
            return res;
          }
        );

        return sheet;
      } catch (error) {
        console.log(error);
      }
    },
  })
);
