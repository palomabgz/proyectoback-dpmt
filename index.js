import express from "express";
import routerProducto from "./router/routerProducto.js";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import routerBlog from "./router/routerBlog.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import routerAutor from "./router/routerAutor.js";
import { brotliMiddleware } from "./middleware/brotlimiddleware.js";
import routerUsuario from "./router/routerUsuario.js";
import { authMiddleware } from "./middleware/authmiddleware.js";
import { logger } from "./config/Winston.js";

env.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors(
  {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization","x-refresh-token"],
  }
));

app.use((req, res, next) => {
  logger.error(`${req.method} ${req.url}`);
  next();
});

/*app.use(
  compression({
    filter: (req, res) => {
      return compression.filter(req, res);
    },
    threshold: 1024, // Tamaño mínimo en bytes para comprimir (1 KB)
    level: 9, // Nivel de compresión (0-9, donde 9 es máxima compresión)
  })
);*/

/*app.use(
  compression({
      brotli: {
          enabled: true,
          zlib: zlib.constants.BROTLI_PARAM_QUALITY,
      },
  })
);*/

app.use("/productos", routerProducto);
app.use("/blogs", routerBlog);
app.use("/autores", routerAutor);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/auth", routerUsuario)

app.get("/protected",authMiddleware, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});

app.use((req, res) => {
  res.status(404).send("<h1>404<h1>");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
