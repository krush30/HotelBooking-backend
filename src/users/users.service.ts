/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { db } from '../database';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  findUserByEmail(email: string) {
    return db.query.users.findFirst({ where: eq(users.email, email) });
  }

  getAllUsers() {
    return db.select().from(users);
  }

  getUserById(id: number) {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  }
  async deleteUser(id: number) {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    return { message: 'User deleted successfully', deletedUser };
  }
}
