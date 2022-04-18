<template>
  <q-page class="login">
    <q-page-sticky position="top" :offset="[0, 32]">
      <q-card flat bordered align="center">
        <div class="q-pa-lg">
          <q-card-section>
            <div class="text-h6">Hive Beta</div>
          </q-card-section>

          <q-separator inset class="q-my-md" />

          <q-card-actions align="center">
            <DiscordButton />
          </q-card-actions>
        </div>
      </q-card>
    </q-page-sticky>
  </q-page>
</template>

<script>
// @ is an alias to /src
import DiscordButton from "components/auth/DiscordButton.vue";

export default {
  name: "Login",
  components: {
    DiscordButton,
  },
};
</script>
