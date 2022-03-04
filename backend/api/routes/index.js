const { applyStrategies } = require("../middleware/passport");
const { respondWithError } = require("../lib/request");

const accountRoutes = require("./account");
const administrationRoutes = require("./administration");
const authRoutes = require("./authentication");
const curriculumRoutes = require("./curriculum");
const deviceRoutes = require("./devices");
const userRoutes = require("./users");
const testRoutes = require("./tests");


function configureRoutes(apiRoutes) {
  // Apply passport strategies
  applyStrategies();

  apiRoutes.use("/accounts", accountRoutes);
  apiRoutes.use("/administration", administrationRoutes);
  apiRoutes.use("/authentication", authRoutes);
  apiRoutes.use("/curriculum", curriculumRoutes);
  apiRoutes.use("/devices", deviceRoutes);
  apiRoutes.use("/testing", testRoutes);
  apiRoutes.use("/users", userRoutes);
  apiRoutes.use("/", (err, req, res, next) => {
    respondWithError(res, err);
  });
}
module.exports = {
  configureRoutes,
};
