import React from "react";

function About() {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-400'>
      <div className='w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800'>
        <h1 className='text-5xl font-bold text-center text-gray-900 dark:text-white'>
            Fruit.ai
        </h1>
        <p className='text-lg text-gray-700 dark:text-gray-300'>
          Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
        </p>
      </div>
    </div>
  );
}

export default About;
