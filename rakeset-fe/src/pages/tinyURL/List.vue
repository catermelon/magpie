<template>
  <q-page class="tiny-url">
    <h2>{{ $route.meta.pageTitle }}</h2>
    <q-card>
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id">
              <span>https://bzz.li/{{ props.row.id }}</span>
            </q-td>
            <q-td key="url">
              <span>
                {{ props.row.url }}
              </span>
            </q-td>
            <q-td key="created">
              {{ relativeDate(props.row.created) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <div class="add-to-table row justify-end q-gutter-y-md">
      <q-dialog
        v-model="addURLPrompt"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card style="width: 500px; max-width: 70vw">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Add new URL</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit="this.onSubmitUrl">
              <div class="row">
                <q-input
                  outlined
                  v-model="tinyURLRedirect"
                  label="URL"
                  class="col-12"
                />
              </div>

              <div class="row">
                <q-input outlined v-model="tinyURLKey" label="key" />
              </div>
              <div class="row">
                <q-btn
                  label="Submit"
                  type="submit"
                  color="primary"
                  v-close-popup
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-btn
        dense
        round
        unelevated
        color="pink-13"
        icon="add"
        size="lg"
        @click="addURLPrompt = true"
      />
    </div>
  </q-page>
</template>

<script>
const relativeTime = require("dayjs/plugin/relativeTime");
const dayjs = require("dayjs").extend(relativeTime);

import { ref } from "vue";

export default {
  name: "urlList",
  data: () => ({
    rows: [],
    columns: [
      {
        name: "id",
        required: true,
        label: "Short",
        align: "left",
        sortable: true,
      },
      {
        name: "url",
        required: true,
        label: "Redirects to",
        align: "left",
        sortable: true,
      },
      {
        name: "created",
        required: true,
        label: "Created",
        align: "left",
        sortable: true,
      },
    ],
  }),

  created() {
    // fetch on init
    this.fetchData();
  },
  methods: {
    // a computed getter
    relativeDate(timestamp) {
      // `this` points to the component instance
      return dayjs(timestamp).fromNow();
    },

    async fetchData() {
      this.rows = await this.$api.urls.get_list();
    },
    async onSubmitURL() {
      // FIXME - change to form valication
      console.log("got here");

      const result = await this.$api.urls.create_new({
        redirect: tinyURLRedirect.value,
        key: tinyURLKey,
      });

      console.log(result);
    },
  },
  setup() {
    return {
      addURLPrompt: ref(false),
      tinyURLRedirect: ref(""),
      tinyURLKey: ref(""),
    };
  },
};
</script>
