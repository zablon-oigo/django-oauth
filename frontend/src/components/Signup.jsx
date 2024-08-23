export default function Signup() {
  return (
    <section className="">
        <div className="">
            <h2 className="">
                create account
            </h2>
        </div>
        <form action="" className="">
          <div className="">
          <label htmlFor="" className="">email address</label>
          <input type="text" className="" />
          </div>
          <div className="">
          <label htmlFor="" className="">first name</label>
          <input type="text" className="" />
          </div>
          <div className="">
          <label htmlFor="" className="">last name</label>
          <input type="text" className="" />
          </div>
          <div className="">
          <label htmlFor="" className="">password</label>
          <input type="text" className="" />
          </div>
          <div className="">
          <label htmlFor="" className="">repeat password</label>
          <input type="text" className="" />
          </div>
          <input type="submit" value="Submit" className="" />
        </form>
        <h3 className="">
            or
        </h3>
        <div className="">
            <button className="">
                sign up with Google
            </button>
        </div>
        <div className="">
            <button className="">
                sign up with Github
            </button>
        </div>
    </section>
  )
}
