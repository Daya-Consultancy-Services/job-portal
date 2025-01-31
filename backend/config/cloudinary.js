
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (file) => {
    try {
        if (!file) {
            console.error('No file provided');
            return null;
        }

        // Convert buffer to base64
        const fileStr = file.buffer.toString('base64');
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${fileStr}`,
            {
                upload_preset: 'profile_images', // Ensure this preset exists in Cloudinary
            }
        );

        console.log('Upload response:', uploadResponse);
        return uploadResponse.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadToCloudinary };
  
 