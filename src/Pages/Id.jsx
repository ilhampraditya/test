function Id() {
  return (
    <section className="flex justify-center items-center bg-[url('/background-2.jpg')] bg-cover py-8 min-h-screen w-full contrast-150">
      <div className="max-w-3xl md:max-w-5xl">
        <div className="m-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold text-center">
            Welcome to the Tim6 Movie website, where this website can help you
            find popular films
          </h1>
          <p className="text-white text-xl md:text-2xl text-center font-semibold mt-8 mb-7">
            Login now, to search for films
          </p>
          <div className="text-center">
            <a
              href="/login"
              className="px-3 py-1 md:px-6 md:py-2 bg-red-600 border-2 border-red-600 hover:bg-red-700 text-white rounded-full font-bold  transition-all duration-300"
            >
              Login Now!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Id;
