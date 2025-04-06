import express from 'express';
import fs from 'fs';
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();




const port = process.env.PORT || 8001

//app
const app = express();

connectDB();

//middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({limit : "2mb"}));
app.use(cors());

// Sync load all routes from routes folder
const routesPath = path.join(__dirname , "./routes");


(async () => {
    const files = fs.readdirSync(routesPath);
    for (const file of files) {
      const routeModule = await import(`./routes/${file}`);
      app.use('/api', routeModule.default);
    }
  
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })();


