"use strict";

/**
 *  spreadsheet controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::spreadsheet.spreadsheet",
  ({ strapi }) => ({
    async create(ctx) {
      // some custom logic here
      console.log(ctx);

      // Calling the default core action
      const { data, meta } = await super.find(ctx);

      // some more custom logic
      meta.date = Date.now();

      return { data, meta };
    },
  })
);
