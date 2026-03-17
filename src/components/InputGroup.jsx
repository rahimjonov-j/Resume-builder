import React from 'react';

export default function InputGroup({ label, id, type = 'text', value, onChange, placeholder, required, error, as = 'input' }) {
  const Component = as === 'textarea' ? 'textarea' : 'input';
  
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="input-label-required">*</span>}
      </label>
      <Component
        id={id}
        name={id}
        type={as === 'textarea' ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''} ${as === 'textarea' ? 'textarea-field' : ''}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
