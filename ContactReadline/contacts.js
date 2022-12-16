//import package
const fs = require("fs");
const readline = require("readline");

//Cek dan create folder data
const pathDir = "../data";
if (!fs.existsSync(pathDir)) {
  fs.mkdirSync(pathDir);
}

//Cek dan create file contacts.js
const pathContacts = "../data/contacts.json";
if (!fs.existsSync(pathContacts)) {
  fs.writeFileSync(pathContacts, "[]", "utf-8");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

exports.daftarPertanyaan = (pertanyaan) => {
  return new Promise((resolve) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban);
    });
  });
};

exports.simpanContact = (nama, noHP, email) => {
  const obj = {
    Nama: nama,
    NoHP: noHP,
    Email: email,
  };
  const file = fs.readFileSync("../data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(obj);

  fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts));

  console.log("Terimakasih Sudah Memasukkan Data");

  rl.close();
};
