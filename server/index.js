import express from "express";

import authRoute from "./routes/auth.js";
import categoriesRoute from "./routes/categories.js";
import searchRoute from "./routes/search.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/search", searchRoute);

// error handling
app.use((e, req, res, next) => {
    const errStatus = e.status || 500;
    const errMsg = e.message || "Something went wrong";

    return res.status(errStatus).json(errMsg);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});