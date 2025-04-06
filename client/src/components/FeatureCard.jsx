import React from "react";

const FeatureCard = ({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  title,
  description,
  color = "blue",
  rotation = 0,
}) => {
  const colorMap = {
    blue: {
      border: "border-blue-200",
      background: "bg-blue-50",
      text: "text-blue-500",
      shadow: "shadow-[0.5rem_0.5rem_0rem_#c7d2fe]",
    },
    green: {
      border: "border-green-200",
      background: "bg-green-50",
      text: "text-green-500",
      shadow: "shadow-[0.5rem_0.5rem_0rem_#d1fae5]",
    },
    purple: {
      border: "border-purple-200",
      background: "bg-purple-50",
      text: "text-purple-500",
      shadow: "shadow-[0.5rem_0.5rem_0rem_#ede9fe]",
    },
  };

  const colorStyle = colorMap[color] || colorMap.blue;

  let rotationClass = "";
  if (rotation > 0) {
    rotationClass = `rotate-${rotation}`;
  } else if (rotation < 0) {
    rotationClass = `-rotate-${Math.abs(rotation)}`;
  }

  return (
    <div
      className={`bg-white rounded-xl border ${colorStyle.border} p-8 relative ${colorStyle.shadow} ${rotationClass}`}
    >
      <div className="mb-6 flex justify-center">
        <div
          className={`w-14 h-14 ${colorStyle.background} rounded-lg flex items-center justify-center border ${colorStyle.border}`}
        >
          <Icon className={colorStyle.text} size={28} strokeWidth={2} />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-zinc-800 mb-3 text-center">
        {title}
      </h3>
      <p className="text-zinc-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
