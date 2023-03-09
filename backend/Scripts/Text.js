import fs from "fs";
import uniqid from "uniqid";

class Text {
  mainObj = ["Texts", "path"];
  constructor(path) {
    this.path = path;
  }

  exceptions = ["id"];
  Planstemp() {
    let user = {
      id: uniqid(),
      name: null,
      text: "",
    };

    return user;
  }

  async deletePlan(id) {
    let done = false;
    for (let plan of this.data[this.mainObj[0]]) {
      if (plan.id == id) {
        console.log(plan.id == id);
        let index = this.data[this.mainObj[0]].indexOf(plan);
        this.data[this.mainObj[0]].splice(index, 1);
        done = true;
        console.log(index, "this is ok ", done);

        return done;
      }
    }
    if (!done) {
      // throw "user not found ";
      console.log(id + "this is id ");
      return done;
    }
    return "s";
  }

  async deleteAllPlans() {
    this.data[this.mainObj[0]] = [];
  }

  async getPlan(id) {
    let done = false;
    for (let plan of this.data.Plans) {
      if (plan.id === id) {
        done = true;

        return plan;
      }
    }
    if (!done) {
      throw "user not found ";
    }
  }

  async addPlan(plandetails) {
    let plantemp = this.Planstemp();
    for (let key in plandetails) {
      try {
        console.log(key in plantemp);
        if (key in plantemp) {
          plantemp[key] = plandetails[key];
        } else if (this.exceptions.includes(key)) {
          console.log("ok");
        } else {
          throw "Give right Arguments mf!";
        }
      } catch (e) {
        console.log(e);
      }
    }

    for (let i in plantemp) {
      if (plantemp[i] === null && !this.exceptions.includes(i)) {
        throw "Incomplete User";
      }
    }

    this.data[this.mainObj[0]].push(plantemp);
    console.log("build working ");
  }

  async build() {
    try {
      let d = await fs.readFileSync(this.path, "utf-8");

      this.data = JSON.parse(d);

      for (let i of this.mainObj) {
        if (!(i in this.data)) {
          this.data[i] = [];
        }
      }
      console.log("in the build", this.path, this.data);
      return this.data;
    } catch (e) {
      console.log(" error in build ", e);
    }
  }

  async end() {
    console.log("i am in the end ");
    let d = JSON.stringify(this.data);
    console.log(this.path);
    let m = await fs.writeFileSync(this.path, d);
    return m;
  }
}

// let k = new Plans("../../Database/Plans.json");
// await k.build();

// await k.addPlan({ name: "First Plan", val: 10 });

// await k.end();

// console.log(k.path, k.data);

export default Text;
