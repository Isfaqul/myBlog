import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingSpinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-tGray-100 text-2xl animate-loading" />
    </div>
  );
}

export default LoadingSpinner;
