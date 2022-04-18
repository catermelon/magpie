import { boot } from "quasar/wrappers";
import api from "src/lib/api/index";

export default boot(({ app}) => {
  // use this in Vue files by this.$api
  app.config.globalProperties.$api = api;
});

export { api };
