import React from "react";
import { Code, Unlock, Zap, Github } from "lucide-react";
import GraphPaperBackground from "../components/GraphPaperBackground";
import FeatureCard from "../components/FeatureCard";
import ActionButton from "../components/ActionButton"; // Import the new component

function App() {
  return (
    <div className="min-h-screen p-4">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="py-12 px-4">
          <div className="relative mb-20 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 transform -rotate-1">
              Welcome to{" "}
              <span className="relative inline-block transform rotate-1">
                <span className="relative z-10 text-blue-500">Grasp</span>
                <div
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-yellow-300 -z-0 rounded-sm transform -rotate-1"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
                    opacity: 0.6,
                    background:
                      "linear-gradient(90deg, #FBBF24 0%, #FCD34D 50%, #FBBF24 100%)",
                  }}
                ></div>
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-light">
              The flashcard system that's completely free, open-source, and
              beautifully simple to use.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Unlock}
              title="100% Free"
              description="No hidden fees, subscriptions, or premium features. Everything is available to everyone."
              color="blue"
              rotation={-1}
            />

            <FeatureCard
              icon={Code}
              title="Open Source"
              description="Full transparency with code available on GitHub. View, modify, or self-host."
              color="green"
              rotation={0}
            />

            <FeatureCard
              icon={Zap}
              title="Simple"
              description="Clean interface with no clutter. Just create, study, and learn without distractions."
              color="purple"
              rotation={1}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-16 flex flex-wrap gap-6 justify-center">
            <ActionButton href="/register" color="blue" rotation={-1}>
              Get Started
            </ActionButton>

            <ActionButton
              href="https://github.com/luketucich/grasp"
              color="gray"
              rotation={1}
              external={true}
            >
              GitHub Repo
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
