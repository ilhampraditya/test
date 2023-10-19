import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DetailMovie() {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState([]);
  const IMAGE_PATH = import.meta.env.VITE_API_IMGURL_HEADER;
  const NO_IMAGE_PATH = import.meta.env.VITE_API_NO_IMG;

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        setDetailMovie(data);
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
    getDetailMovie();
  }, [movieId]);
  return (
    <div className="relative w-full min-h-screen">
      <div
        style={{
          backgroundImage: `url('${IMAGE_PATH}${detailMovie?.backdrop_path}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full min-h-screen blur-sm contrast-125"
      ></div>
      <div className="absolute top-0 flex items-center justify-start xl:pl-20">
        <div className="flex flex-col items-center sm:flex-row pt-24 md:pt-10 md:gap-10">
          <img
            src={
              detailMovie?.poster_path
                ? `${IMAGE_PATH}${detailMovie.poster_path}`
                : `${NO_IMAGE_PATH}`
            }
            alt="Image.jpg"
            width="250px"
            height="250px"
            className="rounded-lg pt-36 sm:pt-0  sm:ml-10 md:mt-40 hidden md:inline-flex"
          />
          <div className="flex flex-col p-5 pt-32 md:pt-44 max-w-6xl min-w-min md:mb-0">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-1">
              {detailMovie?.title}
            </h2>
            <p className="text-white font-semibold mb-3">{`Release: ${detailMovie?.release_date}`}</p>
            <p className="text-yellow-400 font-bold">
              {`${detailMovie?.vote_average?.toFixed(1)} / 10`}
            </p>
            {detailMovie?.tagline ? (
              <p className=" text-white font-semibold mb-3">{`Tagline: "${detailMovie?.tagline}"`}</p>
            ) : (
              <p className=" text-white font-semibold">{`Tagline: "Tagline Not Found"`}</p>
            )}
            <div className="flex justify-start items-center gap-3 mb-3">
              {detailMovie?.genres?.map((genre) => (
                <div key={genre?.id}>
                  <p className="rounded-lg italic font-semibold text-white py-0.2 px-3 bg-red-600">
                    {genre?.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-white font-semibold mb-5">
              {detailMovie?.overview}
            </p>
            <Link
              to={`/trailer/${detailMovie?.id}`}
              className="w-36 h-10 flex justify-center items-center gap-1 bg-red-700 rounded-full hover:bg-red-600"
            >
              <img src="/play.svg" alt="play.svg" width="20px" height="20px" />
              <p className="text-white font-semibold">Trailer Movie</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMovie;
