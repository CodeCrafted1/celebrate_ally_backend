import userService from '../services/user.service.js';

class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const result = await userService.signUp(name, email, password);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.signIn(email, password);
      res.json(result);
    } catch (error) {
      if (error.message === 'Invalid password') {
        return res.status(401).json({ error: 'Invalid password' });
      } else if (error.message === 'Invalid email') {
        return res.status(401).json({ error: 'Invalid email' });
      }
      res.status(500).json({ error });
    }
  }

  async me(req, res) {
    try {
      const user = await userService.me(req.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new UserController();
