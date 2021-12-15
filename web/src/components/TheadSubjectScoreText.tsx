import React from "react";

interface TheadSubjectScoreTextProps {}

export const TheadSubjectScoreText: React.FC<TheadSubjectScoreTextProps> =
  ({}) => {
    const style = {
      width: "10px !important",
    };
    const valign = "middle";
    const className = "text-center";

    return (
      <>
        <th
          style={style}
          // @ts-ignore
          valign={valign}
          className={className}
        >
          คะแนนเก็บ
        </th>
        <th
          style={style}
          // @ts-ignore
          valign={valign}
          className={className}
        >
          คะแนนสอบ
        </th>
        <th
          style={style}
          // @ts-ignore
          valign={valign}
          className={className}
        >
          คะแนนรวม
        </th>
      </>
    );
  };
