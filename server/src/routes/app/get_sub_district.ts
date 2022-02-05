import { Request, Response } from "express";
import { query } from "../../db";

const getTambol = async (
  province_id: string | number,
  district_id: string | number
) => {
  let sql = `SELECT a.tcode AS id, tname AS name
    FROM tambol AS a
    where a.pcode = ?
    and a.acode = ?
    ORDER BY a.id`;
  let result = await query(sql, [province_id, district_id]);
  return result[0];
};

export const getSubDistrict = async (req: Request, res: Response) => {
  let pcode = req.query.pcode as string;
  let acode = req.query.acode as string;

  const [sub_district] = await Promise.all([getTambol(pcode, acode)]);

  res.send(sub_district);
};
