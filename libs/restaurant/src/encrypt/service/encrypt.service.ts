import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';
@Injectable()
export class EncryptService {
  private encrypter = promisify(pbkdf2);
  async hashPassword(password: string, salt?: string): Promise<string> {
    salt = salt || randomBytes(16).toString('hex');
    const hashedPassword = await this.encrypter(
      password,
      salt,
      16,
      100,
      'sha512',
    );
    return [hashedPassword.toString('hex'), salt].join('.');
  }
  getSalt(hashedPassword: string): string {
    return hashedPassword.split('.')[1];
  }

  async validatePassword(
    oldPasswordHash: string,
    password: string,
  ): Promise<boolean> {
    const salt = this.getSalt(oldPasswordHash);

    if ((await this.hashPassword(password, salt)) !== oldPasswordHash)
      return false;
    return true;
  }
}
