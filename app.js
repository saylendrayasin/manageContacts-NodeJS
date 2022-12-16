const { daftarPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await daftarPertanyaan("Masukkan nama anda? ");
  const noHP = await daftarPertanyaan("Masukkan nomor handphone anda? ");
  const email = await daftarPertanyaan("Masukkan email anda? ");

  simpanContact(nama, email, noHP);
};

main();

// rl.question("Masukkan nama anda : ", (nama) => {
//   rl.question("Masukkan no hp anda : ", (no) => {
//     const obj = {
//       Nama: nama,
//       NoHP: no,
//     };
//     const file = fs.readFileSync("data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file);

//     contacts.push(obj);

//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

//     console.log("Terimakasih Sudah Memasukkan Data");

//     rl.close();
//   });
// });
