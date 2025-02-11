import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getEvents = async () => {
  try {
    const response = await axios.get(`${serverUrl}/`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.response || error);
    throw error;
  }
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
