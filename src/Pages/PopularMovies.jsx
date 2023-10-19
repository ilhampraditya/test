import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "../Component/MovieItem";

function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
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

        setPopularMovies(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
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
    getPopularMovies();
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto mb-10 pt-16 md:pt-0">
      <h1 className="text-center text-red-600 font-semibold text-4xl pt-24 mb-5">
        Popular Movie
      </h1>
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
  );
}

export default PopularMovies;
