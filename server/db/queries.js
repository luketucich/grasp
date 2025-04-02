const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, password) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      authProvider: "local",
    },
  });
};

module.exports = {
  prisma,
  createUser,
};
