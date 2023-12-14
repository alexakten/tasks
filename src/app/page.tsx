"use client";

import Nav from "./components/Nav";

export default function Home() {
  //#region

  //#endregion

  return (
    <main
      className="flex flex-col items-center justify-between overflow-hidden bg-[#151515]"
      style={{
        backgroundSize: "128px 128px",
        backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
`,
      }}
    >
      {/* Grid Overlay */}
      <div
        className="overflow-hidden"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle, transparent 20%, black 90%)",
        }}
      />
      <Nav />

      {/* Hero Section */}
      <section className="relative flex h-screen w-screen items-center justify-center overflow-hidden px-4">
        <div className="flex max-w-4xl flex-col items-center gap-6 text-center text-white">
          <div
            className="flex items-center justify-center rounded-full bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
            style={{ padding: 1 }}
          >
            <div className="relative text-[14px] flex h-full w-full items-center rounded-full bg-[#252525] px-4 py-1 text-zinc-500 drop-shadow-sm">
              <p>
                v.1.0 launching soon
                {/* <span className="font-normal text-white">
                  {" "}
                  Join waitlist -&gt;
                </span> */}
              </p>
            </div>
          </div>

          <h1
            className="xs:text-7xl max-w-2xl bg-gradient-to-tr from-zinc-400 via-zinc-200 to-zinc-50 bg-clip-text text-[40px] font-medium tracking-tight text-transparent"
            style={{ lineHeight: 1.02 }}
          >
            Boost productivity with subtasking
          </h1>
          <p className="text-md xs:text-xl max-w-md font-normal leading-[24px] text-zinc-200">
            Break complex projects down into microtasks and focus on what needs
            to get done.
          </p>
          <div>
            <button
              className="animate-rotate-light relative flex items-center justify-center rounded-full drop-shadow-sm"
              style={{
                padding: 1,
                backgroundSize: "150% 150%",
                backgroundImage:
                  "radial-gradient(circle at center center, #e5e7eb, #71717a 30%, #4b5563 70%)",
              }}
            >
              <div className="relative flex h-full w-full items-center rounded-full bg-[#252525] px-5 py-3">
                <p className="text-zinc-200">Join waitlist </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
