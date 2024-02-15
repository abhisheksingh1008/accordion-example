import { configureStore } from "@reduxjs/toolkit";
import celebritySlice from "./celebritySlice";

const store = configureStore({
  reducer: {
    celebrity: celebritySlice.reducer,
  },
});

export default store;
