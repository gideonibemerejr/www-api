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
      strapi.log.debug("CREATING");
      // Calling the default core action
      const response = await super.create(ctx);
      console.log(response);
      strapi.log.info("this is context", ctx);
      strapi.log.info("this is response", response);
      return response;
    },
    async update(ctx) {
      // some logic here
      const response = await super.update(ctx);
      // some more logic
      strapi.log.info("this is context", ctx);
      strapi.log("this is response", response);
      return response;
    },
  })
);
