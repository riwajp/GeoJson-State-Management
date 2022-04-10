import { useForm, Controller } from "react-hook-form";

import FilterInput from "./FilterInput";
import { useContext } from "react";
import { AppContext } from "../App";

const Filter = ({}) => {
  const {
    form_schema,
    setUncontrolledFilters,
    setControlledFilters,
    controlled_filters,
  } = useContext(AppContext);

  const default_values = {};
  for (const schema of form_schema) {
    default_values[schema.name] = schema.default;
  }
  const { control, handleSubmit } = useForm({
    defaultValues: default_values,
  });

  return (
    <div className="filters">
      <h3>Filter</h3>

      {form_schema.map((schema) =>
        !schema.controlled ? (
          <Controller
            key={schema.name}
            name={schema.name}
            control={control}
            render={({ field }) => (
              <FilterInput
                {...field}
                {...schema}
                setControlledFilters={setControlledFilters}
                controlled_filters={controlled_filters}
              />
            )}
          />
        ) : (
          <FilterInput
            key={schema.name}
            {...schema}
            setControlledFilters={setControlledFilters}
            controlled_filters={controlled_filters}
          />
        )
      )}

      <button
        onClick={handleSubmit((values) => setUncontrolledFilters(values))}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
