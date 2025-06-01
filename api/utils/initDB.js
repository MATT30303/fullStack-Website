import db from '../models/index.js';
import bcrypt from 'bcryptjs';

export default async function initializeDatabase() {
  try {
    console.log(' Inicializando base de datos...');

    const existing = await db.User.findOne({ where: { username: 'admin' } });
    if (existing) {
      console.log('La base de datos ya está inicializada.');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const user = await db.User.create({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      createdAt: new Date(),
    });

    console.log('Base de datos creada e inicializada con admin');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}
