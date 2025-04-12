import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {

  return (
    <div className='mt-16'>
        <FormGallery/>
    </div>
  )
}

export default Dashboard



type FormTemplate = {
  id: string;
  title: string;
  description?: string;
};

const FormGallery = () => {

  const [createdForms, setCreatedForm] = useState([]);
  useEffect(()=>{
    const fetchForms =  async ()=>{
       const forms = await axios.get("http://localhost:3300/api/v1/form/forms");
       setCreatedForm(forms.data.response);
    }
    fetchForms();
  },[])

  const handleCreateBlank = () => {
    console.log('Creating blank form');
  };

  const handleUseTemplate = (templateId: string) => {
    console.log(`Using template: ${templateId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Creat a new form</h1>
      </div>

      <div className="space-y-6">
        <Link to="/formbuilder">
           <button
             onClick={handleCreateBlank}
             className="flex items-center gap-2 px-6 py-3 bg-purple-400 text-white font-medium rounded-lg hover:bg-purple-500 cursor-pointer transition-colors"
           >
             <span className="text-xl">+</span>
             Create new form
           </button>
        </Link>

        <h2 className="text-2xl font-semibold text-gray-900 pt-4">Forms galery</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdForms.map((form:any) => (
            <div
              key={form._id}
              onClick={() => handleUseTemplate(form._id)}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900">{form.form.title}</h3>
              {form.form.title && (
                <p className="text-gray-600 mt-2 text-sm">{form.form.title}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
