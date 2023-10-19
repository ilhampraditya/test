import PropTypes from "prop-types";

function MovieItem({ id, imgURL, title, vote_average, release_date }) {
  return (
    <div className="hover:-translate-y-3 transition-all duration-200 relative">
      <img src={imgURL} width="250px" height="250px" className="rounded-lg" />
      <div className="w-[100%] h-[100%] top-0 left-0 absolute flex justify-center items-center flex-col bg-slate-900 opacity-0 hover:opacity-80 hover:rounded-lg ">
        <h2 className="font-bold text-2xl text-white text-center z-50">
          {title}
        </h2>
        <h2 className="font-bold text-md text-yellow-400 text-center z-50">
          {vote_average}
        </h2>
        <h2 className="font-bold text-md text-white text-center z-50">
          {release_date}
        </h2>
        <a
          href={`/details/${id}`}
          className="cursor-pointer underline italic text-white mt-20 opacity-70 hover:font-semibold hover:opacity-100"
        >
          click to view detail
        </a>
      </div>
    </div>
  );
}

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vote_average: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
};

export default MovieItem;
