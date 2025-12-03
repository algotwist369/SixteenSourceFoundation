require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./config/dbConnection");
const app = express();

const courseRoute = require("./routes/courseRoute");
const galleryRoute = require("./routes/galleryRoute");
const teamRoute = require("./routes/teamRoute");
const bankTransferRoute = require("./routes/bankTransferRoute");
const successStoriesRoute = require("./routes/successStoriesRoute");
const faqRoute = require("./routes/faqRoute");
const ourStoryRoute = require("./routes/ourStoryRoute");
const caseStudyRoute = require("./routes/caseStudyRoute");
const volunteerRoute = require("./routes/volunteerRoutes");
const heroRoute = require("./routes/heroRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dbConnection();

// Routes
app.use("/api/course", courseRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/team", teamRoute);
app.use("/api/bank-transfer", bankTransferRoute);
app.use("/api/success-stories", successStoriesRoute);
app.use("/api/faq", faqRoute);
app.use("/api/our-story", ourStoryRoute);
app.use("/api/case-study", caseStudyRoute);
app.use("/api/volunteer", volunteerRoute);
app.use("/api/hero", heroRoute);

app.use((req, res, next) => {
    if (req.path === '/test') {
        return res.send('ok');
    }
    next();
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

app.use((err, req, res, next) => {
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : "Server Error";
    res.status(status).json({ success: false, message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Trigger restart 2
