export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-pulse flex space-x-2">
        <div className="h-5 w-5 rounded-full bg-primary" />
        <div className="h-5 w-5 rounded-full bg-primary" />
        <div className="h-5 w-5 rounded-full bg-primary" />
      </div>
      <div className="text-3xl font-bold text-primary animate-bounce">
        Loading...
      </div>
    </div>
  );
}

