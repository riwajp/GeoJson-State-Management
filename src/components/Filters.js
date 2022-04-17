import { useForm, Controller } from "react-hook-form";
import { _filter_state } from "./states";
import FilterInput from "./FilterInput";
import Controlled from "./Controlled";

import { useSetRecoilState } from "recoil";

const Filters = ({ form_schema }) => {
  const setFilters = useSetRecoilState(_filter_state);

  //extract default values
  const default_values = {};
  for (const schema of form_schema) {
    default_values[schema.name] = schema.default;
  }

  //react hook form
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
            render={({ field }) => <FilterInput {...field} {...schema} />}
          />
        ) : (
          <Controlled
            render={(controlled_filters) => (
              <FilterInput
                key={schema.name}
                {...schema}
                setControlledFilters={(values) =>
                  setFilters((i) => ({ ...i, controlled: values }))
                }
                controlled_filters={controlled_filters}
              />
            )}
          />
        )
      )}

      <button
        onClick={handleSubmit((values) =>
          setFilters((i) => ({ ...i, uncontrolled: values }))
        )}
      >
        Filter
      </button>
    </div>
  );
};

export default Filters;
