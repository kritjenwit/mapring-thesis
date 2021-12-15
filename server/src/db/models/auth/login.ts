import { query } from "../../index";

export const login = async (username: string, password: string) => {
  const loginParams = JSON.stringify({ username, password });
  const sql = `call AccountOperation(?, ?);`;
  try {
    const [rows] = await query(sql, [1, loginParams]);
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
