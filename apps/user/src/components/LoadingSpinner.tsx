import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingSpinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="text-xs mb-2 text-white font-mono">
          I hope this free tier wait time does not get me rejected :)
        </p>
        <AiOutlineLoading3Quarters className="text-tGray-100 text-2xl animate-loading" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
