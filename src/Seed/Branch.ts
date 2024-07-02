import Database from "../Config/Database.ts";
import BranchModel from "../Model/BranchModel.ts";
import BranchCategoryModel from "../Model/BranchCategoryModel.ts";
import BoxTypeModel from "../Model/BoxTypesModel.ts";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sucursalesInfo = [
  {
    name: "Sucursal Centro",
    address: "Calle Principal 123, Ciudad Central",
    details: [
      {
        description:
          "Ubicada en el corazón de la ciudad, fácil acceso y amplio estacionamiento.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Cuenta con cajeros automáticos y asesoría personalizada.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Norte",
    address: "Avenida Libertad 456, Zona Norte",
    details: [
      {
        description:
          "Amplias instalaciones con áreas verdes y tecnología de punta.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description:
          "Espacio dedicado a la atención de clientes empresariales.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Sur",
    address: "Calle del Valle 789, Zona Sur",
    details: [
      {
        description: "Ideal para encuentros corporativos y eventos.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Servicio rápido y eficiente, pensado para el cliente.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Este",
    address: "Boulevard Oriente 101, Ciudad Este",
    details: [
      {
        description:
          "Una ubicación perfecta para clientes de la zona residencial.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Ofrece productos financieros avanzados.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Oeste",
    address: "Carrera Occidente 202, Ciudad Oeste",
    details: [
      {
        description: "Con un enfoque en sostenibilidad y energías renovables.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Punto de carga para vehículos eléctricos disponible.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Financiera",
    address: "Paseo de la Reforma 303, Distrito Financiero",
    details: [
      {
        description: "Asesoramiento en inversiones y seguros.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Atención prioritaria para inversionistas.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Playa",
    address: "Avenida Costera 404, Playa Hermosa",
    details: [
      {
        description:
          "Disfruta de una hermosa vista al mar mientras gestionas tus finanzas.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Servicios especiales de cambio de moneda para turistas.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Montaña",
    address: "Ruta Sierra 505, Valle Alto",
    details: [
      {
        description:
          "Ubicada en un ambiente tranquilo y fresco, lejos del bullicio de la ciudad.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Ofrece servicios especializados para empresas locales.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Parque Industrial",
    address: "Calle Industria 606, Zona Industrial",
    details: [
      {
        description:
          "Especializada en servicios para grandes corporaciones e industrias.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Capacitaciones y eventos para profesionales del sector.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
  {
    name: "Sucursal Puerto",
    address: "Calle del Valle 789, Zona Sur",
    details: [
      {
        description: "Ideal para encuentros corporativos y eventos.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
      {
        description: "Servicio rápido y eficiente, pensado para el cliente.",
        icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class=" mr-1" color="primaryDark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(23, 40, 50);"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg>',
      },
    ],
  },
];

const seedDatabaseBranch = async () => {
  await Database();

  await BranchModel.deleteMany({});

  const categories = await BranchCategoryModel.find({});
  const boxTypes = await BoxTypeModel.find({});

  for (let i = 0; i < 10; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const isRobotic = Math.random() < 0.5;

    const boxes = boxTypes
      .filter((boxType) => isRobotic === boxType.robotic)
      .map((boxType) => ({
        box_type_id: boxType._id,
        available: true,
        stock: 10,
        descriptions: [
          "ENTRAN HASTA 250.000 USD",
          "CABEN DOCUMENTOS HASTA TAMAÑO A4",
          "SEGURO ASOCIADO BRINDADO POR LÍDERES DE LA INDUSTRIA",
        ],
        old_price: 100,
        price: 90,
      }));

    await BranchModel.create({
      name: sucursalesInfo[i].name,
      address: sucursalesInfo[i].address,
      category: category._id,
      details: sucursalesInfo[i].details,
      robotic: isRobotic,
      primary_image: "DEFAULT-BRANCH/DEFAULT-BRANCH.svg",
      boxes: boxes,
    });
  }

  console.log("Sucursales sembradas con éxito");
};

export default seedDatabaseBranch;
