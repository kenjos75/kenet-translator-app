import IdentifyForm from "./components/identify-form";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
        <div className="flex w-1/3 justify-center items-center mb-4">
          <h1 className="text-3xl font-mono">
            {'Kenet Translator App'}
          </h1>
        </div>
        <div className="flex w-1/3 justify-center items-center mb-4 text-md font-mono flex-col">
          <div className="w-full">
            {'This app will allow you to upload an image with japanese, chinese, or korean characters and translate them into english format. Please enjoy using this app. If you are enjoying this app. Please consider sending me money to develop more awesome apps :(, kenjos75@yahoo.com.'}
          </div>
        </div>
        <div className="flex w-1/2 justify-center">
          <IdentifyForm />
        </div>
    </div>
  );
}
