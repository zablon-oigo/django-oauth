import { useState } from "react"
export default function VerifyEmail() {
  const[otp,setOTP]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(otp){
      const response=await axios.post("")

    }
  }
  return (
    <section className="max-w-3xl px-10 py-10 mx-auto bg-gray-100 my-60 rounded-xl">
      <form action="" className="max-w-sm mx-auto">
        <div className="flex flex-col">
          <label htmlFor="" className="mb-2 text-2xl font-semibold ">Enter your OTP code:</label>
          <input type="text" value={otp} onChange={(e)=>setOTP(e.target.value)} className="px-6 py-3 border-2 border-gray-600 rounded-lg " />
        </div>
        <input type="submit" value="submit" className="w-full px-6 py-3 mt-2 text-white bg-teal-700 rounded-lg" />
      </form>
    </section>
  )
}
