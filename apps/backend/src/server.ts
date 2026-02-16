// src/server.ts
// src/server.ts

import { app } from "./app";
import { connectMongo } from "./infrastructure/config/mongo";

const PORT = 3000;

const startServer = async () => {
  try {
    if (process.env.DB_TYPE === "mongo") {
      await connectMongo();
    }

    app.listen(PORT, () => {
      console.log(`🐾 Petly backend running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
