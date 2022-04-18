<template>
  <div class="oauth-spinner">
    <span class="spinner"><q-spinner-grid /></span>
    <p class="spinner-text">{{ status }}</p>
  </div>
</template>

<script>
/* OAuth callback page */

export default {
  name: "OAuthSpinner",
  props: {
    code: String,
    error: String,
    state: String,
  },
  data: () => ({
    status: "Just a sec...",
  }),
  /*created() {
    this.verify();
  },*/

  methods: {
    // FIXME - pull all of this sync code up to
    // a library or somethin
    async verifyOAuthCallback(event) {
      this.$router.push({ name: "worky" });
      await this.$api.auth
        .verify(this.code, this.state)
        // If everything comes back okay, that means the
        // code is valid and we're logged in.
        .then((response) => {
          auth.store_username(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
