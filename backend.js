import fs from "fs";
import ChildProcess from "child_process";

let k = await ChildProcess.execSync("ls");
console.log(k);
