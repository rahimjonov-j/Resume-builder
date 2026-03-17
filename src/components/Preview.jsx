import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Preview = forwardRef(({ data }, ref) => {
  const { personal, experience, education, skills } = data;

  return (
    <div className="a4-page" ref={ref}>
      {/* Header */}
      <div className="cv-header">
        {personal.photo && (
          <div className="cv-photo">
            <img src={personal.photo} alt="Profile" />
          </div>
        )}
        <div className="cv-header-info">
          <h1 className="cv-name">
            {personal.firstName || 'Ism'} <span>{personal.lastName || 'Familiya'}</span>
          </h1>
          <h2 className="cv-job-title">
            {personal.jobTitle || 'Mutaxassislik nomi'}
          </h2>
          
          <div className="cv-contact-list">
            {personal.email && (
              <div className="cv-contact-item">
                <Mail className="cv-contact-icon" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="cv-contact-item">
                <Phone className="cv-contact-icon" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="cv-contact-item">
                <MapPin className="cv-contact-icon" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cv-body">
        {/* Left Column (Main Content) */}
        <div className="cv-main-col">
          {/* Summary */}
          {personal.summary && (
            <div className="cv-section">
              <h3 className="cv-section-title">Profil</h3>
              <p className="cv-summary">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          <div className="cv-section">
            <h3 className="cv-section-title">Ish Tajribasi</h3>
            
            <div className="cv-experience-list">
              {experience.map((exp) => (
                 (exp.company || exp.position) && (
                   <div key={exp.id} className="cv-exp-item">
                     <div className="cv-exp-dot"></div>
                     <div className="cv-exp-header">
                       <h4 className="cv-exp-title">{exp.position || 'Lavozim'}</h4>
                       <span className="cv-exp-date">
                         {exp.startDate} {exp.startDate || exp.endDate ? '-' : ''} {exp.endDate}
                       </span>
                     </div>
                     <span className="cv-exp-company">{exp.company || 'Kompaniya'}</span>
                     
                     {exp.description && (
                        <ul className="cv-exp-desc">
                          {exp.description.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if(!trimmed) return null;
                            const text = trimmed.replace(/^[-*•]\s*/, '');
                            return <li key={i}>{text}</li>;
                          })}
                        </ul>
                     )}
                   </div>
                 )
              ))}
              {experience.length === 0 || !experience.some(e => e.company || e.position) ? (
                 <p className="cv-empty-text">Hali ish tajribasi qo'shilmagan.</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="cv-sidebar-col">
          
          {/* Education */}
          <div className="cv-section">
            <h3 className="cv-section-title">Ta'lim</h3>
            <div className="cv-edu-list">
              {education.map((edu) => (
                (edu.school || edu.degree) && (
                  <div key={edu.id} className="cv-edu-item">
                    <div className="cv-edu-date">
                      {edu.date}
                    </div>
                    <h4 className="cv-edu-title">{edu.degree || 'Mutaxassislik'}</h4>
                    <p className="cv-edu-school">{edu.school || 'Unversitet'}</p>
                    {edu.location && <p className="cv-edu-location">{edu.location}</p>}
                  </div>
                )
              ))}
               {education.length === 0 || !education.some(e => e.school || e.degree) ? (
                 <p className="cv-empty-text">Ta'lim ma'lumotlari yo'q.</p>
              ) : null}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.some(s => s) && (
            <div className="cv-section">
               <h3 className="cv-section-title">Ko'nikmalar</h3>
              <div className="cv-skills-list">
                {skills.filter(s => s).map((skill, index) => (
                  <span key={index} className="cv-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
