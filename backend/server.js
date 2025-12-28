require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const dbConnection = require("./config/dbConnection");

const app = express();

/* =========================
   Route imports
========================= */
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

/* =========================
   Trust proxy (IMPORTANT for Nginx + rate limit)
========================= */
app.set("trust proxy", 1);

/* =========================
   Body parsers (FIRST)
========================= */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* =========================
   CORS
========================= */
const allowedOrigins = [
    "https://sixteensourcefoundation.com",
    "https://api.sixteensourcefoundation.com",
    "http://localhost:3000",
    "http://localhost:5173"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);

/* =========================
   Static files
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   Database
========================= */
dbConnection();

/* =========================
   Rate Limiter (API ONLY)
========================= */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,               // allow bulk uploads
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

// Apply limiter ONLY to API routes
app.use("/api", apiLimiter);

/* =========================
   Health / test route
========================= */
app.get("/test", (req, res) => {
    res.send("ok");
});

/* =========================
   API Routes
========================= */
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

/* =========================
   404 Handler
========================= */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not Found"
    });
});

/* =========================
   Error Handler
========================= */
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server Error";
    res.status(status).json({ success: false, message });
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* =========================
   Timeout for large uploads
========================= */
server.timeout = 600000; // 10 minutes
