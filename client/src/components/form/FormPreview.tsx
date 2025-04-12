// FormPreview.tsx
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

const FormPreview = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/api/v1/form/form/${formId}`);
        console.log("response", response);
        setForm(response.data.response);
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3300/api/v1/form/forms/${formId}/submissions`, {
        responses: formValues
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  const shareUrl = `${window.location.origin}/forms/${formId}`;

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{form.form.title}</h1>
        <div className="flex gap-2">
          
            <button onClick={()=>copy(shareUrl)} className="px-4 py-2 bg-blue-100 rounded cursor-pointer hover:bg-blue-300">
              {isCopied ? 'Copied!' : 'Share'}
            </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.form.fields.map((field: any) => (
          <div key={field.name} className="space-y-2">
            <label className="block font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {field.html_element === 'text' && (
              <input
                type={field.type}
                value={formValues[field.name] || ''}
                onChange={(e) => setFormValues({
                  ...formValues,
                  [field.name]: e.target.value
                })}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full p-2 border rounded"
              />
            )}

            {field.html_element === 'checkbox' && (
              <div className="space-y-2">
                {field.options?.map((option: string) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formValues[field.name]?.includes(option) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(formValues[field.name] || []), option]
                          : (formValues[field.name] || []).filter((v: string) => v !== option);
                        setFormValues({
                          ...formValues,
                          [field.name]: newValue
                        });
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;