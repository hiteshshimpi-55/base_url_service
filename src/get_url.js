const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const objectKey = "data.json";

module.exports.handler = async (event) => {
  console.log(event);

  const response = { statusCode: 200 };
  try {
    const s3Object = await s3
      .getObject({
        Bucket: BUCKET_NAME,
        Key: objectKey,
      })
      .promise();
    const data = JSON.parse(s3Object.Body.toString());

    response.body = JSON.stringify(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
