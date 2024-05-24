import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Resource, Database } from "@adminjs/mongoose";
import CategoryModel from "../Model/CategoryModel.ts";
import ContentModel from "../Model/ContentModel.ts";

import ThemeModel from "../Model/ThemeModel.ts";
import UserModel from "../Model/UserModel.ts";

AdminJS.registerAdapter({
  Resource,
  Database,
});

const adminJsOptions = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: CategoryModel,
    },
    {
      resource: ThemeModel,
    },

    {
      resource: ContentModel,
    },
    {
      resource: UserModel,
      options: {
        id: "Users",
        parent: {
          name: "Authentication",
          icon: "User",
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
            isAccessible: false,
          },
          bulkDelete: {
            isAccessible: false,
          },
        },
      },
    },
  ],
});

const AdminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJsOptions, {
  authenticate: async (email, password) => {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    )
      return {
        redirectUrl: "/admin",
        user: { email: process.env.ADMIN_EMAIL },
      };

    return null;
  },
  cookiePassword: "session-secret",
});

export default {
  AdminRouter,
  AdminBroRootPath: adminJsOptions.options.rootPath,
};
