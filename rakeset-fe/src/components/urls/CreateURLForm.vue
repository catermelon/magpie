<template>
  <q-form>
    <q-input outlined v-model="text" label="URL" />
    <q-toggle v-model="value" label="Specify key" />
    <q-input
      outlined
      v-model="text"
      label="key"
      :rules="[(val) => val.length >= 5 || 'Must be at least 5 characters']"
    />
    <q-btn label="Submit" type="submit" color="primary" />
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
  </q-form>
</template>

<script>
export default {
  name: "CreateURLForm",
};
</script>
