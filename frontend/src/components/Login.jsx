
export default function Login() {
  return (
    <section className="max-w-3xl px-10 py-10 mx-auto bg-gray-100 my-60">
      
      <form action="" className="max-w-sm mx-auto ">
      <h2 className="text-3xl font-semibold text-center capitalize">
        login
      </h2>
      <div className="flex flex-col mt-2">
          <label htmlFor="email" className="text-gray-800 text-md">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg " 
            value=""
            onChange=""
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-gray-800 text-md">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg" 
            value=""
            onChange=""
          />
        </div>
        <input type="submit" value="submit" className="w-full px-3 py-3 mt-2 text-white bg-teal-700 rounded-lg hover:bg-teal-500" />
      </form>
    </section>
  )
}
