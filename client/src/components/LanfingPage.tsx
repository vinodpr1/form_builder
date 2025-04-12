import React, { ReactNode } from 'react';
import { ArrowRight, Shapes, Zap, Lock, Layout, Share2 } from 'lucide-react';

const  LandingPage=()=> {
 
 interface FeatureCard{
    icon: ReactNode,
    title: string,
    description: string
 }

  const featuresData:FeatureCard[] = [
    {
       icon: <Shapes className="w-6 h-6 text-purple-600" />,
       title: "Drag & Drop Builder",
       description: "Intuitive interface for building forms without any coding knowledge",
    },
    {
       icon: <Layout className="w-6 h-6 text-purple-600" />,
       title: "Custom Templates",
       description: "Start with pre-built templates or create your own from scratch"     
    },
    {
       icon: <Zap className="w-6 h-6 text-purple-600" />,
       title: "Real-time Preview",
       description: "See changes instantly as you build your form"  
    },
    {
 
       icon: <Lock className="w-6 h-6 text-purple-600" />,
       title: "Secure Submissions",
       description: "Enterprise-grade security for all your form data"
     
    },
    {    
        icon: <Share2 className="w-6 h-6 text-purple-600" />,
        title: "Easy Sharing",
        description: "Share your forms with a simple link or embed them"
    },
    {
       icon: <Layout className="w-6 h-6 text-purple-600" />,
       title: "Response Analytics",
       description: "Get insights with built-in analytics and reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Dynamic Forms
              <span className="text-purple-400"> in Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Easily create custom forms with our drag-and-drop builder — ideal for surveys, registrations, and feedback collection.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-purple-400 curtor-pointer text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-600 transition-colors">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-gray-200 cursor-pointer text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to create amazing forms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                featuresData.map((cardData) => (
                    <FeatureCard
                        icon={cardData.icon}
                        title={cardData.title}
                        description={cardData.description}
                    />
                ))
            }
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-purple-400 rounded-2xl p-8 sm:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start building?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already creating amazing forms with our platform.
            </p>
            <button className="bg-white text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Building for Free
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© 2025 FormBuilder Vinod Prajapati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-2xl border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;