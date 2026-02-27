import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Download, Palette, Layout, Sparkles } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [resumeData, setResumeData] = useState({
    personal: { fullName: '', jobTitle: '', email: '', phone: '', linkedin: '', github: '', website: '', summary: '' },
    image: null,
    education: [],
    experience: [],
    projects: [],
    skills: '',
    languages: '',
    certifications: [],
    awards: [],
    interests: '',
    volunteer: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern-blue'); 
  const [loading, setLoading] = useState(false);
  const printRef = useRef(null);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setResumeData((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const addField = (section, newItem) => {
    setResumeData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeField = (section, index) => {
    setResumeData((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const updateField = (section, index, field, value) => {
    const newList = [...resumeData[section]];
    newList[index][field] = value;
    setResumeData((prev) => ({ ...prev, [section]: newList }));
  };

  const handleListChange = (e, field) => {
    setResumeData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAiEnhance = async (promptText, sectionType) => {
    if (!promptText) return null;
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    try {
      const response = await axios.post(`${API_URL}/api/enhance/`, {
        text: promptText,
        type: sectionType,
      });
      return response.data.enhanced_text;
    } catch (error) {
      console.error(error);
      alert("AI Service Unavailable.");
      return promptText;
    } finally {
      setLoading(false);
    }
  };

  // --- THE FIX: STRICT PAGE STYLES FOR MOBILE ---
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personal.fullName || 'Resume'}_CV`,
    // This forces the browser to respect A4 size and remove margins
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20 print:bg-white">
      {/* Navbar - Hidden on Print */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-700">ResumeAI <span className="text-xs text-slate-500">PRO</span></h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <Palette size={16} className="text-slate-500" />
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer text-slate-700"
              >
                <option value="modern-blue">Modern Blue</option>
                <option value="modern-brown">Modern Dark Brown</option>
                <option value="modern-purple">Royal Purple</option>
                <option value="classic">Classic Elegant</option>
                <option value="minimal">Minimalist Clean</option>
              </select>
            </div>

            <button onClick={() => handlePrint && handlePrint()} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-md">
              <Download size={18} /> Save PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Form - Hidden on Print */}
        <div className="w-full lg:w-1/2 h-fit print:hidden">
          <ResumeForm
            data={resumeData}
            handlePersonalChange={handlePersonalChange}
            handleImageUpload={handleImageUpload}
            handleListChange={handleListChange}
            addField={addField}
            removeField={removeField}
            updateField={updateField}
            handleAiEnhance={handleAiEnhance}
            loading={loading}
          />
        </div>

        {/* Right Preview - Visible on Print */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 overflow-x-auto print:shadow-none print:border-none print:overflow-visible">
              <ResumePreview ref={printRef} data={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;