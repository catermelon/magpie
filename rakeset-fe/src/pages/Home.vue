<template>
  <q-page class="home">
    <h1>hi {{ auth.username }}</h1>
  </q-page>
</template>

<script>
import authStore from "src/store/authStore";
import { api } from "boot/axios";

export default {
  name: "Home",
  data: () => ({
    message: "no message",
  }),
  setup() {
    const auth = authStore();

    return {
      // you can return the whole store instance to use it in the template
      auth,
    };
  },
  methods: {
    // This calls the backend service and passes along
    // the auth code and our state code
    async checkSession(event) {
      await api
        .get("/api/session")
        .then((response) => {
          console.log(response);
          this.message = "all good";
        })
        .catch((error) => {
          console.log(error);
          this.message = "no";
        });
    },
  },
};
</script>
