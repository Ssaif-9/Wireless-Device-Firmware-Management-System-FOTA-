const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure the AWS SDK with your S3 details
const s3 = new AWS.S3({
    endpoint: 'https://s3.sirv.com',
    accessKeyId: 'eng.yohannaayad@gmail.com',
    secretAccessKey: 'ubN04RjElrQUQqUBvDiBZzmczrkiqG1Q0lHooqyAh2FNHy4m',
    s3ForcePathStyle: true, // required for non-AWS S3 endpoints
    signatureVersion: 'v4',
    region: 'us-west-2',
    apiVersion: '2006-03-01',
    sslEnabled: true,
    httpOptions: {
        timeout: 0,
        agent: false,
    },
    maxRetries: 3,
    retryDelayOptions: {
        base: 1000,
    },
    s3BucketEndpoint: true,
    s3DisableBodySigning: false,
    s3UseArnRegion: false,
    computeChecksums: true,
    convertResponseTypes: true,
    correctClockSkew: true,
    customUserAgent: '',
    dynamoDbCrc32: true,
    systemClockOffset: 0,
    Statement: [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::johan22/*"
            ]
        }
    ]
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
            console.log(oldImageName)
            // Delete the existing image
            const deleteParams = {
                Bucket: bucketName,
                Key: oldImageName,
            };
            console.log(deleteParams)
            await s3.deleteObject(deleteParams).promise();
            console.log('deleted')
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
            console.log(uploadResult)
            // Return the reference link of the new image
            return uploadResult.Location;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to replace image');
        }
    }
};

module.exports = Sirv;