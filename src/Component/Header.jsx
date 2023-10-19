import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;

    if (searchQuery.trim() === "") {
      return;
    }

    const searchUrl = `/search?page=1&query=${searchQuery}`;

    navigate(searchUrl);
  };

  //* Get Username in Navbar and protected Navbar Button
  const [user, setUser] = useState(null);

  const logout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    //* Redirect to home or reload the home
    window.location.replace("/");
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;

        // Set the user state from API data
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return;
          }
          alert(error?.response?.data?.message);
          return;
        }
        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <header className="p-4 fixed w-full z-50">
      <nav className="container flex flex-col justify-between items-center md:flex-row">
        <a href="/" className="text-4xl font-bold text-red-600 mb-2">
          Movielist
        </a>
        <div className="w-full relative mb-3 md:w-1/2 md:mb-0">
          {user && (
            <>
              <form action="search" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="What do you want to watch?"
                  className="outline-none font-semibold text-md bg-transparent border-none ring-2 ring-red-600 rounded-full border-red-600 w-[100%] px-4 py-1 md:py-2"
                />
                <div className="absolute top-0 right-0 transform translate-y-1 md:translate-y-2  -translate-x-3">
                  <img
                    width="25px"
                    height="25px"
                    src="/search.svg"
                    alt="Search.svg"
                  />
                </div>
              </form>
            </>
          )}
        </div>
        <div className="flex justify-center items-center gap-2">
          {user ? (
            <>
              <a
                href="/myprofile"
                className="px-3 py-1 md:px-6 md:py-2 bg-transparent hover:decoration-red-600 text-red-600 rounded-full font-bold hover:text-white transition-all duration-300"
              >
                {user?.name}
              </a>
              <button
                type="button"
                className="px-3 py-1 md:px-6 md:py-2 bg-red-600 hover:bg-red-700 border-2 border-red-600 text-white rounded-full font-bold transition-all duration-300"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
