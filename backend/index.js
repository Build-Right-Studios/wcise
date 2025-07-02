const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "uploaded-pdfs",
//         resource_type: "raw",
//         type: "upload",
//         format: async (req, file) => "pdf",
//         public_id: (req, file) => Date.now() + '-' + file.originalname
//     }
// });

// const upload = multer({ storage });

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
    res.send("Hello from server.");
});

app.post('/author/new-paper', upload.single("pdf"), (req, res) => {
    try {
        const { title, abstract, selectkeytags } = req.body;
        const pdfUrl = req.file.path;


        console.log("Title:", title);
        console.log("Abstract:", abstract);
        console.log("Key Tags:", selectkeytags);
        console.log("PDF URL:", pdfUrl);


        if (title && abstract && selectkeytags && pdfUrl) {
            return res.status(200).json({
                success: true,
                message: "New paper uploaded successfully!",
                data: { title, abstract, selectkeytags, pdf: pdfUrl }
            });
        } else {

            return res.status(400).json({
                success: false,
                message: "Missing required fields (title, abstract, key tags, or PDF)."
            });
        }
    } catch (err) {

        console.error("ERROR in /author/new-paper:", err);
        res.status(500).json({ success: false, message: "Server error during new paper upload", error: err.message });
    }
});


app.post('/author/paper-details', upload.single("pdf"), async (req, res) => {
    try {
        console.log("Received req.body:", req.body);
        console.log("Received req.file:", req.file);

        if (Object.keys(req.body).length === 0 && !req.file) {
            console.error("ERROR: req.body is empty and no file received.");
            return res.status(400).json({
                success: false,
                message: "No data or file received. Please check your client-side form submission."
            });
        }

        const { abstract } = req.body;
        const pdfUrl = req.file.path; // 🔥 Already uploaded by multer-storage-cloudinary

        // console.log("Abstract:", abstract);
        // console.log("PDF URL:", pdfUrl);

        if (abstract && pdfUrl) {
            return res.status(200).json({
                success: true,
                message: "Paper details uploaded successfully!",
                data: { abstract, pdf: pdfUrl }
            });
        } else {
            let missingFields = [];
            if (!abstract) missingFields.push("abstract");
            if (!pdfUrl) missingFields.push("PDF");

            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(" and ").replace(" and PDF", " or PDF")}.`,
                details: {
                    receivedBody: req.body,
                    receivedFile: req.file ? {
                        originalname: req.file.originalname,
                        mimetype: req.file.mimetype,
                        size: req.file.size
                    } : null
                }
            });
        }
    } catch (err) {
        console.error("ERROR in /author/paper-details:", err);
        res.status(500).json({ success: false, message: "Server error during paper details upload", error: err.message });
    }
});



app.listen(8000, () => {
    console.log("Server Running on http://localhost:8000");
});
