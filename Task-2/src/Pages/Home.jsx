import React from 'react';
const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-xl text-center mb-8 max-w-2xl">
              Discover amazing features and solutions that will transform your experience
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy to Use",
                description: "Intuitive interface designed for the best user experience",
                icon: "🚀"
              },
              {
                title: "Secure",
                description: "Your data is protected with enterprise-grade security",
                icon: "🔒"
              },
              {
                title: "24/7 Support",
                description: "Our team is always here to help you succeed",
                icon: "💬"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users today</p>
          <a href="/Products" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
           Search Product
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;