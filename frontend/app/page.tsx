export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
        <div className="flex w-1/3 justify-center items-center mb-4">
          {'This app allow you to upload an image with japanese, chinese, or korean character and translate it to english.'}
        </div>
        <div className="flex">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer">
            {'Upload Here'}
          </button>
        </div>
    </div>
  );
}
