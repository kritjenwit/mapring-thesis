import { compare, hash } from "bcrypt";

const saltRount = 10;

export const hashPassword = async (password: string) => {
  return await hash(password, saltRount);
};

export const checkPassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
};
