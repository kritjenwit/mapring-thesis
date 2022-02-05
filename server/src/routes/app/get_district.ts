import { Request, Response } from "express";
import { query } from "../../db";

const getAmphures = async (province_id: string | number) => {
  let sql = `SELECT a.code as id,a.name_th as name
      FROM amphures as a
      where a.province_id = (select b.id from provinces as b where b.code = ?)
      ORDER BY a.id;`;
  let result = await query(sql, [province_id]);
  return result[0];
};

export const getDistrict = async (req: Request, res: Response) => {
  let pcode = req.query.pcode as string;

  const [district] = await Promise.all([getAmphures(pcode)]);

  res.send(district);
};
