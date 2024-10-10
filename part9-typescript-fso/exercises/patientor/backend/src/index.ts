import express from "express";
import diagnoses from "./routes/diagnosesRouter";
import patients from "./routes/patientRouter";
const app = express();
const port = 3001;

app.use(express.json());

app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here"); 
    res.send("pong");
});

app.use("/api/diagnoses", diagnoses);
app.use("/api/patients", patients); 

app.use("*", (_req, res) => {
    res.send("Error 404: Page not found.");
}); 

app.listen(port, () => console.log(`Server is up & running on port ${port}`));