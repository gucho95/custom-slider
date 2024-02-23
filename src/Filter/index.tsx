import { FC } from "react";
import classes from "./style.module.css";

type FilterProps = {
  name: string;
  options: { label: string; value: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
};
const Filter: FC<FilterProps> = ({ name, options, value, onChange }) => {
  return (
    <div className={classes.filterBlock}>
      <label>{name}: </label>
      <select
        className="bg-transparent"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value={undefined}>Default</option>
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
