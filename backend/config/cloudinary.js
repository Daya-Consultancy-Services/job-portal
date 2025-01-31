

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (file) => {
    try {
        // Debug logging
        console.log('Received file object:', {
            hasFile: !!file,
            fileProperties: file ? Object.keys(file) : null,
            tempFilePath: file?.tempFilePath,
            mimetype: file?.mimetype,
            size: file?.size
        });

        if (!file) {
            console.error('No file provided');
            return null;
        }

        const uploadOptions = {
            resource_type: 'auto',
            folder: 'profile_images', // This will create a folder in your Cloudinary account
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Optional: restrict file types
            transformation: { // Optional: you can add image transformations
                width: 500,
                height: 500,
                crop: 'limit'
            }
        };

        let uploadResponse;

        // For express-fileupload
        if (file.tempFilePath) {
            console.log('Using tempFilePath for upload');
            uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, uploadOptions);
        }
        // For multer
        else if (file.path) {
            console.log('Using file path for upload');
            uploadResponse = await cloudinary.uploader.upload(file.path, uploadOptions);
        }
        // For raw data
        else if (file.data) {
            console.log('Using file data for upload');
            const fileStr = file.data.toString('base64');
            uploadResponse = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${fileStr}`,
                uploadOptions
            );
        }
        else {
            throw new Error('File format not supported - received file properties: ' + JSON.stringify(Object.keys(file)));
        }

        console.log('Upload successful:', uploadResponse.secure_url);
        return uploadResponse.secure_url;

    } catch (error) {
        console.error('Detailed upload error:', error);
        throw error;
    }
};

module.exports = { uploadToCloudinary };