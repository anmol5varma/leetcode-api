import config from 'dotenv';
import database from '../models';
import { getSha256, genRandomString } from '../utils/encyrpt.util';

config.config();

class UserService {
  static async getAllUsers() {
    const users = await database.user.findAll();
    return users.map((user) => ({
      username: user.username, createdAt: user.createdAt
    }));
  }

  static async addUser({ username, password }) {
    const saltLength = Number(process.env.SALT_LENGTH);
    const salt = genRandomString(saltLength);
    const newUser = await database.user.create({
      username,
      password: getSha256(password, salt),
      salt
    });
    return {
      username: newUser.username,
      createdAt: newUser.createdAt,
    };
  }

  static async updatePassword({ username, password }) {
    const saltLength = Number(process.env.SALT_LENGTH);
    const userToUpdate = await database.user.findOne({
      where: { username }
    });

    if (userToUpdate) {
      const salt = genRandomString(saltLength);
      await database.user.update(
        { password: getSha256(password, salt), salt },
        { where: { username } }
      );
      return {
        username: userToUpdate.username,
      };
    }
    return null;
  }

  static async deleteUser({ username }) {
    const userToDelete = await database.user.findOne({ where: { username } });

    if (userToDelete) {
      const deletedBook = await database.user.destroy({
        where: { username }
      });
      return deletedBook;
    }
    return null;
  }
}

export default UserService;
