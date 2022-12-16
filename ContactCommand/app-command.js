const yargs = require("yargs");
const { simpanContact } = require("./contacts-command");

yargs.command({
  command: "add",
  describe: "Menambah contact baru",
  builder: {
    nama: {
      descibe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
    noHP: {
      descibe: "Nomor Telepon HP",
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
});

yargs.parse();
