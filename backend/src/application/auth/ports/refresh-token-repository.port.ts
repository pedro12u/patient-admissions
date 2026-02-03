import { RefreshToken } from 'src/domain/entities/auth/refresh-token.entity';

export interface RefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
}
