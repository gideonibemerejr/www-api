"use strict";

/**
 *  blue-sheet-event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::blue-sheet-event.blue-sheet-event",
  ({ strapi }) => ({
    async create(ctx) {
      // some custom logic here

      // Calling the default core action
      const response = await super.create(ctx);

      return response;
    },
    async update(ctx) {
      // some logic here
      const response = await super.update(ctx);
      // some more logic

      return response;
    },
  })
);
