import fs from "fs";
import uniqid from "uniqid";

class User {
  mainObj = ["Users", "path"];
  constructor(path) {
    this.path = path;
  }

  exceptions = [
    "id",
    "status",
    "Transections",
    "ProductTransections",
    "profile_pic",
    "Address",
    "payment_method",
  ];
  Usertemp() {
    let user = {
      id: uniqid(),
      name: null,
      gender: null,
      Dob: null,
      profile_pic: null,
      ph_Number: null,
      Address: null,
      Plan: null,
      check_in: null,
      check_out: null,
      payment_method: null,
      Transections: [],
      ProductTransections: [],
      Adhar: null,
      status: null,
    };

    return user;
  }

  async getUser(id) {
    let done = false;
    for (let user of this.data.Users) {
      if (user.id === id) {
        done = true;

        return user;
      }
    }
    if (!done) {
      throw "user not found ";
    }
  }

  async deleteUser(id) {
    let done = false;
    for (let user of this.data.Users) {
      if (user.id === id) {
        let index = this.data.Users.indexOf(user);
        this.data.Users.splice(index, 1);
        done = true;
      }
    }
    if (!done) {
      throw "user not found ";
    }
  }

  async changeUser(id, temp) {
    let done = false;
    for (let user of this.data.Users) {
      if (user.id === id) {
        let index = this.data.Users.indexOf(user);

        let newUser = { ...user, ...temp };

        this.data.Users.splice(index, 1, newUser);
        done = true;
        return newUser;
      }
    }
    if (!done) {
      throw "user not found ";
    }
  }

  async deleteAllUsers() {
    this.data.Users = [];
  }

  async addUser(userdetails) {
    let usertemp = this.Usertemp();
    for (let key in userdetails) {
      try {
        console.log(key in usertemp);
        if (key in usertemp) {
          usertemp[key] = userdetails[key];
        } else if (this.exceptions.includes(key)) {
          console.log("ok");
        } else {
          throw "Give right Arguments mf!";
        }
      } catch (e) {
        console.log(e);
      }
    }

    for (let i in usertemp) {
      if (usertemp[i] === null && !this.exceptions.includes(i)) {
        throw "Incomplete User";
      }
    }

    console.log(usertemp);

    this.data.Users.push(usertemp);
  }

  async build() {
    try {
      let d = await fs.readFileSync(this.path, "utf-8");
      this.data = JSON.parse(d);

      for (let i of this.mainObj) {
        console.log(this.mainObj);
        if (!(i in this.data)) {
          this.data[i] = [];
        }
      }
    } catch {
      console.log(" error in build ");
    }
  }

  async end() {
    let d = JSON.stringify(this.data);
    let m = await fs.writeFileSync(this.path, d);
  }
}

// let k = new User("../../Database/User.json");
// await k.build();

// await k.deleteAllUsers();

// await k.end();

// console.log(k.path, k.data);

export default User;
