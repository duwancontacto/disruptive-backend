import Database from "../Config/Database.ts";
import BoxTypeModel from "../Model/BoxTypesModel.ts";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env" });

const seedDatabaseBoxType = async () => {
  await Database();

  await BoxTypeModel.deleteMany({});

  const boxTypes = [
    {
      name: "Chica",
      robotic: false,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Mediana",
      robotic: false,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Grande",
      robotic: false,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Chica",
      robotic: true,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Mediana",
      robotic: true,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Grande",
      robotic: true,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
    {
      name: "Extra Grande",
      robotic: true,
      primary_image: "DEFAULT-BOX/DEFAULT-BOX.svg",
    },
  ];

  for (const boxType of boxTypes) {
    await BoxTypeModel.create(boxType);
  }

  console.log("Tipos de cajas sembrados con éxito");
};

export default seedDatabaseBoxType;
