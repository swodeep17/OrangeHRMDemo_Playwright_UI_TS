import fs from "fs";
import path from "path";

const usersPath = path.resolve(process.cwd(), "test-data", "users.json");

export function readUsers() {
  const data = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  // Ensure arrays exist
  if (!Array.isArray(data.clientadmins)) data.clientadmins = [];
  if (!Array.isArray(data.essUsers)) data.essUsers = [];

  return data;
}

export function writeUsers(data: any) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), "utf-8");
}

// ------------------------------------------------------------------
// SAVE EMPLOYEE (PIM)  -> clientadmins[] (only 1), essUsers[] (many)
// ------------------------------------------------------------------
export function saveEmployeeByType(userType: string, employee: any) {
  const users = readUsers();
  const type = userType.toLowerCase();

  if (type === "clientadmin") {
    // Keep only one client admin → always replace index 0
    users.clientadmins[0] = employee;
  } else if (type === "ess") {
    users.essUsers.push(employee);
  } else {
    throw new Error("Invalid userType for employee creation");
  }

  writeUsers(users);
}

// ------------------------------------------------------------------
// GET LAST CREATED EMPLOYEE
// ------------------------------------------------------------------
export function getLastEmployeeByType(userType: string) {
  const users = readUsers();
  const type = userType.toLowerCase();

  if (type === "clientadmin") {
    return users.clientadmins.length ? users.clientadmins[0] : null;
  }

  const list = users.essUsers;
  return list.length ? list[list.length - 1] : null;
}

// ------------------------------------------------------------------
// SAVE ADMIN CREDENTIALS (clientadmin or ESS)
// ------------------------------------------------------------------
export function saveAdminCredentials(
  empFullName: string,
  username: string,
  password: string
) {
  const users = readUsers();

  const pool = [...users.clientadmins, ...users.essUsers];

  const target = pool.find(
    (e: any) =>
      `${e.firstName} ${e.lastName}`.toLowerCase() ===
      empFullName.toLowerCase()
  );

  if (!target) {
    throw new Error(
      `Employee '${empFullName}' not found while saving admin credentials`
    );
  }

  target.adminCredentials = { username, password };

  writeUsers(users);
}