import React from "react";

const ProgressBar = ({ value }) => {
  const progress = Math.min(Math.max(value, 0), 100); // Ensure value is between 0 and 100

  // Function to interpolate between two colors
  const interpolateColor = (startColor, endColor, factor) => {
    const result = startColor.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (endColor[i] - startColor[i]));
    }
    return `rgb(${result.join(",")})`;
  };

  // Colors for interpolation
  const startColor = [255, 0, 0]; // Red
  const endColor = [0, 255, 0]; // Green

  // Calculate the interpolated color based on progress
  const interpolatedColor = interpolateColor(startColor, endColor, progress / 100);

  const progressBarStyle = {
    progressBarContainer: {
      width: "100%",
      height: "20px",
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      overflow: "hidden",
      position: "relative",
    },
    progressBar: {
      height: "100%",
      backgroundColor: interpolatedColor,
      transition: "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
      textAlign: "center",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: `${progress}%`,
    },
    progressText: {
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#000",
    },
  };

  return (
    <div style={progressBarStyle.progressBarContainer}>
      <div style={progressBarStyle.progressBar} />
      <span style={progressBarStyle.progressText}>{progress}%</span>
    </div>
  );
};

export default ProgressBar;
