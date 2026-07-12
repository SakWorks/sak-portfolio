const OrbitScene = ({ size = "normal" }) => {
  const scale = size === "small" ? 0.55 : 1;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="orbit-scene relative" style={{ width: 460 * scale, height: 460 * scale }}>
        <div className="orbit-ring-3d r1">
          <span className="orbit-star" />
        </div>
        <div className="orbit-ring-3d r2">
          <span className="orbit-star" />
        </div>
        <div className="orbit-ring-3d r3">
          <span className="orbit-star" />
        </div>
      </div>
    </div>
  );
};

export default OrbitScene;