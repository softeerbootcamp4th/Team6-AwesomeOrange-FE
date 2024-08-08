export default function use(promise) {
  if(promise.status === "resolved") return promise.value;
  if(promise.status === "rejected") throw promise.error;
  if(promise.status === "pending") throw promise;

  promise.status = "pending";
  promise.then( e=>{
    promise.status = "resolved";
    promise.value = e;
    return e;
  } ).catch( e=>{
    promise.status = "rejected";
    promise.error = e;
  } );

  throw promise;
}