"use strict";

/**
 *  blue-sheet-event controller
 */

// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
const projectId = "the-blue-sheet";
const keyFilename = "~/google-credentials.json";

const storage = new Storage({ projectId, keyFilename });

// Makes an authenticated API request.
async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();

    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
}
listBuckets();

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
