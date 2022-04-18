<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="180"
      :breakpoint="500"
    >
      <!-- drawer content -->

      <q-toolbar class="sidebar">
        <q-toolbar-title>
          <q-img src="../../public/logos/rakeset2.svg"> </q-img>
        </q-toolbar-title>
      </q-toolbar>

      <q-list padding>
        <q-item
          v-for="item in sidebarItems"
          :key="item.id"
          :to="item.link"
          clickable
          v-ripple
          class="text-white"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section> {{ item.label }}</q-item-section>
        </q-item>
      </q-list>

      <div id="drawer-collapse">
        <q-btn
          dense
          round
          unelevated
          color="cyan-8"
          :icon="!drawer || miniState ? 'chevron_right' : 'chevron_left'"
          @click="miniState = true"
        />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainLayout",
  data: () => ({
    sidebarItems: [
      {
        id: "tinyurl",
        icon: "link",
        label: "Tracking URL",
        link: "/urls",
      },
    ],
  }),
  setup() {
    const miniState = ref(false);

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
};
</script>
