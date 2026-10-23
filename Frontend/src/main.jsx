import { createRoot } from "react-dom/client";
import "./index.css";
import MainRoutes from "./app/routes/MainRoutes.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>

<MainRoutes />
    </Provider>
);
