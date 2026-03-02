export default class UserManager {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  create(user) {
    const newUser = { id: Date.now().toString(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id, data) {
    this.users = this.users.map(u =>
      u.id === id ? { ...u, ...data } : u
    );
  }

  delete(id) {
    this.users = this.users.filter(u => u.id !== id);
  }
}