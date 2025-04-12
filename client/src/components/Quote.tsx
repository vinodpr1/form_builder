import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Quote = () => {
  return (
    <div className="overflow-hidden flex flex-col py-12 px-2 col-span-4 justify-between">
    <div className="p-2 ">
      <Link to={"/"}>
        <button
          className="cursor-pointer border border-gray-400 hover:bg-gray-200 flex justify-center items-center py-1 px-2 gap-1 text-sm font-medium rounded transition-all duration-500"
        >
          <ArrowLeft className="h-5 w-5 font-light text-base" /> Home
        </button>
      </Link>
    </div>

    <div className="">
      <p className="text-2xl font-medium sm:text-3xl sm:font-semibold">
        <span className="text-3xl font-semibold sm:font-bold sm:text-4xl bg-gradient-to-tr from-purple-300 to-purple-600 bg-clip-text text-transparent">
         FormChallenge{" "}
        </span>
        Build powerful,<br /> custom forms with FormBuilder.
      </p>
    </div>
    <div className="flex items-center pt-8 max-w-full">
      <div className="">
        <div className="lightning-line"></div>
        <div className="glow-effect"></div>
      </div>
    </div>
  </div>
  )
}

export default Quote