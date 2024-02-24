const fs = require("fs").promises;
module.exports.handler = async (event) => {
  console.log(event);

  const response = { statusCode: 200 };
  const filePath = "./data.json";
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    response.body = JSON.stringify(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
