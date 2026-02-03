export type MfaCodeProps = {
  id: string;
  userId: string;
  mfaTokenHash: string;
  codeHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
};

export class MfaCode {
  private constructor(private readonly props: MfaCodeProps) {}

  static rehydrate(props: MfaCodeProps): MfaCode {
    return new MfaCode(props);
  }

  static createNew(params: {
    id: string;
    userId: string;
    mfaTokenHash: string;
    codeHash: string;
    expiresAt: Date;
    now: Date;
  }): MfaCode {
    return new MfaCode({
      id: params.id,
      userId: params.userId,
      mfaTokenHash: params.mfaTokenHash,
      codeHash: params.codeHash,
      expiresAt: params.expiresAt,
      usedAt: null,
      createdAt: params.now,
    });
  }

  isExpired(now: Date): boolean {
    return now.getTime() > this.props.expiresAt.getTime();
  }

  isUsed(): boolean {
    return this.props.usedAt !== null;
  }

  markAsUsed(now: Date): void {
    if (this.props.usedAt !== null) {
      throw new Error('MfaCodeAlreadyUsed');
    }

    this.props.usedAt = now;
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get mfaTokenHash(): string {
    return this.props.mfaTokenHash;
  }

  get codeHash(): string {
    return this.props.codeHash;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get usedAt(): Date | null {
    return this.props.usedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
