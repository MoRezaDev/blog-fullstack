export interface IOtp {
  code: number;
  expired_at: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
