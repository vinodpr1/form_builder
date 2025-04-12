import { useState } from "react"
import axios from "axios"

interface IuserData{
  name?: string,
  email: string,
  password: string
}

const Auth = ({component}:{component: string}) => {

    const [userData, setUserData] = useState<IuserData>({name:"", email:"", password:""})
    const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setUserData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }
   
    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await axios.post(`${component=="signup"? "http://localhost:3300/api/v1/user/signup" : "http://localhost:3300/api/v1/user/signin"}`, userData);
        console.log(response);
    }

  return (
    <div className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 col-span-6">
    <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
      <div
        className={`w-full max-w-md transform transition-all duration-1000  `}
      >
        <div className="relative">
         <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              {component=="signin"? "Signin to your account" : "Signup to your account"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full pb-6"
            >
              {component === "signup" && (
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="name">
                    <span className="text-sm text-gray-400">Name</span>
                  </label>
                  <div>
                    <input
                      name="name"
                      className="w-[100%]  border border-gray-600 rounded px-4 py-2"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email">
                  <span className="text-sm text-gray-400">Email</span>
                </label>
                <div>
                  <input
                    name="email"
                    className="w-[100%] border border-gray-600 rounded px-4 py-2"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label htmlFor="password">
                  <span className="text-sm text-gray-400">Password</span>
                </label>
                <div>
                  <input
                    name="password"
                    className="w-[100%] border border-gray-600 rounded px-4 py-2"
                    type="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className=" text-gray-500 py-2 rounded border border-gray-600 w-full flex flex-col gap-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Auth