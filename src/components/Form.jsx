import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import InputGroup from './InputGroup';
import ImageUpload from './ImageUpload';

export default function Form({
  data,
  onChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onArrayChange,
  errors
}) {
  return (
    <div className="form-container">
      {/* Profil Qismi */}
      <section className="form-section">
        <h2 className="section-title">Shaxsiy Ma'lumotlar</h2>
        
        <div className="photo-upload-container">
          <ImageUpload 
            photo={data.personal.photo} 
            onUpload={(url) => onChange('personal', 'photo', url)}
            onRemove={() => onChange('personal', 'photo', '')}
          />
        </div>

        <div className="form-grid">
          <InputGroup
            label="Ism"
            id="firstName"
            value={data.personal.firstName}
            onChange={(e) => onChange('personal', 'firstName', e.target.value)}
            placeholder="Eshmat"
            required
            error={errors?.firstName}
          />
          <InputGroup
            label="Familiya"
            id="lastName"
            value={data.personal.lastName}
            onChange={(e) => onChange('personal', 'lastName', e.target.value)}
            placeholder="Toshmatov"
            required
            error={errors?.lastName}
          />
          <InputGroup
            label="Kasb/Lavozim"
            id="jobTitle"
            value={data.personal.jobTitle}
            onChange={(e) => onChange('personal', 'jobTitle', e.target.value)}
            placeholder="Masalan: Frontend Dasturchi"
            required
            error={errors?.jobTitle}
          />
          <InputGroup
            label="Email"
            id="email"
            type="email"
            value={data.personal.email}
            onChange={(e) => onChange('personal', 'email', e.target.value)}
            placeholder="misol@gmail.com"
            required
            error={errors?.email}
          />
          <InputGroup
            label="Telefon Rqam"
            id="phone"
            type="tel"
            value={data.personal.phone}
            onChange={(e) => onChange('personal', 'phone', e.target.value)}
            placeholder="+998 90 123 45 67"
            required
            error={errors?.phone}
          />
          <InputGroup
            label="Yashash joyi (Shahar, Davlat)"
            id="location"
            value={data.personal.location}
            onChange={(e) => onChange('personal', 'location', e.target.value)}
            placeholder="Toshkent, O'zbekiston"
          />
          <div className="col-span-2">
            <InputGroup
              label="Qisqacha o'zingiz haqingizda"
              id="summary"
              as="textarea"
              value={data.personal.summary}
              onChange={(e) => onChange('personal', 'summary', e.target.value)}
              placeholder="O'z tajribangiz va maqsadlaringizni qisqacha tasvirlab bering..."
            />
          </div>
        </div>
      </section>

      {/* Ish Tajribasi */}
      <section className="form-section">
        <h2 className="section-title">Ish Tajribasi</h2>
        
        {data.experience.map((exp) => (
          <div key={exp.id} className="list-item-card">
            <button
              onClick={() => onRemoveArrayItem('experience', exp.id)}
              className="btn-danger-icon delete-btn"
              title="O'chirish"
              type="button"
            >
              <Trash2 size={16} />
            </button>
            <div className="form-grid">
              <InputGroup
                label="Kompaniya/Tashkilot nomi"
                id={`exp-company-${exp.id}`}
                value={exp.company}
                onChange={(e) => onArrayChange('experience', exp.id, 'company', e.target.value)}
                placeholder="Google"
              />
              <InputGroup
                label="Lavozim"
                id={`exp-position-${exp.id}`}
                value={exp.position}
                onChange={(e) => onArrayChange('experience', exp.id, 'position', e.target.value)}
                placeholder="Senior Frontend Developer"
              />
              <InputGroup
                label="Boshlanish sanasi"
                id={`exp-startDate-${exp.id}`}
                value={exp.startDate}
                onChange={(e) => onArrayChange('experience', exp.id, 'startDate', e.target.value)}
                placeholder="Yanvar 2020"
              />
              <InputGroup
                label="Tugash sanasi"
                id={`exp-endDate-${exp.id}`}
                value={exp.endDate}
                onChange={(e) => onArrayChange('experience', exp.id, 'endDate', e.target.value)}
                placeholder="Hozirgacha"
              />
              <div className="col-span-2">
                <InputGroup
                  label="Vazifalar (Har bir qatorga bittadan)"
                  id={`exp-description-${exp.id}`}
                  as="textarea"
                  value={exp.description}
                  onChange={(e) => onArrayChange('experience', exp.id, 'description', e.target.value)}
                  placeholder="- React hooklarni yaratish&#10;- Jamoaga boshchilik qilish"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => onAddArrayItem('experience')}
          className="btn-text-primary"
        >
          <Plus size={16} />
          Yangi tajriba qo'shish
        </button>
      </section>

      {/* Ta'lim */}
      <section className="form-section">
        <h2 className="section-title">Ta'lim</h2>
        
        {data.education.map((edu) => (
          <div key={edu.id} className="list-item-card">
            <button
              onClick={() => onRemoveArrayItem('education', edu.id)}
              className="btn-danger-icon delete-btn"
              title="O'chirish"
              type="button"
            >
              <Trash2 size={16} />
            </button>
            <div className="form-grid">
              <InputGroup
                label="O'quv muassasasi / Universitet"
                id={`edu-school-${edu.id}`}
                value={edu.school}
                onChange={(e) => onArrayChange('education', edu.id, 'school', e.target.value)}
                placeholder="Toshkent Axborot Texnologiyalari Universiteti"
              />
              <InputGroup
                label="Mutaxassislik / Daraja"
                id={`edu-degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => onArrayChange('education', edu.id, 'degree', e.target.value)}
                placeholder="Bakalavr, Dasturiy Injiniring"
              />
               <InputGroup
                label="Shahar, Davlat"
                id={`edu-location-${edu.id}`}
                value={edu.location}
                onChange={(e) => onArrayChange('education', edu.id, 'location', e.target.value)}
                placeholder="Toshkent, O'zbekiston"
              />
              <InputGroup
                label="O'qish davri"
                id={`edu-date-${edu.id}`}
                value={edu.date}
                onChange={(e) => onArrayChange('education', edu.id, 'date', e.target.value)}
                placeholder="2018 - 2022"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => onAddArrayItem('education')}
          className="btn-text-primary"
        >
          <Plus size={16} />
          Ta'lim ma'lumotlarini qo'shish
        </button>
      </section>
      
      {/* Skills */}
      <section className="form-section">
        <h2 className="section-title">Ko'nikmalar (Skills)</h2>
        <InputGroup
          label="Ko'nikmalaringizni vergul bilan kiriting"
          id="skills"
          value={data.skills.join(', ')}
          onChange={(e) => {
             const val = e.target.value;
             const arr = val.split(',').map(s => s.trim());
             onChange('root', 'skills', arr);
          }}
          placeholder="React, JavaScript, CSS, Node.js"
        />
      </section>
    </div>
  );
}
