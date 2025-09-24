export async function uploadAudioToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  data.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER || "audio");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();

  if (json.secure_url) {
    return json.secure_url; 
  } else {
    throw new Error("Cloudinary upload failed: " + JSON.stringify(json));
  }
}
