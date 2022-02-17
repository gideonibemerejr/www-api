const SheetsHelper = require("./sheets");

const columns = [
  { field: "staffPick", header: "Staff Pick?" },
  { field: "rsvpStatus", header: "RSVP Status" },
  { field: "name", header: "Event" },
  { field: "startTime", header: "Start Time" },
  { field: "endTime", header: "End Time" },
  { field: "startDate", header: "Start Date" },
  { field: "endDate", header: "End Date" },
  { field: "venue", header: "Venue" },
  { field: "freeDrinks", header: "Free Drinks" },
  { field: "freeFood", header: "Free Food" },
  { field: "notes", header: "Notes" },
];

module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    console.log(result);
  },
  afterUpdate(event) {
    const { result, params } = event;
    console.log(result);
  },
};
