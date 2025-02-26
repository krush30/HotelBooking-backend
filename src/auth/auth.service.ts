import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { users } from '../database/schema';
import { db } from '../database';
import { eq } from 'drizzle-orm';
import { UsersService } from 'src/users/users.service';

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, email: user.email, role: user.role };
    }
    return null;
  }

  async login(userDto: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { email: user.email, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      user: { email: user.email, name: user.name, id: user.id },
    };
  }

  async register(email: string, password: string, name: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .insert(users)
      .values({ email, password: hashedPassword, name, role });
    return { message: 'User registered successfully' };
  }
}
