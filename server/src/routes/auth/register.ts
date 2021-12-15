import { Request, Response } from "express";
import { register } from "../../db/models/auth/register";
import { RESPONSE } from "../../constants";
import { hashPassword } from "../../utils/hash";
import { checkEmptyString } from "../../utils/string";

export const registerHandler = async (req: Request, res: Response) => {
  let response = {};
  const {
    username,
    firstName,
    lastName,
    mobileNo,
    telNo,
    email,
    password,
    passwordAgain,
  }: {
    username: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
    telNo: string;
    email: string;
    password: string;
    passwordAgain: string;
  } = req.body;

  try {
    if (
      checkEmptyString(username) ||
      checkEmptyString(firstName) ||
      checkEmptyString(lastName) ||
      checkEmptyString(mobileNo) ||
      checkEmptyString(telNo) ||
      checkEmptyString(email) ||
      checkEmptyString(password) ||
      checkEmptyString(passwordAgain)
    ) {
      response = {
        code: RESPONSE.INVALID_INPUT.CODE,
        message: RESPONSE.INVALID_INPUT.MESSAGE,
      };
      res.status(400).send(response);
      return;
    }

    console.log("Gere");

    // if (!checkThaiLanguage(firstName) || !checkThaiLanguage(lastName)) {
    //   response = {
    //     code: RESPONSE.MUST_BE_IN_THAI.CODE,
    //     message: `Firstname or Lastname ` + RESPONSE.MUST_BE_IN_THAI.MESSAGE,
    //   };
    //   res.status(400).send(response);
    //   return;
    // }

    if (username.length !== 13) {
      response = {
        code: RESPONSE.USERNAME_MUST_BE_IDCARD.CODE,
        message: RESPONSE.USERNAME_MUST_BE_IDCARD.MESSAGE,
      };
      res.status(400).send(response);
      return;
    }

    if (password.length < 8) {
      response = {
        code: RESPONSE.PASSWORD_GREATER_THAN_8.CODE,
        message: RESPONSE.PASSWORD_GREATER_THAN_8.MESSAGE,
      };
      res.status(400).send(response);
      return;
    }

    if (password !== passwordAgain) {
      response = {
        code: RESPONSE.PASSWORD_MISSMATCH.CODE,
        message: RESPONSE.PASSWORD_MISSMATCH.MESSAGE,
      };
      res.status(400).send(response);
      return;
    }

    const nPassword = await hashPassword(password);

    const result = await register(
      username,
      firstName,
      lastName,
      mobileNo,
      telNo,
      email,
      nPassword
    );

    if (!result.status) {
      response = {
        code: result.code,
        message: result.message,
        data: null,
      };
      res.status(400).send(response);
      return;
    }

    response = {
      code: RESPONSE.SUCCESS.CODE,
      message: RESPONSE.SUCCESS.MESSAGE,
    };
    res.status(200).send(response);
    return;
  } catch (err) {
    console.error(err);
    response = {
      code: RESPONSE.ERROR.CODE,
      message: RESPONSE.ERROR.MESSAGE,
    };
    res.status(400).send(response);
    return;
  }
};
