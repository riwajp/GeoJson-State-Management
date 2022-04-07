const filter = ({ data, schema }) => {
  const { key, type, value } = schema;

  let result = data;
  if (value) {
    switch (type) {
      case "equal":
        result = data.filter(
          (item) => item.properties[key].toLowerCase() === value.toLowerCase()
        );
        break;
      case "starts_with":
        result = data.filter((item) =>
          item.properties[key].toLowerCase().startsWith(value.toLowerCase())
        );
        break;

      case "contains":
        result = data.filter((item) =>
          item.properties[key].toLowerCase().includes(value.toLowerCase())
        );
        break;

      case "ends_with":
        result = data.filter((item) =>
          item.properties[key].toLowerCase().endsWith(value.toLowerCase())
        );
        break;
      case "range":
        result = data.filter(
          (item) =>
            item.properties[key] >= parseFloat(value.split(",")[0]) &&
            item.properties[key] <= parseFloat(value.split(",")[1])
        );
        break;
    }
  }

  return result;
};

export { filter };
