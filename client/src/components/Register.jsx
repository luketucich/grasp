import { useState } from "react";
import { Form } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Register</h1>
      <h2 className="text-lg text-gray-600 mb-6">Sign up today!</h2>

      <Form action="/register" method="post" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email:{" "}
          </label>

          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Username:{" "}
          </label>

          <input
            name="username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password:{" "}
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </Form>
    </div>
  );
}

export default Register;
