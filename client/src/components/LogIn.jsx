import { useState } from "react";
import { Form } from "react-router";
import { Mail, Lock, LogIn } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white border-[0.075rem] border-gray-350 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">Log In</h1>
          <p className="text-zinc-500 mt-1">Access your account</p>
        </div>

        <Form action="/login" method="post" className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="block w-full pl-10 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="block w-full pl-10 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <LogIn size={18} />
              <span>Log In</span>
            </button>
          </div>
        </Form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
