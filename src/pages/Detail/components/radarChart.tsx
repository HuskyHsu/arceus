interface RadarPorps {
  stats: number[];
}

interface LinePorps {
  deg: number;
  radius: number;
  center: number[];
}

interface TextPorps extends LinePorps {
  text: string;
  value: number;
}

const getPosition = (deg: number, radius: number, center: number[]) => {
  const radians = (deg * 2 * Math.PI) / 360;
  return [
    center[0] + radius * Math.cos(radians),
    center[1] + radius * Math.sin(radians),
  ];
};

const Line = ({ deg, radius, center }: LinePorps) => {
  const point1 = getPosition(deg, radius, center);
  const point2 = getPosition(deg + 180, radius, center);

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

const Text = ({ deg, radius, center, text, value }: TextPorps) => {
  const point = getPosition(deg, radius * 1.1, center);

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

export function Radar({
  stats: [hp, att, def, spAtk, spDef, speed],
}: RadarPorps) {
  const radius = 100;
  const maxValue = 255;
  const scale = radius / maxValue;
  const center = [radius * 1.4, radius * 1.4];

  const bgPoints = [...Array(6).keys()]
    .map((_, i) => 30 + i * 60)
    .map((deg) => getPosition(deg, radius, center));

  const speciesStrength = [
    getPosition(270, (hp * radius) / 255, center),
    getPosition(330, (att * radius) / 165, center),
    getPosition(30, (def * radius) / 200, center),
    getPosition(90, (speed * radius) / 150, center),
    getPosition(150, (spDef * radius) / 200, center),
    getPosition(210, (spAtk * radius) / 165, center),
  ];

  return (
    <svg
      className="w-full h-auto"
      viewBox={`0 0 ${center[0] * 2} ${center[1] * 2}`}
    >
      <polygon points={bgPoints.flat().join(", ")} fill="#e9e9e9" />
      <g>
        <Line deg={90} radius={radius} center={center} />
        <Line deg={30} radius={radius} center={center} />
        <Line deg={-30} radius={radius} center={center} />
      </g>
      <polygon
        points={speciesStrength.flat().join(", ")}
        fill="#339DDF"
        fillOpacity="0.6"
      />
      <g>
        <Text text="HP" value={hp} deg={270} radius={radius} center={center} />
        <Text
          text="攻擊"
          value={att}
          deg={330}
          radius={radius}
          center={center}
        />
        <Text
          text="防禦"
          value={def}
          deg={30}
          radius={radius}
          center={center}
        />
        <Text
          text="速度"
          value={speed}
          deg={90}
          radius={radius}
          center={center}
        />
        <Text
          text="特防"
          value={spDef}
          deg={150}
          radius={radius}
          center={center}
        />
        <Text
          text="特攻"
          value={spAtk}
          deg={210}
          radius={radius}
          center={center}
        />
      </g>
    </svg>
  );
}
