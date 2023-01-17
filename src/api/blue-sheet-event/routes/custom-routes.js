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
  ],
};
