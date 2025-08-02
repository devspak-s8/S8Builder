import React from 'react';

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Large floating blobs */}
      <div className="floating-blob morph-blob w-96 h-96 bg-primary/10 -top-48 -left-48 absolute" />
      <div className="floating-blob morph-blob w-80 h-80 bg-accent/10 top-1/4 -right-40 absolute delay-500" />
      <div className="floating-blob morph-blob w-64 h-64 bg-primary-glow/10 bottom-1/4 left-1/4 absolute delay-300" />
      <div className="floating-blob morph-blob w-72 h-72 bg-accent/8 -bottom-36 -right-36 absolute delay-700" />

      {/* Medium floating shapes */}
      <div className="floating-blob w-48 h-48 bg-primary/5 top-1/2 left-1/2 absolute delay-200" />
      <div className="floating-blob w-40 h-40 bg-accent/5 top-3/4 left-1/3 absolute delay-600" />

      {/* Small floating particles */}
      <div className="floating-blob w-24 h-24 bg-primary-glow/8 top-1/3 right-1/4 absolute delay-400" />
      <div className="floating-blob w-32 h-32 bg-accent/6 bottom-1/3 left-1/6 absolute delay-800" />
    </div>
  );
};

export default BackgroundBlobs;
