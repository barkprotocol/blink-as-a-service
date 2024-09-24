function KeyFeatures() {
    const features = [
      { icon: Zap, title: "Lightning-Fast Transactions", description: "Experience blazing-fast blockchain transactions with our optimized infrastructure." },
      { icon: Layers, title: "Multi-Chain Support", description: "Seamlessly interact with multiple blockchain networks through a single, unified API." },
      { icon: Shield, title: "Enhanced Security", description: "Benefit from our robust security measures to protect your transactions and data." },
      { icon: Globe, title: "Global Accessibility", description: "Access our services from anywhere in the world, 24/7, with minimal downtime." },
      { icon: Users, title: "Community-Driven Development", description: "Engage with our vibrant community and shape the future of BARK BLINK." },
      { icon: Cpu, title: "Advanced Analytics", description: "Gain valuable insights with our powerful blockchain analytics tools." },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-syne">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <feature.icon className="h-12 w-12 text-[#D0BFB4] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-syne">{feature.title}</h3>
                <p className="text-gray-600 font-syne text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }