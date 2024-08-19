const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
      port: process.env.DB_PORT || 5432,
      logging: console.log, // for debugging
    }
  );
}

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
