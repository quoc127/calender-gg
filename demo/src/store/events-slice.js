import { addEvent, deleteEvent, getEvents, patchEvent } from "@/service/event";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsData: [],
};

export const fetchAllEvents = createAsyncThunk("get-all-events", async () => {
  const response = await getEvents();
  return response.data;
});

export const postEvents = createAsyncThunk("post-events", async (eventData) => {
  const response = await addEvent(eventData);
  return response.data;
});

export const patchEvents = createAsyncThunk("patch-events", async ({ id, eventData }) => {
  const response = await patchEvent(id,eventData);
  return response.data;
});

export const removeEvents = createAsyncThunk("delete-events", async (id) => {
  const response = await deleteEvent(id);
  return response.data;
});

const eventsSlice = createSlice({
  name: "events",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, () => {})
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.eventsData = action.payload.data;
      })
      .addCase(fetchAllEvents.rejected, (state) => {
        state.eventsData = [];
      });
  },
});

export default eventsSlice.reducer;
