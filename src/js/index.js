import router from "./router/index.js";
import ui from "./ui/index.js";
//import via cdn for cypress to work
import * as bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js";
ui();
router();
