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

//load contact
const loadContact = () => {
  const file = fs.readFileSync("../data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

exports.simpanContact = (nama, noHP, email) => {
  const obj = {
    Nama: nama,
    NoHP: noHP,
    Email: email,
  };

  const contacts = loadContact();

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
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log("Nomor HP tidak valid");
    return false;
  }

  contacts.push(obj);

  fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts));

  console.log("Terimakasih Sudah Memasukkan Data");
};

exports.listContacts = () => {
  const contacts = loadContact();
  console.log("Daftar contact : ");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.Nama} - ${contact.NoHP}`);
  });
};

exports.detailContacts = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.Nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(`Mohon maaf, kontak dengan nama ${nama} tidak ditemukan`);
    return false;
  } else {
    console.log(`${contact.Nama} - ${contact.NoHP} - ${contact.Email}`);
  }
};
