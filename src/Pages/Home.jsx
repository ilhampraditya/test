import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "../Component/MovieItem";
import Hero from "../Component/Hero";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const IMAGE_PATH = import.meta.env.VITE_API_IMGURL_CARD;

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;

        setPopularMovies(data.slice(0, 8));
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
          });
          return;
        }
        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getPopularMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularMovies.length === 0) {
    return <h1>Loading ....</h1>;
  }

  return (
    <>
      <Hero />
      <main>
        <div className="max-w-screen-2xl mx-auto mb-8 ">
          <div>
            <div className="flex justify-between my-8 mx-4">
              <h1 className="font-bold text-red-600 text-2xl">Popular Movie</h1>
              <a
                className="italic text-red-600 hover:underline"
                href="/popular-movies"
              >
                See All Popular
              </a>
            </div>
            <div className="flex justify-center items-center flex-wrap p-2 2xl:max-w-screen-2xl gap-5">
              {popularMovies.map((movie) => (
                <div key={movie?.id}>
                  <MovieItem
                    id={movie?.id}
                    imgURL={`${IMAGE_PATH}${movie?.poster_path}`}
                    title={movie?.title}
                    vote_average={`${movie?.vote_average} / 10`}
                    release_date={movie?.release_date}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
