import React from "react";

interface BtDropdownProps {
  config: any;
  keyProp: string;
  id: string;
  name: string;
}

export const BtDropdown: React.FC<BtDropdownProps> = ({
  config,
  keyProp,
  id = "id",
  name = "name",
}) => {
  return (
    <>
      {config.dropdown && config.dropdown[keyProp].length > 0
        ? config.dropdown[keyProp].map((value: any) => (
            <option key={value[id]} value={value[id]}>
              {value[name]}
            </option>
          ))
        : null}
    </>
  );
};
