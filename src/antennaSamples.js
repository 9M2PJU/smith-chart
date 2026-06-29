export const antennaSamples = [
  { label: "Wire - 80 m half-wave dipole", frequency: 3.65, span: 0.4, markers: [[72, 0]] },
  { label: "Wire - 40 m half-wave dipole", frequency: 7.15, span: 0.3, markers: [[72, 0]] },
  { label: "Wire - 20 m half-wave dipole", frequency: 14.2, span: 0.35, markers: [[72, 0]] },
  { label: "Wire - 40 m inverted V", frequency: 7.15, span: 0.3, markers: [[52, -8]] },
  { label: "Wire - 40 m low dipole", frequency: 7.15, span: 0.3, markers: [[38, -18]] },
  { label: "Wire - fan dipole branch", frequency: 14.2, span: 0.35, markers: [[60, 12]] },
  { label: "Wire - trap dipole off-resonance", frequency: 7.15, span: 0.3, markers: [[45, 65]] },
  { label: "Wire - folded dipole", frequency: 14.2, span: 0.35, markers: [[288, 0]] },
  { label: "Wire - off-center-fed dipole", frequency: 14.2, span: 0.35, markers: [[200, -100]] },
  { label: "Wire - G5RV / ZS6BKW style doublet", frequency: 14.2, span: 0.35, markers: [[90, -220]] },
  { label: "Wire - 450 ohm ladder-line doublet", frequency: 7.15, span: 0.3, markers: [[450, -200]] },
  { label: "Wire - end-fed half-wave feedpoint", frequency: 14.2, span: 0.35, markers: [[2450, 0]] },
  { label: "Wire - random wire / long wire", frequency: 14.2, span: 0.35, markers: [[450, 300]] },
  { label: "Wire - T2FD / terminated folded dipole", frequency: 7.15, span: 0.3, markers: [[450, 0]] },
  { label: "Wire - beverage receive antenna", frequency: 3.65, span: 0.4, markers: [[450, 0]] },
  { label: "Vertical - quarter-wave ground plane", frequency: 14.2, span: 0.35, markers: [[36, -18]] },
  { label: "Vertical - elevated-radial quarter-wave", frequency: 14.2, span: 0.35, markers: [[50, 0]] },
  { label: "Vertical - 40 m loaded vertical", frequency: 7.15, span: 0.3, markers: [[18, -120]] },
  { label: "Vertical - short mobile whip", frequency: 7.15, span: 0.3, markers: [[8, -150]] },
  { label: "Vertical - 5/8 wave", frequency: 52, span: 4, markers: [[150, -80]] },
  { label: "Vertical - multiband trapped vertical", frequency: 14.2, span: 0.35, markers: [[25, -60]] },
  { label: "Vertical - inverted L", frequency: 7.15, span: 0.3, markers: [[35, 250]] },
  { label: "Loop - full-wave horizontal loop", frequency: 7.15, span: 0.3, markers: [[100, 0]] },
  { label: "Loop - delta loop", frequency: 14.2, span: 0.35, markers: [[100, 30]] },
  { label: "Loop - quad loop", frequency: 28.5, span: 1.7, markers: [[120, 0]] },
  { label: "Loop - small magnetic loop", frequency: 7.15, span: 0.3, markers: [[12, 45]] },
  { label: "Loop - tuned magnetic loop", frequency: 14.2, span: 0.35, markers: [[1.5, 0]] },
  { label: "Beam - Yagi driven element", frequency: 14.2, span: 0.35, markers: [[25, 0]] },
  {
    label: "Beam - Yagi with hairpin match",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [25, 0],
      [50, 0],
    ],
  },
  { label: "Beam - Moxon rectangle", frequency: 28.5, span: 1.7, markers: [[50, 0]] },
  { label: "Beam - hexbeam", frequency: 14.2, span: 0.35, markers: [[50, 0]] },
  { label: "Beam - quad driven loop", frequency: 28.5, span: 1.7, markers: [[100, 0]] },
  { label: "VHF/UHF - 2 m quarter-wave whip", frequency: 146, span: 4, markers: [[36, -18]] },
  { label: "VHF/UHF - 2 m half-wave vertical", frequency: 146, span: 4, markers: [[70, 0]] },
  { label: "VHF/UHF - 2 m J-pole match point", frequency: 146, span: 4, markers: [[50, 0]] },
  { label: "VHF/UHF - 2 m Slim Jim high-Z section", frequency: 146, span: 4, markers: [[300, 0]] },
  { label: "VHF/UHF - 70 cm quarter-wave whip", frequency: 435, span: 20, markers: [[36, -12]] },
  { label: "VHF/UHF - collinear vertical", frequency: 435, span: 20, markers: [[50, 0]] },
  { label: "Transformer - 1:1 choke / current balun", frequency: 14.2, span: 0.35, markers: [[50, 0]] },
  {
    label: "Transformer - 2:1 for 25 ohm Yagi",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [25, 0],
      [50, 0],
    ],
  },
  {
    label: "Transformer - 4:1 OCF dipole balun",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [200, 0],
      [50, 0],
    ],
  },
  {
    label: "Transformer - 4:1 folded dipole balun",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [288, 0],
      [72, 0],
    ],
  },
  {
    label: "Transformer - 6:1 folded dipole to 50 ohm",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [300, 0],
      [50, 0],
    ],
  },
  {
    label: "Transformer - 9:1 random-wire unun",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [450, 300],
      [50, 33],
    ],
  },
  {
    label: "Transformer - 49:1 EFHW unun",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [2450, 0],
      [50, 0],
    ],
  },
  {
    label: "Transformer - 64:1 high-Z end-fed unun",
    frequency: 14.2,
    span: 0.35,
    markers: [
      [3200, 0],
      [50, 0],
    ],
  },
  {
    label: "Transformer - 4:1 balanced tuner input",
    frequency: 7.15,
    span: 0.3,
    markers: [
      [450, -200],
      [112.5, -50],
    ],
  },
];

export function applyAntennaSampleToSettings(sample, current) {
  return {
    ...current,
    zo: 50,
    frequency: sample.frequency,
    frequencyUnit: "MHz",
    fSpan: sample.span,
    fSpanUnit: "MHz",
    fRes: 40,
    vswrCircles: [1.5, 2, 3],
    zMarkers: sample.markers,
  };
}

export function applyAntennaSampleToCircuit(sample, current) {
  const [real, imaginary] = sample.markers[0];
  const first = current[0] ?? { name: "blackBox" };
  return [{ ...first, real, imaginary }, ...current.slice(1)];
}
