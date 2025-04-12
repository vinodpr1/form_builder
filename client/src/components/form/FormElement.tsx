import React from 'react';
import { Settings2, GripVertical } from 'lucide-react';

interface FormElementProps {
  type: string;
  label: string;
  id: string;
  options?: string[];
  required?: boolean;
  onDragStart: (e: React.DragEvent, type: string) => void;
  isPreview?: boolean;
  onSettingsClick?: (id: string) => void;
  previewMode?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export const FormElement: React.FC<FormElementProps> = ({
  type,
  id,
  options = [],
  required,
  onDragStart,
  isPreview = false,
  onSettingsClick,
  previewMode = false,
  value,
  onChange,
}) => {
  const getInputElement = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Text input"
            required={required}
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={!previewMode}
          />
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600"
                  placeholder="Checkbox input"
                  checked={value?.[index] || false}
                  onChange={(e) => {
                    const newValue = [...(value || Array(options.length).fill(false))];
                    newValue[index] = e.target.checked;
                    onChange?.(newValue);
                  }}
                  disabled={!previewMode}
                  required={required && index === 0}
                />
                <span>{option}</span>
              </label>
            ))}
            {options.length === 0 && (
              <div className="text-gray-500 italic">No options added</div>
            )}
          </div>
        );
      default:
        return <input type="text" className="w-full p-2 border rounded" />;
    }
  };

  return (
    <div>
  
    <div
      draggable={!isPreview && !previewMode}
      onDragStart={(e) => onDragStart(e, type)}
      className={`relative flex justify-between items-center gap-2 group bg-white rounded-lg shadow-sm ${
        isPreview ? 'border-blue-200' : 'cursor-move hover:border-blue-300'
      } transition-colors`}
    >
    {getInputElement()}
      
      <div className="flex items-center justify-between mb-2">
       
        <div className="flex items-center gap-2">
          
          {!isPreview && !previewMode && <GripVertical className="w-4 h-4 text-gray-400" />}
          {isPreview && !previewMode && onSettingsClick && (
            <button
              onClick={() => onSettingsClick(id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings2 className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};