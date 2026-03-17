import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageUpload({ photo, onUpload, onRemove }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error("Faqat JPG yoki PNG formatdagi rasmlar qabul qilinadi!");
      return;
    }

    // Validate size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Rasm hajmi 2MB dan oshmasligi kerak!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpload(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload-wrapper">
      {photo ? (
        <div className="image-preview">
          <img src={photo} alt="Profil" />
          <button
            onClick={() => {
              onRemove();
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="image-remove-overlay"
            title="O'chirish"
            type="button"
          >
            <X size={24} color="white" />
          </button>
        </div>
      ) : (
        <div 
          className="image-placeholder"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="image-placeholder-icon" />
          <span className="image-placeholder-text">Yuklash</span>
        </div>
      )}
      
      <div className="image-upload-info">
        <p>Profil rasmini yuklang (Majburiy emas). Format: JPG, PNG. Max: 2MB.</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-outline"
        >
          {photo ? 'Rasmni o\'zgartirish' : 'Rasm tanlash'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/jpeg,image/png,image/jpg" 
          className="hidden-input" 
        />
      </div>
    </div>
  );
}
