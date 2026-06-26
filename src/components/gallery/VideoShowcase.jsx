import { PlayCircle } from "lucide-react";

export default function VideoShowcase() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-4 lg:px-8">

        <div className="relative rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg transition-colors duration-300">

          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
            alt="Construction Video"
            className="w-full h-125 object-cover dark:brightness-90 transition-all duration-300"
          />

          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center transition-colors duration-300">

            <button className="bg-white rounded-full p-5 hover:scale-110 transition">
              <PlayCircle
                size={60}
                className="text-amber-500"
              />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}