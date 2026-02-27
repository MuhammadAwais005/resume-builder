import React, { forwardRef } from 'react';
import { Mail, Phone, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

const ResumePreview = forwardRef(({ data, template }, ref) => {
  
  // --- HELPER: FIX URLS ---
  const ensureUrl = (url) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  // --- THEME LOGIC ---
  const getThemeColors = () => {
    switch(template) {
      case 'modern-brown': 
        return { header: 'bg-[#3E2723]', text: 'text-[#3E2723]', accent: 'text-[#8D6E63]', border: 'border-[#3E2723]', light: 'bg-[#D7CCC8]', icon: 'text-[#5D4037]' };
      case 'modern-purple': 
        return { header: 'bg-[#7e22ce]', text: 'text-[#7e22ce]', accent: 'text-[#a855f7]', border: 'border-[#7e22ce]', light: 'bg-[#f3e5f5]', icon: 'text-[#6b21a8]' };
      case 'modern-blue': 
      default: 
        return { header: 'bg-slate-900', text: 'text-blue-700', accent: 'text-blue-500', border: 'border-blue-600', light: 'bg-blue-50', icon: 'text-blue-600' };
    }
  };
  const theme = getThemeColors();

  const FormatText = ({ text, className }) => {
    if (!text) return null;
    return <div className={`whitespace-pre-wrap break-words ${className}`}>{text}</div>;
  };

  // --- TEMPLATE 1: MODERN ---
  const ModernTemplate = () => (
    <div className="h-[297mm] bg-white text-slate-800 font-sans flex flex-col">
      <div className={`${theme.header} text-white p-8 flex items-center gap-6 shrink-0`}>
        {data.image && (
          <img src={data.image} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg" />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold uppercase tracking-wider break-words">{data.personal.fullName}</h1>
          <p className="text-xl font-medium mt-1 opacity-90 break-words">{data.personal.jobTitle}</p>
          <FormatText text={data.personal.summary} className="mt-4 text-white/90 text-sm leading-relaxed max-w-xl" />
        </div>
      </div>

      <div className="grid grid-cols-12 flex-1 overflow-hidden">
        <div className="col-span-4 bg-slate-50 p-8 border-r border-slate-200 h-full text-sm">
          <div className="space-y-3 mb-8">
            <h3 className={`font-bold ${theme.text} uppercase tracking-widest border-b-2 border-slate-300 pb-1 mb-3`}>Contact</h3>
            {data.personal.email && <a href={`mailto:${data.personal.email}`} className="flex items-center gap-2 break-all hover:underline"><Mail size={14} className={theme.icon} /> {data.personal.email}</a>}
            {data.personal.phone && <div className="flex items-center gap-2"><Phone size={14} className={theme.icon} /> {data.personal.phone}</div>}
            {data.personal.linkedin && <a href={ensureUrl(data.personal.linkedin)} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all hover:underline text-blue-700 font-medium"><Linkedin size={14} className={theme.icon} /> LinkedIn</a>}
            {data.personal.github && <a href={ensureUrl(data.personal.github)} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all hover:underline text-blue-700 font-medium"><Github size={14} className={theme.icon} /> GitHub</a>}
            {data.personal.website && <a href={ensureUrl(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all hover:underline text-blue-700 font-medium"><Globe size={14} className={theme.icon} /> Portfolio</a>}
          </div>

          {data.education.length > 0 && (
            <div className="mb-8">
              <h3 className={`font-bold ${theme.text} uppercase tracking-widest border-b-2 border-slate-300 pb-1 mb-3`}>Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600">{edu.school}</p>
                  <p className="text-slate-500 italic text-xs">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {data.skills && (
            <div className="mb-8">
              <h3 className={`font-bold ${theme.text} uppercase tracking-widest border-b-2 border-slate-300 pb-1 mb-3`}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(',').map((s, i) => s.trim() && <span key={i} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-semibold shadow-sm">{s.trim()}</span>)}
              </div>
            </div>
          )}
          
          {(data.languages || data.interests) && (
             <div className="mb-8">
               <h3 className={`font-bold ${theme.text} uppercase tracking-widest border-b-2 border-slate-300 pb-1 mb-3`}>More</h3>
               {data.languages && <div className="mb-2"><span className="font-bold text-slate-700">Lang:</span> <span className="text-slate-600">{data.languages}</span></div>}
               {data.interests && <div><span className="font-bold text-slate-700">Interests:</span> <span className="text-slate-600">{data.interests}</span></div>}
             </div>
          )}

           {data.certifications.length > 0 && (
             <div className="mb-8">
               <h3 className={`font-bold ${theme.text} uppercase tracking-widest border-b-2 border-slate-300 pb-1 mb-3`}>Certifications</h3>
               {data.certifications.map((cert, i) => (
                 <div key={i} className="mb-2"><p className="font-semibold text-slate-800">{cert.name}</p><p className="text-xs text-slate-500">{cert.year}</p></div>
               ))}
             </div>
           )}
        </div>

        <div className="col-span-8 p-8">
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h3 className={`text-xl font-bold text-slate-800 border-b-2 ${theme.border} pb-2 mb-4 inline-block`}>Work Experience</h3>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6 pl-4 border-l-2 border-slate-200 relative">
                   <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${theme.header} border-4 border-white`}></div>
                   <div className="flex justify-between items-baseline mb-1">
                     <h4 className="font-bold text-lg text-slate-900">{exp.role}</h4>
                     <span className={`text-xs font-bold ${theme.text} ${theme.light} px-2 py-1 rounded`}>{exp.date}</span>
                   </div>
                   <p className="text-sm font-semibold text-slate-600 mb-2">{exp.company} • {exp.location}</p>
                   <FormatText text={exp.description} className="text-sm text-slate-700 leading-relaxed" />
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div className="mb-8">
              <h3 className={`text-xl font-bold text-slate-800 border-b-2 ${theme.border} pb-2 mb-4 inline-block`}>Projects</h3>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                     <h4 className="font-bold text-lg text-slate-900">{proj.name}</h4>
                     {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className={`text-xs ${theme.text} underline flex items-center gap-1 font-semibold`}><ExternalLink size={12}/> View</a>}
                   </div>
                   <p className={`text-xs font-mono ${theme.accent} mb-2 font-bold`}>{proj.tech}</p>
                   <FormatText text={proj.description} className="text-sm text-slate-700" />
                </div>
              ))}
            </div>
          )}

          {data.awards.length > 0 && (
             <div>
               <h3 className={`text-xl font-bold text-slate-800 border-b-2 ${theme.border} pb-2 mb-4 inline-block`}>Awards</h3>
               {data.awards.map((awd, i) => (
                 <div key={i} className="mb-3"><h4 className="font-bold text-slate-900">{awd.title}</h4><p className="text-sm text-slate-600">{awd.details}</p></div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 2: CLASSIC ---
  const ClassicTemplate = () => (
    <div className="h-[297mm] bg-white text-slate-900 font-serif p-12 flex flex-col">
      <div className="text-center border-b-2 border-slate-800 pb-6 mb-6 shrink-0">
        <h1 className="text-5xl font-bold uppercase tracking-wide break-words">{data.personal.fullName}</h1>
        <p className="text-xl italic text-slate-600 mt-2">{data.personal.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-3 font-sans text-slate-600">
          {data.personal.email && <a href={`mailto:${data.personal.email}`} className="hover:text-blue-600">{data.personal.email}</a>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.linkedin && <a href={ensureUrl(data.personal.linkedin)} target="_blank" rel="noreferrer" className="text-blue-800 underline">• LinkedIn</a>}
          {data.personal.website && <a href={ensureUrl(data.personal.website)} target="_blank" rel="noreferrer" className="text-blue-800 underline">• Portfolio</a>}
        </div>
      </div>
      <FormatText text={data.personal.summary} className="text-center text-slate-700 leading-relaxed mb-8 max-w-3xl mx-auto" />
      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-8">
           {data.experience.length > 0 && (
             <div className="mb-8">
               <h3 className="font-bold text-lg uppercase tracking-widest border-b border-slate-300 mb-4 pb-1">Experience</h3>
               {data.experience.map((exp, i) => (
                 <div key={i} className="mb-6">
                   <div className="flex justify-between items-baseline mb-1"><h4 className="font-bold text-lg">{exp.company}</h4><span className="text-sm italic text-slate-600">{exp.date}</span></div>
                   <div className="flex justify-between items-center mb-2"><span className="font-semibold text-slate-800">{exp.role}</span><span className="text-sm text-slate-500">{exp.location}</span></div>
                   <FormatText text={exp.description} className="text-sm text-slate-700 leading-relaxed text-justify" />
                 </div>
               ))}
             </div>
           )}
           {data.projects.length > 0 && (
             <div className="mb-8">
               <h3 className="font-bold text-lg uppercase tracking-widest border-b border-slate-300 mb-4 pb-1">Projects</h3>
               {data.projects.map((proj, i) => (
                 <div key={i} className="mb-4">
                    <div className="flex items-baseline justify-between"><h4 className="font-bold text-slate-800">{proj.name} <span className="text-sm font-normal italic text-slate-500">({proj.tech})</span></h4>{proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-xs text-blue-800 underline font-sans">View</a>}</div>
                    <FormatText text={proj.description} className="text-sm text-slate-700 mt-1" />
                 </div>
               ))}
             </div>
           )}
        </div>
        <div className="col-span-4 border-l border-slate-200 pl-6">
           {data.education.length > 0 && (
             <div className="mb-8">
               <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-3">Education</h3>
               {data.education.map((edu, i) => <div key={i} className="mb-3"><p className="font-bold text-slate-900">{edu.degree}</p><p className="text-sm text-slate-600">{edu.school}</p><p className="text-xs text-slate-500 italic">{edu.year}</p></div>)}
             </div>
           )}
           {data.skills && <div className="mb-8"><h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-3">Skills</h3><p className="text-sm leading-loose text-slate-700">{data.skills}</p></div>}
           {(data.languages || data.interests) && <div className="mb-8"><h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-3">Other</h3>{data.languages && <p className="text-sm mb-2"><span className="font-semibold">Lang:</span> {data.languages}</p>}{data.interests && <p className="text-sm"><span className="font-semibold">Interests:</span> {data.interests}</p>}</div>}
        </div>
      </div>
    </div>
  );

  // --- TEMPLATE 3: MINIMAL ---
  const MinimalTemplate = () => (
    <div className="h-[297mm] bg-white text-slate-800 font-sans p-10 flex flex-col">
      <div className="flex justify-between items-start mb-10 border-b pb-8 shrink-0">
        <div className="max-w-[70%]">
          <h1 className="text-5xl font-light tracking-tight text-slate-900 mb-2 break-words">{data.personal.fullName}</h1>
          <p className="text-xl text-slate-500 tracking-wide break-words">{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-sm text-slate-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          {data.personal.linkedin && <a href={ensureUrl(data.personal.linkedin)} target="_blank" rel="noreferrer" className="text-blue-600 block">LinkedIn</a>}
          {data.personal.website && <a href={ensureUrl(data.personal.website)} target="_blank" rel="noreferrer" className="text-blue-600 block">Portfolio</a>}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-8">
          <div className="mb-8"><h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">Profile</h3><FormatText text={data.personal.summary} className="text-slate-800 leading-relaxed text-sm" /></div>
          {data.experience.length > 0 && <div className="mb-8"><h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-6">Experience</h3>{data.experience.map((exp, i) => <div key={i} className="mb-8"><h4 className="font-bold text-lg text-slate-900">{exp.role}</h4><p className="text-slate-600 text-sm mb-3">{exp.company} | {exp.date}</p><FormatText text={exp.description} className="text-sm text-slate-700 leading-relaxed" /></div>)}</div>}
          {data.projects.length > 0 && <div className="mb-8"><h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-6">Projects</h3>{data.projects.map((proj, i) => <div key={i} className="mb-6"><div className="flex justify-between"><h4 className="font-bold text-slate-900">{proj.name}</h4>{proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline">Link</a>}</div><p className="text-xs text-slate-500 mb-2 font-mono">{proj.tech}</p><FormatText text={proj.description} className="text-sm text-slate-700" /></div>)}</div>}
        </div>
        <div className="col-span-4 pl-4 border-l">
           {data.skills && <div className="mb-8"><h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">Skills</h3><div className="flex flex-wrap gap-y-2">{data.skills.split(',').map((s, i) => <span key={i} className="block w-full text-sm text-slate-700 border-b pb-1 mb-1 border-slate-100 break-words">{s.trim()}</span>)}</div></div>}
           {data.education.length > 0 && <div className="mb-8"><h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">Education</h3>{data.education.map((edu, i) => <div key={i} className="mb-4"><p className="font-bold text-slate-900 text-sm">{edu.degree}</p><p className="text-xs text-slate-500">{edu.school}</p><p className="text-xs text-slate-400">{edu.year}</p></div>)}</div>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        /* FIX FOR MOBILE: Force A4 size and White Background */
        @media print {
            @page { size: A4 portrait; margin: 0; }
            body { 
                background-color: white !important; 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }
            /* Override mobile responsive styles */
            #resume-preview-container {
                width: 210mm !important;
                min-width: 210mm !important;
                height: 297mm !important;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: white !important;
                color: black !important;
            }
            /* Hide everything else */
            .no-print { display: none !important; }
        }
      `}</style>
      
      {/* Container with ID for the print override */}
      <div 
        id="resume-preview-container" 
        ref={ref} 
        className="bg-white mx-auto shadow-2xl overflow-hidden" 
        style={{ width: '210mm', minWidth: '210mm', minHeight: '297mm' }}
      >
        {template.includes('modern') ? <ModernTemplate /> : (template === 'classic' ? <ClassicTemplate /> : <MinimalTemplate />)}
      </div>
    </>
  );
});

export default ResumePreview;