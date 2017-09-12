import {Role} from './Role';
export class User {
  id: number;
  username: string;
  password: string;
  cpassword: string;
  city: string;
  state: string;
  street: string;
  role: Role;
  rememberMe: boolean;
  phone: string;
  name: string;
  balance: number;
  displayname: string;
  email: string;
  smsVerifyCode: string;
}
