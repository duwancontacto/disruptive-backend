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
      robotic: true,
      primary_image: "DEFAULT-BOX/1.png",
    },
    {
      name: "Mediana",
      robotic: true,
      primary_image: "DEFAULT-BOX/2.png",
    },
    {
      name: "Grande",
      robotic: true,
      primary_image: "DEFAULT-BOX/3.png",
    },
    {
      name: "Chica",
      robotic: false,
      primary_image: "DEFAULT-BOX/4.png",
    },
    {
      name: "Mediana",
      robotic: false,
      primary_image: "DEFAULT-BOX/5.png",
    },
    {
      name: "Grande",
      robotic: false,
      primary_image: "DEFAULT-BOX/6.png",
    },
    {
      name: "Extra Grande",
      robotic: false,
      primary_image: "DEFAULT-BOX/7.png",
    },
  ];

  for (const boxType of boxTypes) {
    await BoxTypeModel.create(boxType);
  }

  console.log("Tipos de cajas sembrados con éxito");
};

export default seedDatabaseBoxType;
