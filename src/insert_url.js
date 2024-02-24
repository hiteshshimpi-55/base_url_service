const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;
const objectKey = "data.json";
module.exports.handler = async (event) => {
  console.log(event);

  const response = { statusCode: 200 };
  const url = JSON.parse(event.body).url;
  try {
    const data = {
      base_url: url,
    };
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: JSON.stringify(data),
      })
      .promise();
    console.log("File uploaded to S3 successfully");

    response.body = JSON.stringify(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
