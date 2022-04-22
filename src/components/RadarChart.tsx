const radius = 100;
const center = [radius * 1.4, radius * 1.4];
interface RadarPorps {
  stats: number[];
  color: string;
}

interface LinePorps {
  deg: number;
}

interface TextPorps {
  deg?: number;
  text?: string;
  value: number;
}

const getPosition = (deg: number, radius: number) => {
  const radians = (deg * 2 * Math.PI) / 360;
  return [
    center[0] + radius * Math.cos(radians),
    center[1] + radius * Math.sin(radians),
  ];
};

const Line = ({ deg }: LinePorps) => {
  const point1 = getPosition(deg, radius);
  const point2 = getPosition(deg + 180, radius);

  return (
    <line
      x1={point1[0]}
      y1={point1[1]}
      x2={point2[0]}
      y2={point2[1]}
      stroke="#FFFFFF"
      strokeWidth="2"
    />
  );
};

const Text = ({ deg, text, value }: TextPorps) => {
  const point = getPosition(deg as number, radius * 1.1);

  return (
    <>
      <text x={point[0]} y={point[1] - 3} fontSize="0.5em" textAnchor="middle">
        {text}
      </text>
      <text x={point[0]} y={point[1] + 7} fontSize="0.5em" textAnchor="middle">
        {value}
      </text>
    </>
  );
};

const TotalText = ({ value }: TextPorps) => {
  const point = getPosition(0, 0);

  return (
    <>
      <text x={point[0]} y={point[1] + 10} fontSize="1.5em" textAnchor="middle">
        {value}
      </text>
    </>
  );
};

export function RadarChart({
  stats: [hp, att, def, spAtk, spDef, speed],
  color = "#339DDF",
}: RadarPorps) {
  const total = hp + att + def + spAtk + spDef + speed;

  const bgPoints = [...Array(6).keys()]
    .map((_, i) => 30 + i * 60)
    .map((deg) => getPosition(deg, radius));

  const speciesStrength = [
    getPosition(270, (hp * radius) / 255),
    getPosition(330, (att * radius) / 165),
    getPosition(30, (def * radius) / 200),
    getPosition(90, (speed * radius) / 150),
    getPosition(150, (spDef * radius) / 200),
    getPosition(210, (spAtk * radius) / 165),
  ];

  const labels = [
    { name: "HP", value: hp, deg: 270 },
    { name: "攻擊", value: att, deg: 330 },
    { name: "防禦", value: def, deg: 30 },
    { name: "速度", value: speed, deg: 90 },
    { name: "特防", value: spDef, deg: 150 },
    { name: "特攻", value: spAtk, deg: 210 },
  ];

  return (
    <svg
      className="w-full h-auto"
      viewBox={`0 0 ${center[0] * 2} ${center[1] * 2}`}
    >
      <polygon points={bgPoints.flat().join(", ")} fill="#e9e9e9" />
      <g>
        <Line deg={-30} />
        <Line deg={30} />
        <Line deg={90} />
      </g>
      <polygon
        points={speciesStrength.flat().join(", ")}
        fill={color}
        fillOpacity="0.6"
      />
      <g>
        {labels.map((label) => (
          <Text
            key={label.deg}
            text={label.name}
            value={label.value}
            deg={label.deg}
          />
        ))}
        <TotalText text={"total"} value={total} />
      </g>
    </svg>
  );
}
