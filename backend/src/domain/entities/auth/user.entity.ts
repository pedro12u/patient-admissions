import { Email } from './value-objects/email.vo';

export type UserProps = {
  id: string;
  email: Email;
  passwordHash: string;
  createdAt: Date;
};

export class User {
  private constructor(private props: UserProps) {}

  static rehydrate(props: UserProps): User {
    return new User(props);
  }

  static createNew(params: {
    id: string;
    email: Email;
    passwordHash: string;
    now: Date;
  }): User {
    return new User({
      id: params.id,
      email: params.email,
      passwordHash: params.passwordHash,
      createdAt: params.now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
