import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieItem from "../Component/MovieItem";

const SearchMovies = () => {
  // Create state for movies that have been searched
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const IMAGE_PATH = import.meta.env.VITE_API_IMGURL_CARD;
  const NO_IMAGE_PATH = import.meta.env.VITE_API_NO_IMG;

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Get the data from API with query and page variable
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/search/movie?page=${page}&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set state for the movie that have been searched
        const { data } = response.data;
        setSearchMovie(data);
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
    getSearchMovie();
  }, [query, page]);

  // Foreach or map every object of movies array
  return (
    <div className="max-w-screen-2xl mx-auto mb-10">
      <h1 className="font-semibold text-3xl pt-48 ml-6 md:text-4xl md:ml-10 md:pt-28 mb-5">
        {`Search Result "${query}"`}
      </h1>
      <div className="flex justify-center items-center flex-wrap p-2 2xl:max-w-screen-2xl gap-5">
        {searchMovie.map((movie) => (
          <div key={movie?.id}>
            <MovieItem
              id={movie?.id}
              imgURL={
                movie?.poster_path
                  ? `${IMAGE_PATH}${movie.poster_path}`
                  : `${NO_IMAGE_PATH}`
              }
              title={movie?.title}
              vote_average={`${movie?.vote_average} / 10`}
              release_date={movie?.release_date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
