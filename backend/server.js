require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./config/dbConnection");
const app = express();

const courseRoute = require("./routes/coureRoute");
const galleryRoute = require("./routes/galleryRoute");
const teamRoute = require("./routes/teamRoute");
const bankTransferRoute = require("./routes/bankTransferRoute");
const successStoriesRoute = require("./routes/successStoriesRoute");
const faqRoute = require("./routes/faqRoute");
const ourStoryRoute = require("./routes/ourStoryRoute");
const caseStudyRoute = require("./routes/caseStudyRoute");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dbConnection();

// Routes
app.use("/course", courseRoute);
app.use("/gallery", galleryRoute);
app.use("/team", teamRoute);
app.use("/bank-transfer", bankTransferRoute);
app.use("/success-stories", successStoriesRoute);
app.use("/faq", faqRoute);
app.use("/our-story", ourStoryRoute);
app.use("/case-study", caseStudyRoute);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

app.use((err, req, res, next) => {
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : "Server Error";
    res.status(status).json({ success: false, message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
