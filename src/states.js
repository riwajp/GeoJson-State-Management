import { atom, selector } from "recoil";
import { filter } from "./components/utils";

const states_state = atom({
  key: "states",
  default: null,
});

//filter states

const uncontrolled_filters_state = atom({
  key: "uncontrolled_filters",
  default: {},
});

const form_schema_state = atom({
  key: "form_schema",
  default: [
    {
      name: "search",
      type: "text",
      default: "",
      placeholder: "Starts with...",
    },
    { name: "search1", type: "text", default: "", placeholder: "Ends With..." },
    {
      name: "search2",
      type: "select",
      placeholder: "Density",
      label: "Density",
      options: [
        { label: ">0", value: [0, 300] },
        { label: "0-50", value: [1, 50] },
        { label: "51-100", value: [51, 100] },
        { label: "101-150", value: [101, 150] },
        { label: "Others(>150)", value: [151, 300] },
      ],
    },
  ],
});

//filter schema
const filter_schema_state = atom({
  key: "filter_schema",
  default: [
    {
      key: "name",
      type: "starts_with",
      value: "search",
    },

    {
      key: "name",
      type: "ends_with",
      value: "search1",
    },

    { key: "density", type: "range", value: "search2" },
  ],
});

const filtered_states_state = selector({
  key: "filtered_states",
  get: ({ get }) => {
    if (get(states_state) !== null) {
      let filtered_data = get(states_state);
      for (const schema of get(filter_schema_state)) {
        filtered_data = filter({
          data: filtered_data,
          schema: {
            ...schema,
            value: get(uncontrolled_filters_state)[schema.value],
          },
        });
      }

      return filtered_data;
    } else {
      return null;
    }
  },
});

export {
  states_state,
  uncontrolled_filters_state,
  filtered_states_state,
  form_schema_state,
};
