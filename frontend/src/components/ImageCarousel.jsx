import RadialCarousel from "./RadialCarousel";

const ImageCarousel = () => {
  return (
    <section className="w-full py-7 bg-[#050505] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center md:text-left">

          <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs">
            Creative AI
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Transform Images Into{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Artistic{" "} 
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text italic font-light text-transparent">
              Expressions
            </span>              
              
          </h2>

  
  
          <p className="text-gray-400 leading-relaxed">
            Our AI model analyzes your image and reinterprets it using
            distinct artistic styles inspired by historical and modern
            aesthetics.
          </p>

          {/* extra points */}
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>• Style transfer powered by deep learning</li>
            <li>• Preserves structure while enhancing creativity</li>
            <li>• Works with portraits, landscapes, and more</li>
          </ul>

          <p className="text-gray-500 text-sm">
            Built for creators who want fast, high-quality visual transformations.
          </p>
        </div>

        {/* CENTER CAROUSEL */}
        <div className="flex justify-center">
          <RadialCarousel />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6 text-center md:text-right">

          <p className="text-[#406E8E] uppercase tracking-[0.25em] text-xs">
            Smart Styling
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Multiple Styles.
            <br />
            <span className="bg-gradient-to-r from-[#4381C1] to-[#9AC2C9] text-transparent bg-clip-text">
              One Input Image
            </span>
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Generate multiple variations of the same image with different
            artistic interpretations — instantly and effortlessly.
          </p>

          {/* feature blocks */}
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <p className="text-white font-medium">Fast Processing</p>
              <p className="text-gray-500">Results in seconds</p>
            </div>

            <div>
              <p className="text-white font-medium">High Fidelity</p>
              <p className="text-gray-500">Preserves key details</p>
            </div>

            <div>
              <p className="text-white font-medium">Creative Control</p>
              <p className="text-gray-500">Experiment with styles</p>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Designed for both casual users and creative professionals.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ImageCarousel;