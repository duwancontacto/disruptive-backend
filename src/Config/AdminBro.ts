import AdminJS from "adminjs";
import { componentLoader } from "./AdminComponents/ComponentLoader.ts";
import AdminJSExpress, { name } from "@adminjs/express";
import { Resource, Database } from "@adminjs/mongoose";
import BranchModel from "../Model/BranchModel.ts";
import CustomerModel from "../Model/CustomerModel.ts";
import uploadFeature from "@adminjs/upload";

import BoxTypesModel from "../Model/BoxTypesModel.ts";
import OrderModel from "../Model/OrderModel.ts";
import BranchCategoryModel from "../Model/BranchCategoryModel.ts";

AdminJS.registerAdapter({
  Resource,
  Database,
});

const adminJsOptions = new AdminJS({
  rootPath: "/admin",
  componentLoader,

  resources: [
    {
      resource: BranchModel,
      options: {
        properties: {
          _id: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },

          primary_image: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
        },
      },
      features: [
        uploadFeature({
          componentLoader,
          provider: { local: { bucket: "public", opts: {} } },
          properties: {
            key: "primary_image",
            file: "image",
          },
          validation: { mimeTypes: ["image/png"] },
        }),
      ],
    },

    {
      resource: BranchCategoryModel,
      options: {
        properties: {
          _id: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
        },
      },
    },

    {
      resource: BoxTypesModel,
      options: {
        properties: {
          _id: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
          primary_image: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
        },
      },
      features: [
        uploadFeature({
          componentLoader,
          provider: { local: { bucket: "public", opts: {} } },
          properties: {
            key: "primary_image",
            file: "image",
          },
          validation: { mimeTypes: ["image/png"] },
        }),
      ],
    },
    {
      resource: OrderModel,
      options: {
        properties: {
          _id: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
        },
        parent: {
          name: "Purchases",
          icon: "Users",
        },
        actions: {
          new: {
            isAccessible: false,
          },
          edit: {
            isAccessible: false,
          },
          delete: {
            isAccessible: false,
          },
          show: {
            isAccessible: true,
          },
          bulkDelete: {
            isAccessible: false,
          },
        },
      },
    },
    {
      resource: CustomerModel,
      options: {
        properties: {
          _id: {
            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: false,
              create: false,
            },
          },
        },
        parent: {
          name: "Purchases",
          icon: "Users",
        },
        actions: {
          new: {
            isAccessible: false,
          },
          edit: {
            isAccessible: false,
          },
          delete: {
            isAccessible: false,
          },
          show: {
            isAccessible: true,
          },
          bulkDelete: {
            isAccessible: false,
          },
        },
      },
    },
  ],
});
adminJsOptions.watch();
const AdminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJsOptions, {
  authenticate: async (email, password) => {
    /*  if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) */
    return {
      redirectUrl: "/admin",
      user: { email: process.env.ADMIN_EMAIL },
    };

    /*   return null; */
  },
  cookiePassword: "session-secret",
});

export default {
  AdminRouter,
  AdminBroRootPath: adminJsOptions.options.rootPath,
};
