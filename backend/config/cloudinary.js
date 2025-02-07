
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


const uploadResumeToCloudinary = async (file) => {
    try {
        if (!file) {
            throw new Error('No file provided');
        }

        // Convert buffer to base64
        const fileStr = file.buffer.toString('base64');
        const fileType = file.mimetype;

      
        const uploadOptions = {
            resource_type: 'image', 
            folder: 'resumes',
            allowed_formats: ['pdf', 'doc', 'docx'],
            public_id: `resume_${Date.now()}`,
            tags: ['resume'],
            format: 'pdf',
            pages: true,
            flags: 'attachment',
            
            transformation: [
                { flags: "preserve_transparency" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ],
            // Keep your access control if needed
            access_mode: 'authenticated'
        };

        const uploadResponse = await cloudinary.uploader.upload(
            `data:${fileType};base64,${fileStr}`,
            uploadOptions
        );

        return {
            success: true,
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
            format: uploadResponse.format,
            created_at: uploadResponse.created_at,
            pages: uploadResponse.pages // Include number of pages if it's a PDF
        };
    } catch (error) {
        console.error('Resume upload to Cloudinary failed:', error);
        return {
            success: false,
            error: error.message || 'Failed to upload resume'
        };
    }
};

const uploadCompanyLogoToCloudinary = async (file) => {
    try {
        if (!file) {
            throw new Error('No logo file provided');
        }

        console.log('Received company logo:', {
            hasFile: !!file,
            fileProperties: file ? Object.keys(file) : null,
            mimetype: file?.mimetype,
            size: file?.size
        });

        const uploadOptions = {
            resource_type: 'image',
            folder: 'company_logos',
            allowed_formats: ['jpg', 'jpeg', 'png', 'svg'],
            public_id: `company_logo_${Date.now()}`,
            tags: ['company', 'logo'],
            transformation: [
                {
                    width: 400,
                    height: 400,
                    crop: 'fill',
                    gravity: 'center'
                },
                { quality: 'auto' },
                { fetch_format: 'auto' },
                { flags: 'preserve_transparency' }
            ],
            // Additional options for logos
            colors: true, // Extract dominant colors
            // background_removal: 'auto' // Optional: remove background if needed
        };

        let uploadResponse;

        // Handle different file upload methods
        if (file.tempFilePath) {
            console.log('Using tempFilePath for logo upload');
            uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, uploadOptions);
        } else if (file.path) {
            console.log('Using file path for logo upload');
            uploadResponse = await cloudinary.uploader.upload(file.path, uploadOptions);
        } else if (file.buffer) {
            console.log('Using buffer for logo upload');
            const fileStr = file.buffer.toString('base64');
            uploadResponse = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${fileStr}`,
                uploadOptions
            );
        } else if (file.data) {
            console.log('Using file data for logo upload');
            const fileStr = file.data.toString('base64');
            uploadResponse = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${fileStr}`,
                uploadOptions
            );
        } else {
            throw new Error('Unsupported file format for logo - received properties: ' + JSON.stringify(Object.keys(file)));
        }

        return {
            success: true,
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
            format: uploadResponse.format,
            created_at: uploadResponse.created_at,
            width: uploadResponse.width,
            height: uploadResponse.height,
            dominant_colors: uploadResponse.colors // If colors option is enabled
        };

    } catch (error) {
        console.error('Company logo upload to Cloudinary failed:', error);
        return {
            success: false,
            error: error.message || 'Failed to upload company logo'
        };
    }
};

module.exports = { uploadToCloudinary, uploadResumeToCloudinary, uploadCompanyLogoToCloudinary };