import { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadImage({ onUpload }) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async () => {
        if (image) {
            setUploading(true);
            const imageRef = ref(storage, `images/${image.name}`);
            try {
                await uploadBytes(imageRef, image);
                const url = await getDownloadURL(imageRef);
                setUploading(false);
                onUpload(url);
                alert("Image uploaded successfully!");
            } catch (error) {
                alert(`Upload failed: ${error.message}`);
                setUploading(false);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleImageUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
}
