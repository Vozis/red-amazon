export enum AuthEnum {
  LOGIN = 'login',
  REGISTER = 'register',
}

export type IAuthType = {
  category: AuthEnum;
};
