import { useForm, Controller, get } from "react-hook-form";
import { uncontrolled_filters_state, form_schema_state } from "../states";
import { useRecoilState } from "recoil";
import FilterInput from "./FilterInput";

const Filter = () => {
  const [uncontrolled_filters, setUncontrolledFilters] = useRecoilState(
    uncontrolled_filters_state
  );
  const [form_schema, setFormSchema] = useRecoilState(form_schema_state);

  const default_values = {};
  for (const schema of form_schema) {
    default_values[schema.name] = schema.default;
  }
  const { control, handleSubmit } = useForm({
    defaultValues: default_values,
  });

  return (
    <div className="filters">
      <div>Filter</div>

      {form_schema.map((schema) => (
        <Controller
          key={schema.name}
          name={schema.name}
          control={control}
          render={({ field }) => <FilterInput {...field} {...schema} />}
        />
      ))}

      <button
        onClick={handleSubmit((values) => setUncontrolledFilters(values))}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
