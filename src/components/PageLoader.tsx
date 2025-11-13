import { PulseLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <PulseLoader
          color="hsl(var(--primary))"
          size={15}
          margin={2}
          speedMultiplier={0.8}
          aria-label="Loading Spinner"
        />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default PageLoader
