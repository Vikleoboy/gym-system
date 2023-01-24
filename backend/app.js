import express from "express";
import cors from "cors";
import base64 from "base64-img";
import User from "./Scripts/User.js";
import Plans from "./Scripts/Plans.js";
import Product from "./Scripts/Product.js";

const app = express();
const port = 3002;

//  Middleware

const dataBaseLoc = "../Database";

const userFile = "/Users.json";
const productFile = "Product.json";

app.use(cors());
app.use(express.json());

app.get("/folder", (req, res) => {});

app.get("/data", async (req, res) => {
  const user = new User("../Database/User.json");
  await user.build();

  res.json(await user.data);

  await user.end();
});

app.get("/plandata", async (req, res) => {
  const plan = new Plans("../Database/Plans.json");
  await plan.build();

  res.json(await plan.data);

  await plan.end();
});

app.get("/prodata", async (req, res) => {
  const pro = new Product("../Database/Product.json");
  await pro.build();

  res.json(await pro.data);

  await pro.end();
});

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

app.post("/del", async (req, res) => {
  console.log("indel");
  const i = req.body.id;

  const user = new User("../Database/User.json");
  await user.build();
  await user.deleteUser(i);
  await user.end();
});

app.post("/plandel", async (req, res) => {
  console.log("indel");
  const i = req.body.id;

  const user = new Plans("../Database/Plans.json");
  await user.build();
  await user.deletePlan(i);
  await user.end();
});

app.post("/prodel", async (req, res) => {
  console.log("indel");
  const i = req.body.id;

  console.log(i);
  const user = new Product("../Database/Product.json");
  await user.build();
  await user.deletePro(i);
  await user.end();
});

app.post("/adduser", async (req, res) => {
  let data = req.body;
  let databasedir = "../Database/";
  let path = "images/";
  let name = data.name + data.ph_Number;

  // base64.img(
  //   data.profile_pic,
  //   `${databasedir + path + name} `,
  //   name,
  //   function (error, filepath) {
  //     console.log(error);
  //   }
  // );

  const user = new User("../Database/User.json");
  await user.build();
  await user.addUser(data);
  await user.end();
  res.send("done");
});

app.post("/addPlan", async (req, res) => {
  let data = req.body;
  console.log(data);
  const user = new Plans("../Database/Plans.json");
  await user.build();
  await user.addPlan(data);
  await user.end();
  res.send("done");
});

app.post("/addPro", async (req, res) => {
  let data = req.body;
  console.log(data);
  const pro = new Product("../Database/Product.json");
  await pro.build();
  await pro.addPro(data);
  await pro.end();
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
