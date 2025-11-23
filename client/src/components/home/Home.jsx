export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      {/* Hero section */}
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            React Car Marketplace Project
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Find the right car <span className="text-emerald-600">for you</span>.
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-slate-600">
            CarHub is a simple car listing platform where users can create,
            browse and manage car offers. This project is built for the React
            exam and focuses on clean structure, routing, authentication and
            working with a REST API.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-800"
            >
              Get started
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-500 hover:text-slate-900"
            >
              Learn more
            </button>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• React + React Router</li>
            <li>• Tailwind CSS UI</li>
            <li>• SoftUni Practice Server as backend</li>
            <li>• Future features: Create Car, Catalog, Details, Auth</li>
          </ul>
        </div>

        {/* Right side illustration / placeholder */}
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 shadow-xl">
            <div className="flex h-full w-full flex-col justify-between p-6 text-slate-50">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                  Featured car
                </p>
                <p className="text-xl font-semibold">CarHub Demo Project</p>
                <p className="text-xs text-slate-300">
                  This is only a static preview. Dynamic car data will be added
                  later from the REST API.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex gap-4">
                  <div>
                    <p className="text-slate-400">Brand</p>
                    <p className="font-semibold text-slate-50">Example</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Model</p>
                    <p className="font-semibold text-slate-50">Demo Edition</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Year</p>
                    <p className="font-semibold text-slate-50">2024</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-400">Starting price</p>
                  <p className="text-lg font-bold text-emerald-300">
                    € 24,900
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-400">
                * All content on this page is static. Dynamic car listings will
                be implemented later using the backend API.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}