import seedDatabaseBoxType from "./BoxType.ts";
import seedDatabaseBranch from "./Branch.ts";
import seedDatabaseBranchCategory from "./Category.ts";

const seedDatabase = async () => {
  await seedDatabaseBoxType();

  await seedDatabaseBranchCategory();
  await seedDatabaseBranch();
};

seedDatabase().catch((error) => {
  console.error("Error sembrando la base de datos", error);
});
