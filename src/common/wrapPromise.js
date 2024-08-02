export default function wrapPromise(promise) {
  let state = "pending";
  let result = null;
  promise
    .then((res) => {
      state = "complete";
      result = res;
    })
    .catch((err) => {
      state = "error";
      result = err;
    });
  return () => {
    switch (state) {
      case "complete":
        return result;
      case "error":
        throw result;
      default:
        throw promise;
    }
  };
}
