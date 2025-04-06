import useAuthStore from "../stores/authStore";

function SetLibrary() {
  const currUser = useAuthStore((state) => state.user);
  const currUserSets = currUser?.Set;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {currUserSets && currUserSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currUserSets.map((set) => (
            <div
              key={set.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-bold text-zinc-900">{set.title}</h2>
              <p className="text-zinc-500">
                {set.description ? set.description : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mt-6">
          <p className="text-zinc-500">
            Hmm... It looks like you don't have any flashcard sets yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default SetLibrary;
