import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function Home() {

  const navigate = useNavigate();

  const isAuthenticated = useAuth(
    (state) => state.isAuthenticate
  );

  const user = useAuth(
    (state) => state.currentUser
  );

  const handleGetStarted = () => {

    if (isAuthenticated) {

      navigate(
        user?.role === "AUTHOR"
          ? "/author-profile"
          : "/user-profile"
      );

    } else {

      navigate("/register");
    }
  };

  return (

    <div className="w-full py-10">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-[40px] px-10 lg:px-20 py-20 shadow-sm overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <p className="uppercase tracking-[5px] text-blue-600 font-semibold mb-5">
              Welcome To MyBlog
            </p>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-800 mb-8">

              Share Your
              <span className="text-blue-600">
                {" "}Ideas
              </span>

              <br />

              Inspire The World

            </h1>

            <p className="text-gray-600 text-xl leading-relaxed mb-10 max-w-2xl">

              Discover trending articles, connect with amazing writers,
              and publish your thoughts on a modern blogging platform.

            </p>

            <div className="flex flex-wrap gap-5">

              <button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-105"
              >

                {isAuthenticated
                  ? "Go To Dashboard"
                  : "Get Started"}

              </button>

              <button
                onClick={() => navigate("/user-profile")}
                className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
              >

                Explore Articles

              </button>

            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 mt-14">

              <div>
                <h2 className="text-4xl font-bold text-blue-600">
                  10K+
                </h2>

                <p className="text-gray-500">
                  Readers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-cyan-600">
                  2K+
                </h2>

                <p className="text-gray-500">
                  Articles
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-purple-600">
                  500+
                </h2>

                <p className="text-gray-500">
                  Authors
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">

            <div className="bg-white rounded-[30px] p-8 shadow-2xl border border-gray-100">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>

                <div>
                  <p className="font-bold text-gray-800 text-lg">
                    Future of AI
                  </p>

                  <p className="text-gray-500">
                    By Alex Morgan
                  </p>
                </div>

              </div>

              <h2 className="text-3xl font-bold text-gray-800 leading-snug mb-5">

                How Artificial Intelligence Is Transforming Modern Web Development

              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">

                Learn how AI tools are helping developers build faster,
                smarter, and more scalable applications in 2026.

              </p>

              <div className="flex justify-between items-center">

                <span className="text-blue-600 font-semibold">
                  12 min read
                </span>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all">

                  Read More

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-24">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-blue-600 font-semibold mb-4">
            Features
          </p>

          <h2 className="text-5xl font-black text-gray-800 mb-6">

            Why Choose MyBlog?

          </h2>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto">

            Everything you need to read, write,
            and grow your audience online.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {[
            {
              icon: "✍️",
              title: "Write Articles",
              desc: "Create beautiful content and share your ideas with the world."
            },
            {
              icon: "🚀",
              title: "Grow Audience",
              desc: "Build your online presence with engaging articles."
            },
            {
              icon: "💬",
              title: "Engage Readers",
              desc: "Connect through comments and discussions."
            }
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white border border-gray-100 rounded-[30px] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >

              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">

                {item.title}

              </h3>

              <p className="text-gray-500 leading-relaxed">

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="pb-16">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-16 text-center shadow-xl">

          <h2 className="text-5xl font-black text-white mb-6">

            Ready To Start Writing?

          </h2>

          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">

            Join thousands of writers and share your knowledge
            with readers around the world.

          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-700 px-10 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300"
          >

            Join Now

          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;