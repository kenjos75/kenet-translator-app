import IdentifyForm from "./components/identify-form";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
        <div className="flex w-1/3 justify-center items-center mb-4">
          {'This app allow you to upload an image with japanese, chinese, or korean character and translate it to english.'}
        </div>
        <div className="flex w-1/2 justify-center">
          <IdentifyForm />
        </div>
        
    </div>
  );
}
