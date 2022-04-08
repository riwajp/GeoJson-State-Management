import { useForm, Controller } from "react-hook-form";

import FilterInput from "./FilterInput";

const Filter = ({
  form_schema,
  setUncontrolledFilters,
  setControlledFilters,
  controlled_filters,
}) => {
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
