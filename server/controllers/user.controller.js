import UserService from '../services/user.service';

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      return res.status(200).json(allUsers);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }

  static async addUser(req, res) {
    const newUser = req.body;
    try {
      const createdUser = await UserService.addUser(newUser);
      return res.status(201).json(createdUser);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }

  static async updatePassword(req, res) {
    const data = req.body;
    try {
      const updateUser = await UserService.updatePassword(data);
      if (!updateUser) {
        return res.status(400).json('Bad request');
      }
      return res.status(200).json(updateUser);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }

  static async deleteUser(req, res) {
    const data = req.body;
    try {
      const userToDelete = await UserService.deleteUser(data);
      if (!userToDelete) {
        return res.status(400).json('Bad request');
      }
      return res.status(200).json(userToDelete);
    } catch (error) {
      console.error(`${req.id} - ${error}`);
      return res.status(500).json('Unexpected error');
    }
  }

  static async getRole(req, res) {
    return res.status(200).json('Hello');
    // try {
    //   return res.status(200).json(req?.session?.user?.role);
    // } catch (error) {
    //   console.error(`${req.id} - ${error}`);
    //   return res.status(500).json('Unexpected error');
    // }
  }
}

export default UserController;
