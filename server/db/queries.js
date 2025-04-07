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

const getSet = async (setId, authorId) => {
  return await prisma.set.findUnique({
    where: {
      id: setId,
      authorId,
    },
    include: {
      Flashcard: true,
    },
  });
};

module.exports = {
  prisma,
  createUser,
  isUser,
  createSet,
  getSet,
};
