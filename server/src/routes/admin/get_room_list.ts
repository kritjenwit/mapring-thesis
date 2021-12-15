import { Request, Response } from "express";
import { query } from "../../db";

const getRoomList = async (year: number) => {
  let sql = `select a.id, a.name, a.min_year, a.max_year
    from tbl_class_type  as a
    where status = ? 
    and id = ?
    order by a.order asc`;
  return await query(sql, [1, year]);
};

export const getRoomListHandler = async (req: Request, res: Response) => {
  let year = +req.params.year;

  const resultGetActiveClass = await getRoomList(year);
  const activeClasses = (resultGetActiveClass[0] as any[]).map((cl: any) => {
    let minYear = cl.min_year;
    let maxYear = cl.max_year;
    let classProps: any = {
      id: cl.id,
      name: cl.name,
      subMenu: [],
    };
    for (let i = minYear; i <= maxYear; i++) {
      classProps.subMenu.push({
        name: i,
        path: `/admin/student/list/${cl.id}/${i}`,
      });
    }

    return classProps;
  });
  res.json(activeClasses);
};
