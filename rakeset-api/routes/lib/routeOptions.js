/* FIXME - this should let you pass in other options 
and it shouldn't override 'config' */
function routeOptions(opts) {
  let result = {};

  if (opts.unprotected === true) {
    result["config"] = { unprotectedRoute: true };
  }

  if (opts.schema) {
    result["schema"] = opts.schema;
  }

  return result;
}

module.exports = routeOptions;
