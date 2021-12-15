import { Request, Response } from "express";
import { login } from "../../db/models/auth/login";
import { RESPONSE } from "../../constants";
import { checkPassword } from "../../utils/hash";
import { jwtGenerator } from "../../utils/jwtGenerator";

export const loginHandler = async (req: Request, res: Response) => {
  let response = {};
  const { username, password }: { username: string; password: string } =
    req.body;
  if (!username || !password) {
    response = {
      code: RESPONSE.USERNAME_OR_PASSWORD_IS_EMPTY.CODE,
      message: RESPONSE.USERNAME_OR_PASSWORD_IS_EMPTY.MESSAGE,
    };
    res.status(400).send(response);
    return;
  }

  if (username.length !== 13) {
    response = {
      code: RESPONSE.USERNAME_MUST_BE_IDCARD.CODE,
      message: RESPONSE.USERNAME_MUST_BE_IDCARD.MESSAGE,
    };
    res.status(400).send(response);
    return;
  }

  try {
    const result = await login(username, password);
    console.log(result);
    if (!result.status) {
      response = {
        code: RESPONSE.USERNAME_PASSWORD_IS_INCORRECT.CODE,
        message: result.message,
        data: null,
      };
      res.status(400).send(response);
      return;
    }
    if (!(await checkPassword(password, result.data.password))) {
      response = {
        code: RESPONSE.USERNAME_PASSWORD_IS_INCORRECT.CODE,
        message: RESPONSE.USERNAME_PASSWORD_IS_INCORRECT.MESSAGE,
        data: null,
      };
      res.status(400).send(response);
      return;
    }

    response = {
      code: result.status ? RESPONSE.SUCCESS.CODE : result.code,
      message: result.status ? RESPONSE.SUCCESS.MESSAGE : result.message,
      data: {
        username: result.data.username,
        role : +result.data.role,
        token: jwtGenerator(result.data.username, result.data.role),
      },
    };

    res.status(200).send(response);
  } catch (err) {
    response = {
      code: RESPONSE.ERROR.CODE,
      message: RESPONSE.ERROR.MESSAGE,
      data: null,
    };

    res.status(400).send(response);
  }
  return;
};
