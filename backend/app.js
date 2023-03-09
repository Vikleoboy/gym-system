import express from "express";
import cors from "cors";
import base64 from "base64-img";
import User from "./Scripts/User.js";
import Plans from "./Scripts/Plans.js";
import Product from "./Scripts/Product.js";
import easyinvoice from "easyinvoice";
import Text from "./Scripts/Text.js";
import bodyParser from "body-parser";

const app = express();
const port = 3002;

//  Middleware

const dataBaseLoc = "../Database";

const userFile = "/Users.json";
const productFile = "Product.json";

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/folder", (req, res) => {});

app.get("/data", async (req, res) => {
  const user = new User("../Database/User.json");
  await user.build();

  res.json(await user.data);

  await user.end();
});

app.post("/changeUser", async (req, res) => {
  try {
    const u = req.body.u;
    const id = req.body.id;
    const user = new User("../Database/User.json");

    await user.build();
    let d = await user.changeUser(id, u);
    await user.end();

    res.json(d);
  } catch (e) {
    res.json(e);
  }
});

app.get("/plandata", async (req, res) => {
  const plan = new Plans("../Database/Plans.json");

  let d = await plan.build();
  res.json(d);
  console.log("before end");
  await plan.end();
  console.log("after end");
});

app.get("/prodata", async (req, res) => {
  const pro = new Product("../Database/Product.json");
  await pro.build();

  res.json(await pro.data);

  await pro.end();
  console.log("after end");
});

// app.post("/dimage", (req, res) => {\

//   let databasedir = "../Database/";
//   let path = "images/";
//   let name = data.name + data.ph_Number + ".jpg";
//   console.log(req.body.url);
//   base64.img(
//     req.body.url,
//     `${databasedir + path + name} `,
//     "1",
//     function (error, filepath) {
//       console.log(error);
//     }
//   );
// });

app.post("/del", async (req, res) => {
  try {
    console.log("indel");
    const i = req.body.id;

    const user = new User("../Database/User.json");
    await user.build();
    await user.deleteUser(i);
    await user.end();
    res.json({ done: true });
  } catch (e) {
    res.json({ done: false });
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = new User("../Database/User.json");
    await user.build();
    const data = await user.getUser(id);
    await user.end();
    res.json(data);
  } catch {
    res.json({ done: false });
  }
});

app.get("/getPro/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pro = new Product("../Database/Product.json");
    await pro.build();
    const data = await pro.getPro(id);
    await pro.end();
    res.json(data);
  } catch {
    res.json({ done: false });
  }
});

app.post("/getInvoice/", async (req, res) => {
  let data = req.body;
  console.log(JSON.stringify(data));
  try {
    let incoive = await easyinvoice.createInvoice(data);

    res.send(incoive);
  } catch (e) {
    res.json({ done: false });
    console.log("error here");
  }
});

app.get("/getPlan/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = new Plans("../Database/Plans.json");
    await user.build();
    const data = await user.getPlan(id);
    await user.end();
    res.json(data);
  } catch {
    res.json({ done: false });
  }
});

app.post("/plandel", async (req, res) => {
  try {
    console.log("indel");
    const i = req.body.id;

    const user = new Plans("../Database/Plans.json");
    await user.build();
    await user.deletePlan(i);
    console.log("k");
    await user.end();
    res.json({ ok: true });
    console.log("all k");
  } catch {
    res.json({ done: false });
  }
});
app.post("/Textdel", async (req, res) => {
  try {
    console.log("indel");
    const i = req.body.id;

    const user = new Text("../Database/Whats.json");
    await user.build();
    await user.deletePlan(i);
    console.log("k");
    await user.end();
    res.json({ ok: true });
    console.log("all k");
  } catch {
    res.json({ done: false });
  }
});

app.post("/prodel", async (req, res) => {
  try {
    console.log("indel");
    const i = req.body.id;

    console.log(i);
    const user = new Product("../Database/Product.json");
    await user.build();
    await user.deletePro(i);
    await user.end();
    res.json({ ok: true });
  } catch {
    res.json({ done: false });
  }
});

app.post("/addText", async (req, res) => {
  try {
    let data = req.body;

    const user = new Text("../Database/Whats.json");
    await user.build();
    await user.addPlan(data);
    let n = await user.end();
  } catch {
    res.json({ done: false });
  }
});

app.get("/Textdata", async (req, res) => {
  try {
    const user = new Text("../Database/Whats.json");
    let k = await user.build();
    res.json(k);
    let n = await user.end();
    console.log(n);
  } catch {
    res.json({ done: false });
  }
});

app.post("/adduser", async (req, res) => {
  // base64.img(
  //   data.profile_pic,
  //   `${databasedir + path + name} `,
  //   name,
  //   function (error, filepath) {
  //     console.log(error);
  //   }
  // );

  try {
    let data = req.body;
    const user = new User("../Database/User.json");
    await user.build();
    const m = await user.addUser(data);
    await user.end();

    res.send(m);
  } catch (e) {
    console.log(e);
    res.send("done");
  }
});

app.post("/addPlan", async (req, res) => {
  try {
    let data = req.body;

    const user = new Plans("../Database/Plans.json");
    await user.build();
    await user.addPlan(data);
    await user.end();
    res.send("done");
  } catch {
    res.json({ done: false });
  }
});

app.post("/addPro", async (req, res) => {
  try {
    let data = req.body;

    const pro = new Product("../Database/Product.json");
    await pro.build();
    await pro.addPro(data);
    await pro.end();
    res.send("done");
  } catch {
    res.json({ done: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
