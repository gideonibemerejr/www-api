module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/sync",
      handler: "api::blue-sheet-event.blue-sheet-event.syncGoogle",
      config: {
        policies: [],
      },
    },
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/update-events",
      handler: "api::blue-sheet-event.blue-sheet-event.updateEvent",
      config: {
        policies: [],
      },
    },
  ],
};
