import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTIONT_URL as string, {});
    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default Database;
