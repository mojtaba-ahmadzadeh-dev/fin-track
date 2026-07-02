export type CookiePayload = {
  userId: number;
};

export interface AccessTokenPayload {
  userId: number;
  phone?: string;
  role?: string;
}

export type EmailTokenPayload = {
  email: string;
};

export type PhoneTokenPayload = {
  phone: string;
};
