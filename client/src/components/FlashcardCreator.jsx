import { X } from "lucide-react";

function FlashcardCreator({ index }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-700">Card {index}</span>
        <button
          type="button"
          className="text-zinc-400 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label
            htmlFor={`front-${index}`}
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Front
          </label>
          <input
            name={`cards[${index}].front`}
            type="text"
            id={`front-${index}`}
            placeholder="Question or term"
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor={`back-${index}`}
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Back
          </label>
          <textarea
            name={`cards[${index}].back`}
            id={`back-${index}`}
            placeholder="Answer or definition"
            rows="2"
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default FlashcardCreator;
