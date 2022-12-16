//import package
const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");

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
    console.log(
      chalk`Kontak dengan nama {bgRed.black ${nama}} sudah terdaftar, silahkan cek dan masukkan nama lain`
    );
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

  //save contact
  contacts.push(obj);

  fs.writeFileSync("../data/contacts.json", JSON.stringify(contacts));

  console.log(chalk`Data dengan nama {bgRed.black ${nama}} ditambahkan`);
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
    console.log(
      chalk`Mohon maaf, kontak dengan nama {bgRed.black ${nama}} tidak ditemukan`
    );
    return false;
  }

  console.log(`Nama : ${contact.Nama} `);
  console.log(`No HP : ${contact.NoHP} `);
  if (contact.Email) {
    console.log(`Email : ${contact.Email} `);
  }
};

exports.deleteContacts = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.Nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(
      chalk`Mohon maaf, kontak dengan nama {bgRed.black ${nama}} tidak ditemukan`
    );
    return false;
  }

  fs.writeFileSync("../data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk`Kontak dengan nama {bgRed.black ${nama}} berhasil dihapus!`
  );
};
