const multer = require("multer");
const path = require("path");

console.log(path.join(__dirname, "../upload"), "");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../upload"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    }
});

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploadproducts"));
        console.log(path.join(__dirname, "../uploadproducts"), "+++++++++++++++++++++++++");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    }
});

// Define the upload variables properly
const upload = multer({ storage: storage });
const productUpload = multer({ storage: productStorage });

// Export correctly
module.exports = { upload, productUpload };
