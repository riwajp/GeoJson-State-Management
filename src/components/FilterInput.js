import { forwardRef } from "react";
const FilterInput = forwardRef(
  ({ name, type, placeholder, label, options, ...field }, ref) => {
    switch (type) {
      case "text":
        return (
          <input
            name={name}
            type="input"
            placeholder={placeholder || ""}
            ref={ref}
            {...field}
          />
        );
        break;

      case "select":
        return (
          <select name={name} ref={ref} {...field}>
            {options.map((o) => (
              <option value={o.value} key={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
        break;
    }
  }
);

export default FilterInput;
