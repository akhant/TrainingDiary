export default function (errors) {
  const result = {};
  errors.map((val, key) => {
    result[key] = val.message;
  });
  return result;
}
