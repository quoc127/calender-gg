import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getEvents = async () => {
  return axios.get(`${serverUrl}/`);
};

export const addEvent = async (eventData) => {
  try {
    return axios.post(`${serverUrl}/add`, eventData);
  } catch (error) {
    console.log(error);
  }
};

export const patchEvent = async (id, eventData) => {
  try {
    return await axios.patch(`${serverUrl}/update/${id}`, eventData);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    return await axios.delete(`${serverUrl}/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};
