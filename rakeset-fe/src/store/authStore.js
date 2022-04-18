import { defineStore } from "pinia";
import { SessionStorage } from "quasar";

const USERNAME_KEY = "username";

/*
  Never store anything valuable in here.
  Nothing in here should be trusted.

  These are convienence variables used by the UI
  for display only.

  The actual user auth token is in the (login) session
  cookie that the backend service sets. That cookie
  is HttpOnly and can't be accessed by this fe code.

  the "synced" property just means "we asked the backend if we have a valid session cookie and they said yes "

*/
const authStore = defineStore("authStore", {
  state: () => {
    return {
      username: SessionStorage.getItem(USERNAME_KEY) || undefined,
    };
  },
  getters: {
    authenticated: (state) => state.username !== undefined,
  },
  actions: {
    store_username(username) {
      SessionStorage.set(USERNAME_KEY, username);
      this.username = username;
    },
  },
});

export default authStore;
