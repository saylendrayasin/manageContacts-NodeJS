//import package
const fs = require("fs");
const validator = require("validator");

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

exports.simpanContact = (nama, noHP, email) => {
  const obj = {
    Nama: nama,
    NoHP: noHP,
    Email: email,
  };
  const file = fs.readFileSync("../data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  //cek duplicate
  const duplikat = contacts.find((contacts) => contacts.Nama === nama);
  if (duplikat) {
    console.log("Nama sudah terdaftar, silahkan cek dan masukkan nama lain");
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid");
      return false;
    }
  }

  //cek noHP
  if (!validator.isMobilePhone(noHP)) {
    console.log("Nomor HP tidak valid");
    return false;
  }

  contacts.push(obj);

  fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts));

  console.log("Terimakasih Sudah Memasukkan Data");
};
