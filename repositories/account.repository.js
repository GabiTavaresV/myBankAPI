import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function getAccounts() {
  const data = JSON.parse(await readFile(global.fileName));
  return data.account;
}

async function getAccount(id) {
  const accounts = await getAccount();
  const account = account.find((account) => account.id == parseInt(id));
  if(account){
    return account;
  }
  throw new Error("Registro não encontrado");
  
}

async function insertAccount(account) {
  const data = JSON.parse(await readFile(global.fileName));

  account = {
    id: data.nextId++,
    name: account.name,
    balance: account.balance,
  };
  data.account.push(account);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return account;
}

async function deleteAccount(id) {
  const data = JSON.parse(await readFile(global.fileName));
  data.account = data.account.filter((account) => account.id !== parseInt(id));
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateAccount(account) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.account.findIndex((a) => a.id === account.id);

  if (index === -1) {
    throw new Error("Registro não encontrado");
  }

  data.account[index].name = account.name;
  data.account[index].balance = account.balance;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.accounts[index];
}
export default {
  getAccounts,
  getAccount,
  insertAccount,
  deleteAccount,
  updateAccount
};
