import Quote from './Quote'
import Auth from './Auth'

const Signup = () => {
  return (
    <div className="">
      <div className="pt-12 flex flex-col lg:grid lg:grid-cols-10">
        <Quote />
        <Auth component={"signup"}/>
      </div>
    </div>
  )
}

export default Signup