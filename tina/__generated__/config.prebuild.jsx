// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "dev";
var config_default = defineConfig({
  branch: "dev",
  mode: "local",
  // Get this from tina.io
  // clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  // token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "_site"
  },
  media: {
    tina: {
      mediaRoot: "src/images",
      publicFolder: "_site"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "event",
        label: "Events",
        path: "src/content/events",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: false
          },
          {
            type: "string",
            name: "day",
            label: "Day",
            required: false
          },
          {
            type: "string",
            name: "locationName",
            label: "Location Name",
            required: false
          },
          {
            type: "string",
            name: "locationAddress",
            label: "Location Address",
            required: false
          },
          {
            type: "string",
            name: "locationCity",
            label: "Location City",
            required: false
          },
          {
            type: "string",
            name: "locationState",
            label: "Location State",
            required: false
          },
          {
            type: "string",
            name: "locationZip",
            label: "Location Zip",
            required: false
          },
          {
            type: "string",
            name: "bodyColor",
            label: "Body Color",
            required: false
          },
          {
            type: "string",
            name: "backgroundColor",
            label: "Background Color",
            required: false
          },
          {
            type: "string",
            name: "bodyFont",
            label: "Body Font",
            required: false
          },
          {
            type: "string",
            name: "title1Font",
            label: "Title 1 Font",
            required: false
          },
          {
            type: "string",
            name: "title2Font",
            label: "Title 2 Font",
            required: false
          },
          {
            type: "string",
            name: "title1Color",
            label: "Title 1 Color",
            required: false
          },
          {
            type: "string",
            name: "title2Color",
            label: "Title 2 Color",
            required: false
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: false
          },
          {
            type: "image",
            name: "map",
            label: "Map",
            required: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: false
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
