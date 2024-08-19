import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    
  },
  reducers: {
    savingNewNote: (state) => {
        state.isSaving = true
    },
    addNewEmptyNote: (state, { payload }) => {
        state.notes.push(payload)
        state.isSaving = false
    },
    setActiveNote: (state, action) => {
        state.active = action.payload
        state.messageSaved = ""
    },
    setNotes: (state, { payload }) => {
        state.notes = payload
    },
    setSaving: (state, action) => {
      state.isSaving = true
      state.messageSaved = ""

    },
    updateNote:(state, action)=>{
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if(note.id === action.payload.id){
          return action.payload
        }
        return note
      })

      state.messageSaved = `${action.payload.id} actualizada correctamente`

    },

    setPhotoToActiveNote:(state, action) => {
      
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload];
      state.isSaving = false
    },

    clearNotesLogout: (state) => {
      state.isSaving = false
      state.notes = [],
      state.messageSaved = "",
      state.active = null
    },
    
    deleteNoteById:(state, action)=>{
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },

  },
});

export const { addNewEmptyNote,setActiveNote,setNotes,setSaving,deleteNoteById,savingNewNote,updateNote,setPhotoToActiveNote,clearNotesLogout } = journalSlice.actions;
export default journalSlice.reducer;
