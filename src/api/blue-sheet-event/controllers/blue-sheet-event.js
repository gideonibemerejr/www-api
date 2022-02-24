"use strict";

/**
 *  blue-sheet-event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::blue-sheet-event.blue-sheet-event",
  ({ strapi }) => ({
    // Method 2: Wrapping a core action (leaves core logic in place)
    async create(ctx) {
      // some logic here
      const response = await super.create(ctx);
      // some more logic
      const googleSheet = await strapi
        .service("api::blue-sheet-event.blue-sheet-event")
        .syncGoogleSheet();

      return { response, googleSheet };
    },
  })
);
