import { Code, Unlock, Zap, Github } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Grasp
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            The flashcard system that's completely free, open-source, and
            beautifully simple to use.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Unlock className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">100% Free</h3>
              <p className="text-zinc-400">
                No hidden fees, subscriptions, or premium features. Everything
                is available to everyone.
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Open Source
              </h3>
              <p className="text-zinc-400">
                Full transparency with code available on GitHub. View, modify,
                or self-host.
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-5">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Simple</h3>
              <p className="text-zinc-400">
                Clean interface with no clutter. Just create, study, and learn
                without distractions.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-all shadow-md hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Get Started
            </a>
            <a
              href="https://github.com/luketucich/grasp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center gap-2"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
