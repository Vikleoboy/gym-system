import fs from "fs";
import uniqid from "uniqid";

class Product {
  mainObj = ["Products", "path"];
  constructor(path) {
    this.path = path;
  }

  exceptions = ["id", "qnt"];
  Planstemp() {
    let user = {
      id: uniqid(),
      name: null,
      price: null,
      qnt: null,
    };

    return user;
  }

  async getPro(id) {
    let done = false;
    for (let pro of this.data.Products) {
      if (pro.id === id) {
        done = true;

        return pro;
      }
    }
    if (!done) {
      throw "user not found ";
    }
  }

  async deletePro(id) {
    let done = false;
    for (let plan of this.data.Products) {
      if (plan.id === id) {
        console.log("i am in for");
        let index = this.data.Products.indexOf(plan);
        this.data.Products.splice(index, 1);
        done = true;
      }
    }
    if (!done) {
      // throw "user not found ";

      console.log(id + "this is id ");
    }
  }

  async deleteAllProducts() {
    this.data[this.mainObj[0]] = [];
  }

  // async changeUser(id, temp) {
  //   let done = false;
  //   for (let user of this.data.Products) {
  //     if (user.id === id) {
  //       let index = this.data.Products.indexOf(user);

  //       let newUser = { ...user, ...temp };

  //       this.data.Products.splice(index, 1, newUser);
  //       done = true;
  //       return newUser;
  //     }
  //   }
  //   if (!done) {
  //     throw "user not found ";
  //   }
  // }

  async addPro(plandetails) {
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

    console.log(plantemp);

    this.data[this.mainObj[0]].push(plantemp);
  }

  async build() {
    try {
      let d = await fs.readFileSync(this.path, "utf-8");
      console.log(typeof d);
      this.data = JSON.parse(d);
      console.log(this.data);
      for (let i of this.mainObj) {
        console.log(this.mainObj);
        if (!(i in this.data)) {
          this.data[i] = [];
        }
      }
    } catch (e) {
      console.log(" error in build ", e);
    }
  }

  async end() {
    let d = JSON.stringify(this.data);
    let m = await fs.writeFileSync(this.path, d);
  }
}

// let k = new Product("../../Database/Product.json");
// await k.build();

// await k.addPro({ name: "First Plan", price: 1000, qnt: 2 });

// await k.end();

// console.log(k.path, k.data);

export default Product;
