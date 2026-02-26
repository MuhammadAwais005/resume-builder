import React, { useState } from 'react';
import { 
  Briefcase, GraduationCap, Code, User, Plus, Trash2, Sparkles, 
  Award, Heart, BookOpen, ChevronDown, ChevronUp 
} from 'lucide-react';

const ResumeForm = ({ data, handlePersonalChange, handleImageUpload, addField, removeField, updateField, handleListChange, handleAiEnhance, loading }) => {
  
  // Helper to toggle sections to save space
  const [activeSection, setActiveSection] = useState('personal');
  const toggle = (section) => setActiveSection(activeSection === section ? null : section);

  // Trigger AI
  const triggerAi = async (text, section, index, field) => {
    const enhanced = await handleAiEnhance(text, section);
    if (enhanced) {
      if (index !== null) updateField(section, index, field, enhanced);
      else handlePersonalChange({ target: { name: 'summary', value: enhanced } });
    }
  };

  const SectionTitle = ({ id, icon: Icon, title }) => (
    <div 
      className="flex justify-between items-center cursor-pointer p-4 bg-slate-50 border-b border-slate-200 hover:bg-slate-100 transition"
      onClick={() => toggle(id)}
    >
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <Icon className="text-blue-600" size={20} /> {title}
      </h2>
      {activeSection === id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden pb-4">
      
      {/* 1. PERSONAL DETAILS */}
      <SectionTitle id="personal" icon={User} title="Personal Details" />
      {activeSection === 'personal' && (
        <div className="p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border">
              {data.image && <img src={data.image} alt="Profile" className="w-full h-full object-cover" />}
            </div>
            <label className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-100 transition">
              Upload Photo <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" value={data.personal.fullName} onChange={handlePersonalChange} className="input-field" />
            <input type="text" name="jobTitle" placeholder="Job Title" value={data.personal.jobTitle} onChange={handlePersonalChange} className="input-field" />
            <input type="email" name="email" placeholder="Email" value={data.personal.email} onChange={handlePersonalChange} className="input-field" />
            <input type="text" name="phone" placeholder="Phone" value={data.personal.phone} onChange={handlePersonalChange} className="input-field" />
            <input type="text" name="linkedin" placeholder="LinkedIn" value={data.personal.linkedin} onChange={handlePersonalChange} className="input-field" />
            <input type="text" name="github" placeholder="GitHub" value={data.personal.github} onChange={handlePersonalChange} className="input-field" />
            <input type="text" name="website" placeholder="Portfolio / Website" value={data.personal.website} onChange={handlePersonalChange} className="input-field" />
          </div>
          <div className="relative">
             <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-slate-500">Summary</label>
                <button onClick={() => triggerAi(data.personal.jobTitle || "Professional", 'summary', null, 'summary')} className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    <Sparkles size={10} /> AI Write
                </button>
            </div>
            <textarea name="summary" rows="3" placeholder="Professional Summary..." value={data.personal.summary} onChange={handlePersonalChange} className="input-field w-full" />
          </div>
        </div>
      )}

      {/* 2. EXPERIENCE */}
      <SectionTitle id="experience" icon={Briefcase} title="Work Experience" />
      {activeSection === 'experience' && (
        <div className="p-6 space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded border relative">
               <button onClick={() => removeField('experience', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
               <div className="grid grid-cols-2 gap-3 mb-2">
                 <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateField('experience', index, 'company', e.target.value)} className="input-field" />
                 <input type="text" placeholder="Role" value={exp.role} onChange={(e) => updateField('experience', index, 'role', e.target.value)} className="input-field" />
                 <input type="text" placeholder="Date" value={exp.date} onChange={(e) => updateField('experience', index, 'date', e.target.value)} className="input-field" />
                 <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateField('experience', index, 'location', e.target.value)} className="input-field" />
               </div>
               <textarea rows="3" placeholder="Responsibilities..." value={exp.description} onChange={(e) => updateField('experience', index, 'description', e.target.value)} className="input-field w-full" />
               <button onClick={() => triggerAi(exp.role, 'experience', index, 'description')} className="text-xs text-blue-600 font-bold mt-1 flex gap-1"><Sparkles size={10} /> Enhance</button>
            </div>
          ))}
          <button onClick={() => addField('experience', { company: '', role: '', date: '', location: '', description: '' })} className="add-btn"><Plus size={14} /> Add Job</button>
        </div>
      )}

      {/* 3. PROJECTS */}
      <SectionTitle id="projects" icon={Code} title="Projects" />
      {activeSection === 'projects' && (
        <div className="p-6 space-y-4">
           {data.projects.map((proj, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded border relative">
               <button onClick={() => removeField('projects', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
               <div className="grid grid-cols-2 gap-3 mb-2">
                 <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateField('projects', index, 'name', e.target.value)} className="input-field" />
                 <input type="text" placeholder="Tech Stack" value={proj.tech} onChange={(e) => updateField('projects', index, 'tech', e.target.value)} className="input-field" />
                 <input type="text" placeholder="Link" value={proj.link} onChange={(e) => updateField('projects', index, 'link', e.target.value)} className="input-field col-span-2" />
               </div>
               <textarea rows="2" placeholder="Description..." value={proj.description} onChange={(e) => updateField('projects', index, 'description', e.target.value)} className="input-field w-full" />
            </div>
          ))}
          <button onClick={() => addField('projects', { name: '', tech: '', link: '', description: '' })} className="add-btn"><Plus size={14} /> Add Project</button>
        </div>
      )}

      {/* 4. EDUCATION */}
      <SectionTitle id="education" icon={GraduationCap} title="Education" />
      {activeSection === 'education' && (
        <div className="p-6 space-y-4">
           {data.education.map((edu, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded border relative flex gap-2">
                <button onClick={() => removeField('education', index)} className="absolute top-2 right-2 text-red-400"><Trash2 size={14}/></button>
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateField('education', index, 'degree', e.target.value)} className="input-field" />
                <input type="text" placeholder="School" value={edu.school} onChange={(e) => updateField('education', index, 'school', e.target.value)} className="input-field" />
                <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateField('education', index, 'year', e.target.value)} className="input-field w-24" />
            </div>
           ))}
           <button onClick={() => addField('education', { degree: '', school: '', year: '' })} className="add-btn"><Plus size={14} /> Add Education</button>
        </div>
      )}

      {/* 5. SKILLS & LANGUAGES */}
      <SectionTitle id="skills" icon={Sparkles} title="Skills & Languages" />
      {activeSection === 'skills' && (
        <div className="p-6 space-y-4">
           <div>
              <label className="text-xs font-medium text-slate-500">Technical Skills</label>
              <textarea value={data.skills} onChange={(e) => handleListChange(e, 'skills')} placeholder="Python, Django, React..." className="input-field w-full" />
           </div>
           <div>
              <label className="text-xs font-medium text-slate-500">Languages</label>
              <textarea value={data.languages} onChange={(e) => handleListChange(e, 'languages')} placeholder="English, Spanish..." className="input-field w-full" />
           </div>
           <div>
              <label className="text-xs font-medium text-slate-500">Interests</label>
              <textarea value={data.interests} onChange={(e) => handleListChange(e, 'interests')} placeholder="Reading, Traveling..." className="input-field w-full" />
           </div>
        </div>
      )}

      {/* 6. CERTIFICATIONS & AWARDS (NEW!) */}
      <SectionTitle id="awards" icon={Award} title="Certifications & Awards" />
      {activeSection === 'awards' && (
        <div className="p-6 space-y-4">
           {/* Certifications */}
           <h3 className="text-sm font-bold text-slate-700">Certifications</h3>
           {data.certifications.map((cert, index) => (
             <div key={index} className="flex gap-2 items-center mb-2">
                <input type="text" placeholder="Certificate Name (e.g. AWS Cloud)" value={cert.name} onChange={(e) => updateField('certifications', index, 'name', e.target.value)} className="input-field" />
                <input type="text" placeholder="Year" value={cert.year} onChange={(e) => updateField('certifications', index, 'year', e.target.value)} className="input-field w-24" />
                <button onClick={() => removeField('certifications', index)} className="text-red-400"><Trash2 size={16}/></button>
             </div>
           ))}
           <button onClick={() => addField('certifications', { name: '', year: '' })} className="add-btn mb-4"><Plus size={14} /> Add Cert</button>

           {/* Awards */}
           <h3 className="text-sm font-bold text-slate-700 border-t pt-4">Awards / Volunteer</h3>
           {data.awards.map((awd, index) => (
             <div key={index} className="flex gap-2 items-center mb-2">
                <input type="text" placeholder="Award / Volunteer Title" value={awd.title} onChange={(e) => updateField('awards', index, 'title', e.target.value)} className="input-field" />
                <input type="text" placeholder="Details" value={awd.details} onChange={(e) => updateField('awards', index, 'details', e.target.value)} className="input-field" />
                <button onClick={() => removeField('awards', index)} className="text-red-400"><Trash2 size={16}/></button>
             </div>
           ))}
           <button onClick={() => addField('awards', { title: '', details: '' })} className="add-btn"><Plus size={14} /> Add Award</button>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .input-field { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; outline: none; transition: 0.2s; }
        .input-field:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1); }
        .add-btn { display: flex; align-items: center; gap: 5px; color: #2563eb; font-weight: 600; font-size: 0.85rem; padding: 6px 10px; border-radius: 6px; background: #eff6ff; transition: 0.2s; }
        .add-btn:hover { background: #dbeafe; }
      `}</style>
    </div>
  );
};

export default ResumeForm;