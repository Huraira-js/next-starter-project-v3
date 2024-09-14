export const apiUrl = "https://cp8qzm1b-3093.inc1.devtunnels.ms";
export const s3Url = "";
export const imageUrl = (url) => `${s3Url}/${url}`;
export const PAYPAL_CLIENT_ID = "";
export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
export const mediaUrl = (url) => `${s3Url}/${url}`;

export const firebaseVapidObject = {
  vapidKey: "",
};
