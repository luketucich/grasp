import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

function Error() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={32} />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-zinc-500 max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved to another
          URL.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-blue-200/50 flex items-center gap-2"
          >
            <Home size={18} />
            <span>Go Home</span>
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-zinc-700 font-medium rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
