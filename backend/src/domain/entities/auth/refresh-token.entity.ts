export type RefreshTokenProps = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
};

export class RefreshToken {
  private constructor(private props: RefreshTokenProps) {}

  static rehydrate(props: RefreshTokenProps): RefreshToken {
    return new RefreshToken(props);
  }

  static createNew(params: {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    now: Date;
  }): RefreshToken {
    return new RefreshToken({
      id: params.id,
      userId: params.userId,
      expiresAt: params.expiresAt,
      tokenHash: params.tokenHash,
      createdAt: params.now,
      revokedAt: null,
    });
  }

  isExpired(now: Date): boolean {
    return now.getTime() > this.props.expiresAt.getTime();
  }

  isRevoked(): boolean {
    return this.props.revokedAt !== null;
  }

  revoke(now: Date): void {
    if (this.props.revokedAt != null) {
      return;
    }

    this.props.revokedAt = now;
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get tokenHash(): string {
    return this.props.tokenHash;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get revokedAt(): Date | null {
    return this.props.revokedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
