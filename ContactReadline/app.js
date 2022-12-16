const { daftarPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await daftarPertanyaan("Masukkan nama anda? ");
  const noHP = await daftarPertanyaan("Masukkan nomor handphone anda? ");
  const email = await daftarPertanyaan("Masukkan email anda? ");

  simpanContact(nama, email, noHP);
};

main();
