const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.listen(4003, () => {
  console.log("Moderation server is running on port : 4003");
});
