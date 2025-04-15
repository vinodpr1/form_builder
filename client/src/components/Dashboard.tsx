import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
 
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
      }
    };
    checkAuth();
  }, []);

  return (
    <div className='mt-16'>
        <FormGallery/>
    </div>
  )
}

export default Dashboard

type FormTemplate = {
  _id: string;
  form: {
    title: string;
    description?: string;
  };
};

const FormGallery = () => {
  const [createdForms, setCreatedForms] = useState<FormTemplate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:3300/api/v1/form/forms");
        setCreatedForms(response.data.response);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handleUseTemplate = (formId: string) => {
    navigate(`/forms/${formId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create a new form</h1>
      </div>

      <div className="space-y-6">
        <Link to="/formbuilder">
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-400 text-white font-medium rounded-lg hover:bg-purple-500 cursor-pointer transition-colors">
            <span className="text-xl">+</span>
            Create new form
          </button>
        </Link>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">Forms gallery</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdForms.map((form) => (
            <div
              key={form._id}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h3 className="text-sm font-semibold text-gray-900">{form.form.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">Click to preview and share</p>
              <button onClick={() => handleUseTemplate(form._id)} className="flex items-center gap-2 px-2 py-1 mt-2 bg-purple-400 text-white font-medium rounded hover:bg-purple-500 cursor-pointer transition-colors">
                View form
             </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

