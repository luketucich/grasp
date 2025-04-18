import React from "react";
import { Link } from "react-router";

const ActionButton = ({
  href,
  children,
  color = "blue",
  rotation = 0,
  external = false,
}) => {
  const colorMap = {
    blue: {
      border: "border-blue-400",
      background: "bg-blue-500",
      text: "text-white",
      shadow: "shadow-[0.3rem_0.3rem_0rem_#93c5fd]",
    },
    gray: {
      border: "border-gray-400",
      background: "bg-gray-400",
      text: "text-white",
      shadow: "shadow-[0.3rem_0.3rem_0rem_#d1d5db]",
    },
  };

  const colorStyle = colorMap[color] || colorMap.blue;

  let rotationClass = "";
  if (rotation > 0) {
    rotationClass = `rotate-${rotation}`;
  } else if (rotation < 0) {
    rotationClass = `-rotate-${Math.abs(rotation)}`;
  }

  const externalProps = external
    ? {
        onClick: (e) => {
          e.preventDefault();
          window.open(href, "_blank");
        },
        href: "#",
      }
    : { to: href };

  return (
    <div className="relative">
      <Link
        className={`px-8 py-3 font-medium rounded-lg inline-block ${colorStyle.background} ${colorStyle.text} border ${colorStyle.border} ${colorStyle.shadow} ${rotationClass}`}
        {...externalProps}
      >
        {children}
      </Link>
    </div>
  );
};

export default ActionButton;
