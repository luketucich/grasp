import React from "react";

function GraphPaperBackground() {
  return (
    <div className="absolute inset-0 bg-gray-100 z-0 overflow-hidden">
      <div className="h-full w-full bg-[length:20px_20px] bg-[image:linear-gradient(to_right,rgba(96,165,250,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.3)_1px,transparent_1px)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-purple-50/10"></div>
    </div>
  );
}

export default GraphPaperBackground;
