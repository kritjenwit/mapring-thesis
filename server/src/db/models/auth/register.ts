import { query } from "../../index";

export const register = async (
  username: string,
  firstname: string,
  lastname: string,
  mobile_no: string,
  tel_no: string,
  email: string,
  password: string
) => {
  const data = {
    username,
    firstname,
    lastname,
    mobile_no,
    tel_no,
    email,
    password,
    team_id: 0,
    area_id: 0,
    school_id: 0,
  };

  const registerParam = JSON.stringify(data);
  const sql = `call AccountOperation(?, ?);`;
  try {
    const [rows] = await query(sql, [2, registerParam]);
    // @ts-ignore
    if (rows[0].length > 0) {
      // @ts-ignore
      const result = JSON.parse(rows[0][0].response);
      if (result.code !== 1101) {
        return {
          status: false,
          code: result.code,
          message: result.message,
          data: null,
        };
      }
      return {
        status: true,
        code: result.code,
        message: result.message,
        data: result.data,
      };
    }
    return {
      status: false,
      code: 2001,
      message: "Error",
      data: null,
    };
  } catch (err) {
    console.error(err)
    return {
      status: false,
      code: 2002,
      message: "Error",
      data: null,
    };
  }
};
