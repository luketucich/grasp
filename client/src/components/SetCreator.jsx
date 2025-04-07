import { Form } from "react-router";
import { BookType, BookText, Plus, Save } from "lucide-react";
import FlashcardCreator from "./FlashcardCreator";
// import { useState } from "react";

function SetCreator() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [flashcards, setFlashcards] = useState([{}]);

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 py-8">
      <div className="w-full max-w-2xl p-6 md:p-8 bg-white border-[0.075rem] border-gray-350 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">
            Create Flashcard Set
          </h1>
          <p className="text-zinc-500 mt-1">
            Add a title and cards for your new set
          </p>
        </div>

        <Form action="/create-flashcards" method="post" className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700"
            >
              Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <BookType size={18} />
              </div>
              <input
                name="title"
                type="text"
                id="title"
                placeholder="e.g. Spanish Vocabulary"
                className="block w-full pl-10 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700"
            >
              Description
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <BookText size={18} />
              </div>
              <input
                name="title"
                type="text"
                id="title"
                placeholder="e.g. Vocabulary for Spanish 101"
                className="block w-full pl-10 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-zinc-800">Flashcards</h2>
              <span className="text-sm text-zinc-500">1 card</span>
            </div>

            {/* Example FlashcardCreator component */}
            <FlashcardCreator index={1} />

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-zinc-700 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <Plus size={18} />
              <span>Add Card</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <Save size={18} />
              <span>Save Flashcard Set</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SetCreator;
