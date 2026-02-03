import { MfaCode } from 'src/domain/entities/auth/mfa-code.entity';

export interface MfaCodeRepository {
  save(mfaCode: MfaCode): Promise<void>;
  findByMfaTokenHash(mfaTokenHash: string): Promise<MfaCode | null>;
}
