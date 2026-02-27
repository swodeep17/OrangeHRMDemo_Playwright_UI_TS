import fs from "fs";
import path from "path";

const usersPath = path.resolve(process.cwd(), "test-data", "users.json");

export function readUsers() {
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
}

export function writeUsers(data: any) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), "utf-8");
}

export function addClientAdmin(user: { username: string; password: string }) {
  const users = readUsers();
  users.admin = user;
  writeUsers(users);
}

export function addEssUser(user: { username: string; password: string }) {
  const users = readUsers();
  users.essUsers.push(user);
  writeUsers(users);
}