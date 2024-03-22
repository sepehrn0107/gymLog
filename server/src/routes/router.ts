import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Dynamically import all route files
const routesPath = __dirname;
fs.readdirSync(routesPath).forEach((file) => {
  if (file.match(/\.ts$/) && file !== 'router.ts') { // skip non-typescript files and router.ts itself
    const route = require(path.join(routesPath, file));
    router.use(route.default);
  }
});

export default router;