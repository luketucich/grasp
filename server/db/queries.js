const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, username, password) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      username,
      authProvider: "local",
    },
  });
};

const isUser = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const createSet = async (title, description, authorId) => {
  return await prisma.set.create({
    data: {
      author: {
        connect: {
          id: authorId,
        },
      },
      title,
      description,
    },
  });
};

module.exports = {
  prisma,
  createUser,
  isUser,
  createSet,
};
