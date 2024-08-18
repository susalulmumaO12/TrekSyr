const fs = require('fs');
const path = require("node:path");

exports.imageConvert = (images) => {
    for (let i = 0; i < images[0].length; i++) {
        if (images[0][i].image) {
            const imagePath = path.join(__dirname, images[0][i].image);
            try {
                const imageData = fs.readFileSync(imagePath); // Read the image file
                images[0][i].image = imageData.toString('base64'); // Convert to Base64
            } catch (error) {
                console.error(`Failed to read image at ${imagePath}:`, error);
                images[0][i].image = null; // or handle as needed
            }
        }
    }
    return images;
};

exports.p_imageConvert = (images) => {
    for (let i = 0; i < images[0].length; i++) {
        if (images[0][i].p_image) {
            const imagePath = path.join(__dirname, images[0][i].p_image);
            try {
                const imageData = fs.readFileSync(imagePath); // Read the image file
                images[0][i].p_image = imageData.toString('base64'); // Convert to Base64
            } catch (error) {
                console.error(`Failed to read image at ${imagePath}:`, error);
                images[0][i].p_image = null; // or handle as needed
            }
        }
    }
    return images;
};

