export default function Loading() {
  return (
    <main className="bg-black text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-0.5 overflow-hidden">
        <div className="route-loading-bar h-full w-1/3 bg-white" />
      </div>

      <section className="lg:mx-auto">
        <div className="mx-auto w-full px-4 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl">
          <div className="py-16 md:py-20">
            <div className="route-loading-skeleton h-9 w-48 rounded-full" />
            <div className="mt-6 space-y-3 max-w-3xl">
              <div className="route-loading-skeleton h-8 w-full rounded-md" />
              <div className="route-loading-skeleton h-8 w-[90%] rounded-md" />
              <div className="route-loading-skeleton h-8 w-[75%] rounded-md" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="route-loading-skeleton aspect-[4/3] rounded-xl" />
              <div className="space-y-4">
                <div className="route-loading-skeleton h-7 w-[70%] rounded-md" />
                <div className="route-loading-skeleton h-5 w-full rounded-md" />
                <div className="route-loading-skeleton h-5 w-[88%] rounded-md" />
                <div className="route-loading-skeleton h-5 w-[76%] rounded-md" />
                <div className="route-loading-skeleton mt-6 h-11 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
