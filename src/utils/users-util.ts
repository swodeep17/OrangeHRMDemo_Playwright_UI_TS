import fs from "fs";
import path from "path";

const usersPath = path.resolve(process.cwd(), "test-data", "users.json");

export function readUsers() {
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
}

export function writeUsers(data: any) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), "utf-8");
}

// export function addClientAdmin(user: { username: string; password: string }) {
//   const users = readUsers();
//   users.admin = user;
//   writeUsers(users);
// }

// export function addEssUser(user: { username: string; password: string }) {
//   const users = readUsers();
//   users.essUsers.push(user);
//   writeUsers(users);
// }


// SAVE EMPLOYEE BY TYPE
export function saveEmployeeByType(userType: string, employee: any) {
  const users = readUsers();

  if (userType.toLowerCase() === "clientadmin") {
    users.clientadmins.push(employee);
  } else if (userType.toLowerCase() === "ess") {
    users.essusers.push(employee);
  }

  writeUsers(users);
}


// GET LAST CREATED EMPLOYEE BY TYPE
export function getLastEmployeeByType(userType: string) {
  const users = readUsers();
  const list =
    userType.toLowerCase() === "clientadmin"
      ? users.clientadmins
      : users.essusers;

  return list.length ? list[list.length - 1] : null;
}
