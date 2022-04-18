<template>
  <q-page class="login">
    <q-page-sticky position="top" :offset="[0, 32]">
      <div class="oauth-spinner">
        <span class="spinner"><q-spinner-grid /></span>
        <p class="spinner-text">{{ status }}</p>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "OAuthCallback",
  // These come from vue-router passing down the
  // query params as props
  props: {
    code: String,
    state: String,
    error: String,
  },
  data: () => ({
    status: "Just a sec...",
  }),
  mounted() {
    this.validate();
  },
  methods: {
    async validate() {
      const isValid = await this.$api.oauth.verify(this.code, this.state);
      if (isValid) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
