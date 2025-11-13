import { ClimbingBoxLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <ClimbingBoxLoader
          color="gray"
          size={20}
          speedMultiplier={1}
          aria-label="Loading Spinner"
        />
      </div>
    </div>
  );
}

export default PageLoader
