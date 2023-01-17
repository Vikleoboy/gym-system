import express from "express";
import cors from "cors";
import base64 from "base64-img";
import User from "./Scripts/User.js";

const app = express();
const port = 3002;

//  Middleware

const dataBaseLoc = "../Database";

const userFile = "/Users.json";
const productFile = "Product.json";

app.use(cors());
app.use(express.json());

app.get("/folder", (req, res) => {});

app.post("/dimage", (req, res) => {
  let databasedir = "../Database/";
  let path = "images/";
  let name = data.name + data.ph_Number + ".jpg";
  console.log(req.body.url);
  base64.img(
    req.body.url,
    `${databasedir + path + name} `,
    "1",
    function (error, filepath) {
      console.log(error);
    }
  );
});

app.post("/adduser", async (req, res) => {
  console.log(req.body);
  console.log("  u are at user ");

  let data = req.body;
  let databasedir = "../Database/";
  let path = "images/";
  let name = data.name + data.ph_Number;

  base64.img(
    data.profile_pic,
    `${databasedir + path + name} `,
    name,
    function (error, filepath) {
      console.log(error);
    }
  );

  data.profile_pic = `${databasedir + path + name} `;

  const user = new User("../Database/User.json");
  await user.build();
  await user.addUser(data);
  await user.end();
  res.send("done");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
