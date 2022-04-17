import { atom } from "recoil";

export const _data_state = atom({
  key: "data_state",
  default: [],
});

export const _schema_state = atom({
  key: "schema_state",
  default: { form_schema: [], filter_schema: [] },
});

export const _filter_state = atom({
  key: "filter_states",
  default: { controlled: [], uncontrolled: [] },
});
