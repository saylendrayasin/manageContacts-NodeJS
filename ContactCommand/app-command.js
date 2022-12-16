const yargs = require("yargs");
const {
  simpanContact,
  listContacts,
  detailContacts,
  deleteContacts,
} = require("./contacts-command");

//Menambah kontak
yargs
  .command({
    command: "add",
    describe: "Menambah contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      noHP: {
        describe: "Nomor Telepon HP",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.noHP, argv.email);
    },
  })
  .demandCommand();

//Menampilkan kontak
yargs.command({
  command: "list",
  describe: "Melihat nama dan noHP semua kontak",
  handler() {
    listContacts();
  },
});

//Menampilkan detail dari salah satu kontak
yargs.command({
  command: "detail",
  describe: "Melihat detail dari salah satu kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContacts(argv.nama);
  },
});

//Menghapus salah satu kontak
yargs.command({
  command: "delete",
  describe: "Menghapus salah satu kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContacts(argv.nama);
  },
});

yargs.parse();
