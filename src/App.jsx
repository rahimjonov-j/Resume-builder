import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Download, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Form from './components/Form';
import Preview from './components/Preview';

const initialData = {
  personal: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    photo: '',
  },
  experience: [
    {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    }
  ],
  education: [
    {
      id: Date.now().toString(),
      school: '',
      degree: '',
      location: '',
      date: '',
    }
  ],
  skills: [],
};

// Valid email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef(null);

  const handleFieldChange = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleRootChange = (section, field, value) => {
     setData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (section, id, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddArrayItem = (section) => {
    const newItem = section === 'experience'
      ? { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }
      : { id: Date.now().toString(), school: '', degree: '', location: '', date: '' };

    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const handleRemoveArrayItem = (section, id) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, jobTitle, email, phone } = data.personal;

    if (!firstName.trim()) newErrors.firstName = "Ism kiritish majburiy";
    if (!lastName.trim()) newErrors.lastName = "Familiya kiritish majburiy";
    if (!jobTitle.trim()) newErrors.jobTitle = "Lavozim kiritish majburiy";
    if (!email.trim()) {
      newErrors.email = "Email kiritish majburiy";
    } else if (!emailRegex.test(email)) {
       newErrors.email = "Noto'g'ri email formati";
    }
    if (!phone.trim()) newErrors.phone = "Telefon raqam kiritish majburiy";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Iltimos barcha majburiy maydonlarni to'g'ri to'ldiring!");
      return false;
    }
    return true;
  };

  const downloadPDF = async () => {
    if (!validateForm()) return;
    
    if (!previewRef.current) return;
    
    try {
      setIsExporting(true);
      const loadingToast = toast.loading("PDF yuklanmoqda...");

      // Small delay to ensure any layout shifts are complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const pdfWidth = 210;
      const pdfHeight = 297;
      const calcHeight = pdfWidth / ratio;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, calcHeight));
      
      pdf.save(`${data.personal.firstName || 'User'}_${data.personal.lastName || 'Resume'}.pdf`);
      
      toast.success("PDF muvaffaqiyatli yuklandi!", { id: loadingToast });
    } catch (error) {
       console.error(error);
       toast.error("PDF yuklashda xatolik yuz berdi.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Barcha ma'lumotlarni o'chirib yubormoqchimisiz? Yozganlaringiz qayta tiiklanmaydi.")) {
      setData(initialData);
      setErrors({});
      toast.success("Barcha maydonlar tozalandi.");
    }
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="header">
        <div className="header-logo">
         
           <h1 className="header-title hide-sm">CV Yaratuvchi</h1>
        </div>
        
        <div className="header-actions">
          <button onClick={handleReset} className="btn btn-secondary">
            <Trash2 size={16} />
            <span className="hide-sm">Tozalash</span>
          </button>
          
          <button onClick={downloadPDF} disabled={isExporting} className="btn btn-primary">
            <Download size={16} />
            <span className="hide-sm">{isExporting ? 'Yuklanmoqda...' : 'Yuklab olish'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left: Form Area */}
        <div className="form-area">
          <Form 
            data={data}
            onChange={(section, field, value) => {
              if (section === 'root') {
                 handleRootChange(section, field, value);
              } else {
                 handleFieldChange(section, field, value);
              }
            }}
            onAddArrayItem={handleAddArrayItem}
            onRemoveArrayItem={handleRemoveArrayItem}
            onArrayChange={handleArrayChange}
            errors={errors}
          />
        </div>

        {/* Right: Preview Area */}
        <div className="preview-area">
           {/* Wrapper to handle scaling nicely on smaller screens */}
           <div className="preview-wrapper">
             <Preview data={data} ref={previewRef} />
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;
