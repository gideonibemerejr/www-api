module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users-export",
      handler: "users-export.getExport"add,
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
