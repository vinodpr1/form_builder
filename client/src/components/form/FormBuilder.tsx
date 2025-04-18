import React, { useEffect, useState } from 'react';
import { Type, CheckSquare, Eye, PenSquare, Save } from 'lucide-react';
import ElementSettings from './ElementSetting';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

const FormBuilder: React.FC = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formTitle, setFormTitle] = useState("");

  const availableElements = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  ];

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('elementType', type);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('elementType');
    const newElement: FormElement = {
      id: `${type}-${Date.now()}`,
      type,
      label: `New ${type}`,
      placeholder: type === 'text' ? 'Enter text...' : undefined,
      options: type === 'checkbox' ? ['Option 1'] : undefined,
    };
    setFormElements([ newElement, ...formElements]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleElementUpdate = (id: string, updates: Partial<FormElement>) => {
    setFormElements(prev => 
      prev.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    );
    setSelectedElement(prev => 
      prev?.id === id ? { ...prev, ...updates } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formElements.length === 0) {
      toast.info("add at least one field to the form") 
      return;
    }
  
    if (!formTitle.trim()) {
      toast.info("Please Enter title of the form") 
      return;
    }
  
    const formData = {
      form: { 
        title: formTitle,
        fields: formElements.map(element => ({
          name: element.label.toLowerCase().replace(/\s+/g, '_'),
          label: element.label,
          html_element: element.type,
          type: element.type === 'checkbox' ? 'boolean' : 'text',
          options: element.options || undefined,
          required: element.required || false,
          placeholder: element.placeholder || undefined
        }))
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication required. Please login.');
      return;
    }
    try {
      const res = await axios.post("http://localhost:3300/api/v1/form/forms", formData , { headers: {
        'token': `${token}`,
      }});
      console.log('Form saved successfully:', res.data);
      setFormElements([]);
      setFormTitle("");
      setFormValues({});
      toast.success("Form Created")    
    } catch (error) {
      console.error('Error saving form:', error);
      toast.error('Failed to save form. Please try again.');
    }
  };

  const navigate = useNavigate();
 
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
      }
    };

    checkAuth();
  }, [navigate]);

  const renderFormElement = (element: FormElement) => {
    if (previewMode) {
      return (
        <div key={element.id} className="mb-4">
          <label className="block mb-1 font-medium">
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {element.type === 'text' && (
            <input
              type={element.type}
              placeholder={element.placeholder}
              value={formValues[element.id] || ''}
              onChange={(e) => setFormValues(prev => ({
                ...prev,
                [element.id]: e.target.value
              }))}
              className="w-full p-2 border rounded"
              required={element.required}
            />
          )}
          {element.type === 'checkbox' && (
            <div className="space-y-2">
              {element.options?.map((option, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formValues[element.id]?.includes(option) || false}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(formValues[element.id] || []), option]
                        : (formValues[element.id] || []).filter((v: string) => v !== option);
                      setFormValues(prev => ({
                        ...prev,
                        [element.id]: newValue
                      }));
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        key={element.id} 
        className="mb-4 p-3 border rounded bg-gray-50 relative group cursor-pointer"
        onClick={() => setSelectedElement(element)}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
          <PenSquare className="w-4 h-4 text-gray-500" />
        </div>
        <label className="block mb-1 font-medium">
          {element.label}
          {element.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {element.type === 'text' && (
          <div className="p-2 bg-white border rounded text-gray-400">
            {element.placeholder || 'Text input'}
          </div>
        )}
        {element.type === 'checkbox' && (
          <div className="space-y-2">
            {element.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input type="checkbox" disabled />
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Form Builder</h1>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form title"
            className="border rounded px-4 py-2"
          />
          <div className='flex gap-2'>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-400 text-white rounded cursor-pointer"
            >
              {previewMode ? (
                <>
                  <PenSquare className="w-4 h-4" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
            >
            
                <Save className="w-4 h-4" />
                 Save    
            </button>
          </div>
        </div>

        {!previewMode ? (
          <div className="grid grid-cols-4 gap-6 ">
            <div className="space-y-3 border border-gray-600 rounded-lg p-4">
              <h2 className="font-semibold">Elements</h2>
              {availableElements.map((item) => (
                <div
                  key={item.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.type)}
                  className="p-3 border rounded bg-white cursor-move hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="col-span-3 bg-white p-6 rounded-lg border border-dashed min-h-[500px]"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {formElements.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Drag and drop elements here
                </div>
              ) : (
                <div className="space-y-4">
                  {formElements.map(renderFormElement)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">{formTitle || 'Untitled Form'}</h2>
            <div className="space-y-4">
              {formElements.map(renderFormElement)}
            </div>
            {formElements.length > 0 && (
              <button
                type="submit"
                disabled
                className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
              >
                Submit
              </button>
            )}
          </form>
        )}

        {selectedElement && (
          <ElementSettings
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
            onUpdate={handleElementUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilder;