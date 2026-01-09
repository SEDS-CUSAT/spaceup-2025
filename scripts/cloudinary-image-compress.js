const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
    api_key: process.env.CLOUDINARY_API_KEY || 'YOUR_API_KEY',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'YOUR_API_SECRET'
});

/**
 * Uploads and compresses an image using Cloudinary
 * @param {string} imagePath - Local path or URL to the image
 */
const compressImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            resource_type: 'image',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });

        console.log('Original Size:', result.bytes, 'bytes');
        console.log('Compressed URL:', result.secure_url);
        console.log('Full Result:', result);
        
        return result.secure_url;
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};

compressImage('./public/BG.jpg');