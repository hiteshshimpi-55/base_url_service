const fs = require("fs").promises;
module.exports.handler = async (event) => {
  console.log(event);

  const response = { statusCode: 200 };
  const url = JSON.parse(event.body).url;
  const filePath = "./data.json";
  try {
    const updatedData = {
      base_url: url,
    };

    await fs.truncate(filePath, 0);
    await fs.writeFile(filePath, JSON.stringify(updatedData));
    response.body = JSON.stringify(updatedData);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.body = JSON.stringify(error);
  }

  return response;
};
