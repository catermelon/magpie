<template>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none"><CreateURLForm /> </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CreateURLForm } from "./CreateURLForm.vue";

export default {
  name: "CreateURLDialog",
  components: {
    CreateURLForm,
  },
};
</script>
