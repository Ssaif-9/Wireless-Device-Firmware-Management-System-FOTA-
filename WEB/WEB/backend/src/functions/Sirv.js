const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure the AWS SDK with your S3 details
const s3 = new AWS.S3({
    endpoint: 'https://s3.sirv.com',
    accessKeyId: 'eng.yohannaayad@gmail.com',
    secretAccessKey: 'ubN04RjElrQUQqUBvDiBZzmczrkiqG1Q0lHooqyAh2FNHy4m',
    s3ForcePathStyle: true, // required for non-AWS S3 endpoints
    signatureVersion: 'v4'
});

const bucketName = 'johan22';

const Sirv = {
    uploadImage: async (image) => {
        try {
            const uuid = uuidv4();
            const params = {
                Bucket: bucketName,
                Key: uuid,
                Body: image,
                ContentType: 'image/jpeg', // Adjust this if the image format is different
                ACL: 'public-read',
            };

            const uploadResult = await s3.upload(params).promise();
            return uploadResult.Location;
        } catch (e) {
            console.error(e);
            throw new Error('Failed to upload image');
        }
    },
    replaceImage: async (oldImageUrl, newImage) => {
        try {
            const oldImageName = oldImageUrl.split('/').pop();

            // Delete the existing image
            const deleteParams = {
                Bucket: bucketName,
                Key: oldImageName,
            };

            await s3.deleteObject(deleteParams).promise();
            // Upload the new image
            const uuid = uuidv4();
            const uploadParams = {
                Bucket: bucketName,
                Key: uuid,
                Body: newImage,
                ContentType: 'image/jpeg', // Adjust this if the image format is different
                ACL: 'public-read',
            };

            const uploadResult = await s3.upload(uploadParams).promise();

            // Return the reference link of the new image
            return uploadResult.Location;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to replace image');
        }
    }
};

module.exports = Sirv;

