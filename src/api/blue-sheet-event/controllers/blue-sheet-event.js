"use strict";

/**
 *  blue-sheet-event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::blue-sheet-event.blue-sheet-event",
  ({ strapi }) => ({
    async syncGoogle(ctx) {
      try {
        const response = await strapi
          .service("api::blue-sheet-event.blue-sheet-event")
          .syncGoogleSheet();
        console.log(response);
        ctx.send(response);
      } catch (error) {
        ctx.badRequest(error);
      }
    },
    async updateEvent(ctx) {
      try {
        const response = await strapi
          .service("api::blue-sheet-event.blue-sheet-event")
          .updateBlueSheetEvents(ctx.request.body);

        ctx.send(response);
      } catch (error) {
        ctx.badRequest(error);
      }
    },
  })
);
