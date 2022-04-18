<template>
  <q-btn
    unelevated
    rounded
    class="discord-button"
    icon="discord"
    label="Login with Discord"
    @click="redirect"
  />
</template>

<script>
export default {
  name: "DiscordButton",
  data: () => ({
    url: null,
  }),
  created() {
    // fetch on init
    this.fetchURL();
  },
  methods: {
    async fetchURL() {
      this.url = await this.$api.oauth.redirect_url();
    },
    redirect(event) {
      window.location.href = this.url;
    },
  },
};
</script>
