import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Anderson Lima',
    email: 'ander.limabr@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Joao Franco',
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
