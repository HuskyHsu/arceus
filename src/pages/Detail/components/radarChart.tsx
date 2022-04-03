const getPosition = (deg: number, radius: number, center: number[]) => {
  const radians = (deg * 2 * Math.PI) / 360;
  return [
    center[0] + radius * Math.cos(radians),
    center[1] + radius * Math.sin(radians),
  ];
};

interface Porps {
  stats: number[];
}

export function Radar({ stats: [hp, att, def, spAtk, spDef, speed] }: Porps) {
  const radius = 100;
  const maxValue = 255;
  const center = [radius * 1.4, radius * 1.4];

  const pgPoints = [...Array(6).keys()]
    .map((_, i) => 30 + i * 60)
    .map((deg) => getPosition(deg, radius, center));

  const speciesStrength = [
    getPosition(30, (def * radius) / maxValue, center),
    getPosition(90, (speed * radius) / maxValue, center),
    getPosition(150, (spDef * radius) / maxValue, center),
    getPosition(210, (spAtk * radius) / maxValue, center),
    getPosition(270, (hp * radius) / maxValue, center),
    getPosition(330, (att * radius) / maxValue, center),
  ];

  return (
    <svg className="w-96" viewBox={`0 0 ${radius * 2.8} ${radius * 2.8}`}>
      <polygon points={pgPoints.flat().join(", ")} fill="#e9e9e9" />
      <line
        x1={radius * 1.4}
        y1={radius * 0.4}
        x2={radius * 1.4}
        y2={radius * 2.4}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <line
        x1={getPosition(30, radius, center)[0]}
        y1={getPosition(30, radius, center)[1]}
        x2={getPosition(210, radius, center)[0]}
        y2={getPosition(210, radius, center)[1]}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <line
        x1={getPosition(-30, radius, center)[0]}
        y1={getPosition(-30, radius, center)[1]}
        x2={getPosition(150, radius, center)[0]}
        y2={getPosition(150, radius, center)[1]}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <polygon
        points={speciesStrength.flat().join(", ")}
        fill="#339DDF"
        fillOpacity="0.6"
      />
    </svg>
  );
}
