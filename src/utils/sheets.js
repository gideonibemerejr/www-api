const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const moment = require("moment");

const COLUMNS = [
  {
    field: "staffPick",
    header: "Staff Pick?",
  },
  {
    field: "name",
    header: "Event",
  },
  {
    field: "rsvpStatus",
    header: "RSVP Status",
  },
  {
    field: "price",
    header: "Price",
  },
  {
    field: "venue",
    header: "Venue",
  },
  {
    field: "startDate",
    header: "Start Date",
  },
  {
    field: "endDate",
    header: "End Date",
  },
  {
    field: "startTime",
    header: "Start Time",
  },
  {
    field: "endTime",
    header: "End Time",
  },
  {
    field: "isAllWeek",
    header: "All Week?",
  },
  {
    field: "freeDrinks",
    header: "Free Drinks?",
  },
  {
    field: "freeFood",
    header: "Free Food?",
  },
  {
    field: "notes",
    header: "Notes",
  },
  {
    field: "id",
    header: "ID",
  },
];
const SPREADSHEET_ID = "1jg5f_DoXwt5y78csCX4VpUcsdDNyuIvWtyHX5kFk0pI";

const authentication = async () => {
  const auth = new GoogleAuth({
    keyFile: "google-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return { sheets };
};

const buildHeaderRows = (sheetId) => {
  const cells = COLUMNS.map((column) => ({
    userEnteredValue: {
      stringValue: column.header,
    },
    userEnteredFormat: {
      textFormat: {
        bold: true,
      },
    },
  }));

  return {
    updateCells: {
      start: {
        sheetId,
        rowIndex: 4,
        columnIndex: 0,
      },
      rows: [
        {
          values: cells,
        },
      ],
      fields: "userEnteredValue,userEnteredFormat.textFormat.bold",
    },
  };
};

const buildRowsForEvents = (events) => {
  return events.map((event) => {
    const cells = COLUMNS.map((column) => {
      switch (column.field) {
        case "name":
          return {
            userEnteredValue: {
              formulaValue: `=HYPERLINK("${event.link}","${event.name}")`,
            },
          };
        case "staffPick":
        case "freeDrinks":
        case "freeFood":
        case "isAllWeek":
          return {
            userEnteredValue: {
              stringValue: event[column.field] === true ? "Yes" : "No",
            },
          };
          break;
        case "rsvpStatus":
          {
            return {
              userEnteredValue: {
                stringValue: event.rsvpStatus.status,
              },
              dataValidation: {
                condition: {
                  type: "ONE_OF_LIST",
                  values: [
                    { userEnteredValue: "open" },
                    { userEnteredValue: "not_open" },
                    { userEnteredValue: "open_with_price" },
                    { userEnteredValue: "waitlist" },
                    { userEnteredValue: "access_code" },
                    { userEnteredValue: "password" },
                    { userEnteredValue: "email_to_rsvp" },
                    { userEnteredValue: "sold_out" },
                    { userEnteredValue: "other" },
                  ],
                },
                strict: true,
                showCustomUi: true,
              },
            };
          }

          break;
        case "endDate":
        case "startDate":
          return {
            userEnteredValue: {
              stringValue: moment(event[column.field]).format("MMMM Do"),
            },
          };
          break;
        case "startTime":
        case "endTime":
          return {
            userEnteredValue: {
              stringValue: moment(event[column.field], "HH:mm:ss").format(
                "h:mm A"
              ),
            },
          };
        case "price":
          return event.rsvpStatus.price !== null
            ? {
                userEnteredValue: {
                  stringValue: event.rsvpStatus.price,
                },
              }
            : {
                userEnteredValue: {
                  stringValue: "N/A",
                },
              };
          break;
        default:
          return {
            userEnteredValue: {
              stringValue: event[column.field].toString(),
            },
          };
      }
    });
    return {
      values: cells,
    };
  });
};

const getSyncRequest = (spreadsheetId, sheetId, events, callback) => {
  let requests = [];
  // Resize the sheet
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId: sheetId,
        gridProperties: {
          rowCount: 1000,
          columnCount: COLUMNS.length,
        },
      },
      fields: "gridProperties(rowCount,columnCount)",
    },
  });

  // Set the cell values
  requests.push({
    updateCells: {
      start: {
        sheetId: sheetId,
        rowIndex: 5,
        columnIndex: 0,
      },
      rows: buildRowsForEvents(events),
      fields: "*",
    },
  });

  // return the request
  return requests;
};

module.exports = {
  authentication,
  SPREADSHEET_ID,
  buildHeaderRows,
  getSyncRequest,
};
