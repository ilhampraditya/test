import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Hero() {
  const [trandingMovie, setTrandingMovie] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const IMAGE_PATH = import.meta.env.VITE_API_IMGURL_HEADER;
  useEffect(() => {
    const getTrendingMovie = async () => {
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
        setTrandingMovie(data.slice(0, 3));
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
    getTrendingMovie();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? trandingMovie.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === trandingMovie.length - 1 ? 0 : prevSlide + 1
    );
  };

  const autoSlide = () => {
    handleNextSlide();
  };

  useEffect(() => {
    const interval = setInterval(autoSlide, 10000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInterval, autoSlide]);

  return (
    <div>
      {trandingMovie.map((movie, index) => (
        <div
          key={movie?.id}
          style={{
            backgroundImage: `url('${IMAGE_PATH}${movie?.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={`relative w-full min-h-screen flex flex-col justify-center items-start px-24 md:p-40 ${
            index === currentSlide ? "" : "hidden"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-white drop-shadow-lg">
            {movie?.title}
          </h1>
          <p className="mb-3 text-sm sm:text-md md:text-lg text-white font-semibold drop-shadow-lg">
            {movie?.overview}
          </p>
          <Link
            to={`/trailer/${movie?.id}`}
            className="w-32 h-8 sm:w-36 sm:h-10 flex justify-center items-center gap-1 bg-red-700 rounded-full hover:bg-red-600"
          >
            <img src="/play.svg" alt="play.svg" width="20px" height="20px" />
            <p className="text-white text-sm sm:text-md font-semibold ">
              Trailer Movie
            </p>
          </Link>
        </div>
      ))}
      <div className="flex justify-between items-center absolute top-1/2 translate-x-0 -translate-y-1/2  w-full px-5">
        <div className="p-0.5 bg-slate-300 rounded-full opacity-40 cursor-pointer hover:opacity-100 active:rounded-full">
          <img
            src="prev.svg"
            alt="prev.svg"
            width="35px"
            height="35px"
            onClick={handlePrevSlide}
            className="md:w-12 md:h-12"
          />
        </div>
        <div className="p-0.5 bg-slate-300 rounded-full opacity-40 cursor-pointer hover:opacity-100">
          <img
            src="next.svg"
            alt="next.svg"
            width="35px"
            height="35px"
            onClick={handleNextSlide}
            className="md:w-12 md:h-12"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
