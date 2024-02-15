import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  celebrities: [],
  selectedCelebrity: null,
  celebrityBeingEdited: null,
};

const celebritySlice = createSlice({
  name: "celebritySlice",
  initialState,
  reducers: {
    setAllCelebrities(state, action) {
      state.celebrities = action.payload.celebrities;
    },
    setSelectedCelebrity(state, action) {
      state.selectedCelebrity = action.payload.celebrity;
    },
    setCelebrityBeingEdited(state, action) {
      state.celebrityBeingEdited = action.payload.celebrity;
    },
    updateCelebrity(state, action) {
      const updatedCeleb = action.payload.celebrity;
      let celebrityIndex = state.celebrities.findIndex(
        (c) => c.id === updatedCeleb.id
      );
      state.celebrities[celebrityIndex] = updatedCeleb;
    },
    deleteCelebrity(state, action) {
      const deletedCeleb = action.payload.celebrity;
      state.celebrities = state.celebrities.filter(
        (c) => c.id !== deletedCeleb.id
      );
    },
  },
});

export const actions = celebritySlice.actions;

export default celebritySlice;
