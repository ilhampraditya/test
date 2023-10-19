import { useState } from "react";
import axios from "axios";
import GoogleLogin from "../Component/GoogleLogin";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const name = `${firstName} ${lastName}`;
  const regis = async (event) => {
    // Prevent default is to prevent the default behavior
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          email,
          name,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      // Save our token
      localStorage.setItem("token", token);

      // Redirect to home

      // Redirect to home or reload the home
      // This is temporary solution, the better solution is using redux
      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

  return (
    <section className="flex justify-center items-center bg-[url('/background-2.jpg')] bg-cover py-8 min-h-screen w-full contrast-125">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 rounded-md gap-10 px-10 py-14">
        <div className="flex flex-col text-center justify-center">
          <h1 className="text-4xl font-bold my-2 text-white">
            Access your account now!
          </h1>
          <h3 className="text-2xl font-semibold my-2 text-red-500">
            Please sign up to your account.
          </h3>
          <p className="text-red-400">
            Enter your email and password to access everything we have to offer.
          </p>
        </div>
        <div>
          <form
            onSubmit={regis}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <h1 className="block text-gray-700 font-bold mb-5 text-2xl text-center">
                Register Your Account
              </h1>
              <div className="flex justify-center gap-2">
                <input
                  className="shadow appearance-none focus:border-red-400 border border-slate-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                  className="shadow appearance-none focus:border-red-400 border border-slate-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none focus:border-red-400 border border-slate-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow focus:border-red-400 appearance-none border border-slate-400 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="text-red-500 text-xs italic">
                Please enter your password.
              </p>
            </div>
            <div className="text-center">
              <button
                className=" bg-red-600 w-full hover:bg-red-700 md:px-6 md:py-2 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin buttonText={"Sign Up With Google"} />
              </div>
              <div className="mt-4">
                <p className="text-gray-700">
                  Have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:opacity-70">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
