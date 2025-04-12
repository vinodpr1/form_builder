import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface FormElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface ElementSettingsProps {
  element: FormElement;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<FormElement>) => void;
}

const ElementSettings: React.FC<ElementSettingsProps> = ({ 
  element, 
  onClose, 
  onUpdate 
}) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() && element.options) {
      onUpdate(element.id, { 
        options: [...element.options, newOption.trim()] 
      });
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = element.options?.filter((_, i) => i !== index) || [];
    onUpdate(element.id, { options: newOptions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Field Settings</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={element.label}
              onChange={(e) => onUpdate(element.id, { label: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {element.type === 'text' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Placeholder</label>
                <input
                  type="text"
                  value={element.placeholder || ''}
                  onChange={(e) => onUpdate(element.id, { placeholder: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Input Type</label>
                <select
                  value={element.type}
                  onChange={(e) => onUpdate(element.id, { type: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                </select>
              </div>
            </>
          )}

          {element.type === 'checkbox' && (
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              <div className="space-y-2">
                {element.options?.map((option, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(element.options || [])];
                        newOptions[i] = e.target.value;
                        onUpdate(element.id, { options: newOptions });
                      }}
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={() => handleRemoveOption(i)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new option"
                    className="flex-1 p-2 border rounded"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                  />
                  <button
                    onClick={handleAddOption}
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              id={`required-${element.id}`}
              type="checkbox"
              checked={element.required || false}
              onChange={(e) => onUpdate(element.id, { required: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor={`required-${element.id}`} className="text-sm font-medium">
              Required field
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementSettings;

// import React, { useState } from 'react';
// import { X, Plus, Trash2 } from 'lucide-react';

// interface ElementSettingsProps {
//   element: {
//     id: string;
//     type: string;
//     label: string;
//     placeholder?: string;
//     required?: boolean;
//     options?: string[];
//   };
//   onClose: () => void;
//   onUpdate: (id: string, updates: Partial<{
//     id: string;
//     type: string;
//     label: string;
//     placeholder?: string;
//     required?: boolean;
//     options?: string[];
//   }>) => void;
// }

// export const ElementSettings: React.FC<ElementSettingsProps> = ({
//   element,
//   onClose,
//   onUpdate,
// }) => {
//   const [newOption, setNewOption] = useState('');
//   const [inputType, setInputType] = useState(element.type);

//   const handleAddOption = () => {
//     if (newOption.trim()) {
//       const currentOptions = element.options || [];
//       onUpdate(element.id, { options: [...currentOptions, newOption.trim()] });
//       setNewOption('');
//     }
//   };

//   const handleRemoveOption = (index: number) => {
//     const newOptions = (element.options || []).filter((_, i) => i !== index);
//     onUpdate(element.id, { options: newOptions });
//   };

//   const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newType = e.target.value;
//     setInputType(newType);
//     onUpdate(element.id, { type: newType });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Element Settings</h3>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Field Label
//             </label>
//             <input
//               type="text"
//               value={element.label}
//               onChange={(e) => onUpdate(element.id, { label: e.target.value })}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {element.type === 'text' && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Placeholder Text
//                 </label>
//                 <input
//                   type="text"
//                   value={element.placeholder ?? ""}
//                   onChange={(e) => onUpdate(element.id, { placeholder: e.target.value })}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Input Type
//                 </label>
//                 <select 
//                   value={inputType}
//                   onChange={handleTypeChange}
//                   className="border border-gray-700 w-full mb-1 p-2"
//                 >
//                   <option value="text">Text</option>
//                   <option value="email">Email</option>
//                   <option value="password">Password</option>
//                   <option value="number">Number</option>
//                 </select>
//               </div>
//             </>
//           )}
          
//           {element.type === 'checkbox' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Checkbox Options
//               </label>
//               <div className="space-y-2">
//                 {(element.options || []).map((option, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => {
//                         const newOptions = [...(element.options || [])];
//                         newOptions[index] = e.target.value;
//                         onUpdate(element.id, { options: newOptions });
//                       }}
//                       className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <button
//                       onClick={() => handleRemoveOption(index)}
//                       className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={newOption}
//                     onChange={(e) => setNewOption(e.target.value)}
//                     placeholder="Add new option"
//                     className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
//                   />
//                   <button
//                     onClick={handleAddOption}
//                     className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div>
//             <label className="flex items-center space-x-2 border border-red-500">
//               <input
//                 type="checkbox"
//                 checked={element.required || false}
//                 onChange={(e) => onUpdate(element.id, { required: e.target.checked })}
//                 className="rounded text-purple-400 focus:ring-purple-300"
//               />
//               <span className="text-sm font-medium text-gray-700">Required field</span>
//             </label>
//           </div>
//         </div>
        
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React, { useState } from 'react';
// import { X, Plus, Trash2 } from 'lucide-react';

// interface ElementSettingsProps {
//   element: {
//     id: string;
//     type: string;
//     label: string;
//     placeholder?: string;
//     required?: boolean;
//     options?: string[];
//   };
//   onClose: () => void;
//   onUpdate: (id: string, updates: Partial<any>) => void;
//   // previous -> onUpdate: (id: string, updates: Partial<FormElement>) => void;
// }

// export const ElementSettings: React.FC<ElementSettingsProps> = ({
//   element,
//   onClose,
//   onUpdate,
// }) => {
//   const [newOption, setNewOption] = useState('');

//   const handleAddOption = () => {
//     if (newOption.trim()) {
//       const currentOptions = element.options || [];
//       onUpdate(element.id, { options: [...currentOptions, newOption.trim()] });
//       setNewOption('');
//     }
//   };

//   const handleRemoveOption = (index: number) => {
//     const newOptions = (element.options || []).filter((_, i) => i !== index);
//     onUpdate(element.id, { options: newOptions });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Element Settings</h3>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Add Label
//             </label>
//             <input
//               type="text"
//               value={element.label}
//               onChange={(e) => onUpdate(element.id, { label: e.target.value })}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {element.type === 'text' &&
//             <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Add placeholder
//             </label>
//             <input
//               type="text"
//               value={element.placeholder ?? ""}
//               onChange={(e) => onUpdate(element.id, { placeholder: e.target.value })}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           }

//          {element.type === 'text' &&
//             <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Add type
//             </label>
//             <select name="type" id="type" className='border border-gray-700 w-full mb-1 p-2'>
//                 <option value="text">text</option>
//                 <option value="email">email</option>
//                 <option value="password">password</option>
//                 <option value="number">number</option>
//             </select>
//           </div>
//           }
          
//           {element.type === 'checkbox' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Checkbox Options
//               </label>
//               <div className="space-y-2">
//                 {(element.options || []).map((option, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => {
//                         const newOptions = [...(element.options || [])];
//                         newOptions[index] = e.target.value;
//                         onUpdate(element.id, { options: newOptions });
//                       }}
//                       className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <button
//                       onClick={() => handleRemoveOption(index)}
//                       className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     value={newOption}
//                     onChange={(e) => setNewOption(e.target.value)}
//                     placeholder="Add new option"
//                     className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
//                   />
//                   <button
//                     onClick={handleAddOption}
//                     className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={element.required}
//                 onChange={(e) => onUpdate(element.id, { required: e.target.checked })}
//                 className="rounded text-purple-400 focus:ring-purple-300"
//               />
//               <span className="text-sm font-medium text-gray-700">Required field</span>
//             </label>
//           </div>

//         </div>
        
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };