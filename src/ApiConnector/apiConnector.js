// src/ApiConnector/apiConnector.js
import axios from "axios";

export const apiConnector = async (method, url, bodyData, config = {}) => {
  try {
    const isFormData = bodyData instanceof FormData;

    const response = await axios({
      method,
      url,
      data: bodyData,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(config.headers || {}),
      },
      withCredentials: config.withCredentials ?? false,
      ...config, // safe spread (after headers and data)
    });

    return response;
  } catch (error) {
    console.error("API Connector Error:", error?.response || error.message);
    throw error?.response || error;
  }
};
