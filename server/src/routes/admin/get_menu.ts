import { Request, Response } from "express";
import { query } from "../../db";

const getClass = async () => {
  let sql = `select a.id, a.name, a.min_year, a.max_year
    from tbl_class_type  as a
    where status = ? 
    order by a.order asc`;
  return await query(sql, [1]);
};

const getAcademicYear = async (): Promise<number> => {
  let sql = `SELECT *
  FROM tbl_academic_year
  where NOW() BETWEEN start_date AND end_date
  AND status = ?`;
  const result = await query(sql, [1]);
  // @ts-ignore
  return result[0][0].academic_year as number;
};

const getRooms = async (
  academicYear: number,
  classType: number,
  year: number
) => {
  let sql = `SELECT DISTINCT room
  FROM tbl_student_academic_year
  WHERE academic_year = ? 
  AND class_type_id = ?
  AND year = ?`;
  const params = [academicYear, classType, year];
  // console.log(params);
  return await query(sql, params);
};

export const getMenuHandler = async (_: Request, res: Response) => {
  const [resultGetActiveClass, academicYear] = await Promise.all([
    getClass(),
    getAcademicYear(),
  ]);
  const activeClasses = await Promise.all((resultGetActiveClass[0] as any[]).map(
    async (cl: any) => {
      let minYear = cl.min_year;
      let maxYear = cl.max_year;
      let classProps: any = {
        id: cl.id,
        name: cl.name,
        subMenu: [],
      };
      for (let i = minYear; i <= maxYear; i++) {
        let getRoomResult = await getRooms(academicYear, cl.id, i);
        let rooms = getRoomResult[0] as any[];

        let roomList: any[] = [];
        for (let j = 1; j <= rooms.length; j++) {
          roomList.push({
            room: j,
          });
        }

        classProps.subMenu.push({
          year: i,
          path: `/admin/student/list/${cl.id}/${i}`,
          rooms: roomList,
        });
      }
      return classProps;
    }
  ));

    // console.log(activeClasses)

  res.json(activeClasses);
};
