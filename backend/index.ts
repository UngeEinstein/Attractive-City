import express from "express";
import carouselRouter from "./routes/carousel";
import experiencesRouter from "./routes/experiences";
import groupsRouter from "./routes/group";
import userRouter from "./routes/user";
import cors from "cors";

export const app = express();
export const port = 3001;
const allowedOrigins = [
  "https://ac-testenv-328009.firebaseapp.com",
  "https://ac-testenv-328009.web.app",
  "https://attractive-city.firebaseapp.com",
  "https://attractive-city.web.app",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Allow Cross-Origin Resource Sharing
app.use(cors(options));
// Parse json body
app.use(express.json());
// Route all matching request to carouselRouter
app.use("/api/carousel", carouselRouter);

app.use("/api/experiences", experiencesRouter);

app.use("/api/groups", groupsRouter);

app.use("/api/user", userRouter);

export const server = app.listen(port, () => {
  console.log(
    `\nAttractive city back-end API is listening at http://localhost:${port}\n`
  );
});
