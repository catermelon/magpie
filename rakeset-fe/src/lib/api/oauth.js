import useAuthStore from "src/store/authStore";

export default ($api, $store) => ({
  current_user() {
    return $api.get("/api/session");
  },

  redirect_url() {
    return $api
      .get("/api/auth")
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        return response.data.redirectTo;
      });
  },

  verify(code, state) {
    const authStore = useAuthStore();
    if (code === undefined || state === undefined) {
      return false;
    }
    return $api
      .post("/api/auth/verify", null, {
        params: {
          code: code,
          state: state,
        },
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        authStore.store_username(response.data.username);
        return response.data.username;
      });
  },

  /* TODO not actually implemented yet
  destroy_session() {
    return $api.delete("/api/session");
  },
  */
});
