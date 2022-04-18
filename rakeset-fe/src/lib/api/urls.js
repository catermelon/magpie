export default ($api, $store) => ({
  get_list() {
    return $api.get("/api/urls").then((response) => {
      return response.data.result;
    });
  },

  create_new(data) {
    // FIXME - add error handling
    return $api.post("/api/urls", data);
  },
});
