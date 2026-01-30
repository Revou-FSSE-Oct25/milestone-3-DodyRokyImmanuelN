export default function FAQPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">What is this website?</h2>
          <p className="text-gray-600">
            This is a simple e-commerce demo built using Next.js App Router.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Is this project using SSR?</h2>
          <p className="text-gray-600">
            Yes. Product pages are rendered using Server-Side Rendering (SSR),
            while this FAQ page is statically generated (SSG).
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Is cart functionality implemented?</h2>
          <p className="text-gray-600">
            The cart button is implemented as a UI component for demonstration
            purposes.
          </p>
        </div>
      </div>
    </main>
  );
}
