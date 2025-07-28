const MessageBoxLoading = () => {
  return (
    <div className="flex flex-col space-y-2 w-full lg:w-9/12 bg-black/20 border border-yellow-400/10 backdrop-blur-sm rounded-xl py-6 px-6">
      {/* Loading skeleton lines with yellow theme */}
      <div className="h-3 rounded-full w-full bg-gradient-to-r from-yellow-400/20 via-yellow-400/30 to-yellow-400/20 animate-pulse" />
      <div className="h-3 rounded-full w-9/12 bg-gradient-to-r from-yellow-400/15 via-yellow-400/25 to-yellow-400/15 animate-pulse" style={{ animationDelay: '0.1s' }} />
      <div className="h-3 rounded-full w-10/12 bg-gradient-to-r from-yellow-400/20 via-yellow-400/30 to-yellow-400/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
      
      {/* Additional loading elements for more realistic appearance */}
      <div className="mt-4 space-y-2">
        <div className="h-2 rounded-full w-8/12 bg-gradient-to-r from-yellow-400/10 via-yellow-400/20 to-yellow-400/10 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="h-2 rounded-full w-6/12 bg-gradient-to-r from-yellow-400/15 via-yellow-400/25 to-yellow-400/15 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent animate-pulse rounded-xl" />
    </div>
  );
};

export default MessageBoxLoading;
