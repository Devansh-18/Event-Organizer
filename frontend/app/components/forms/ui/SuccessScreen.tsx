/* Shown after a successful form submission. */
export default function SuccessScreen() {
  return (
    <div className="p-8 text-center bg-white rounded-xl shadow-lg border border-gray-100 w-full">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Success!</h2>
      <p className="text-gray-600">Your requirement has been posted successfully.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Post Another
      </button>
    </div>
  );
}
