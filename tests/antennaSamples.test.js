import { expect, test } from "vitest";
import { allImpedanceCalculations } from "../src/impedanceFunctions.js";
import { antennaSamples, applyAntennaSampleToCircuit, applyAntennaSampleToSettings } from "../src/antennaSamples.js";

const initialSettings = {
  zo: 50,
  frequency: 14.2,
  frequencyUnit: "MHz",
  fSpan: 0,
  fSpanUnit: "MHz",
  fRes: 10,
  zMarkers: [],
  vswrCircles: [],
  qCircles: [],
  nfCircles: [],
  gainInCircles: [],
  gainOutCircles: [],
};

test("antenna sample labels are unique and grouped", () => {
  const labels = antennaSamples.map((sample) => sample.label);
  expect(new Set(labels).size).toBe(labels.length);
  expect(labels.some((label) => label.startsWith("Wire - "))).toBe(true);
  expect(labels.some((label) => label.startsWith("Vertical - "))).toBe(true);
  expect(labels.some((label) => label.startsWith("Loop - "))).toBe(true);
  expect(labels.some((label) => label.startsWith("Beam - "))).toBe(true);
  expect(labels.some((label) => label.startsWith("VHF/UHF - "))).toBe(true);
  expect(labels.some((label) => label.startsWith("Transformer - "))).toBe(true);
});

test("antenna samples contain finite practical settings", () => {
  expect(antennaSamples.length).toBeGreaterThan(40);
  antennaSamples.forEach((sample) => {
    expect(sample.label).toBeTruthy();
    expect(Number.isFinite(sample.frequency)).toBe(true);
    expect(sample.frequency).toBeGreaterThan(0);
    expect(Number.isFinite(sample.span)).toBe(true);
    expect(sample.span).toBeGreaterThan(0);
    expect(sample.markers.length).toBeGreaterThan(0);
    sample.markers.forEach(([real, imaginary]) => {
      expect(Number.isFinite(real)).toBe(true);
      expect(Number.isFinite(imaginary)).toBe(true);
      expect(real).toBeGreaterThan(0);
    });
  });
});

test("antenna samples apply to settings and black-box load", () => {
  const sample = antennaSamples.find((candidate) => candidate.label === "Transformer - 49:1 EFHW unun");
  const settings = applyAntennaSampleToSettings(sample, initialSettings);
  const circuit = applyAntennaSampleToCircuit(sample, [{ name: "blackBox", real: 50, imaginary: 0 }]);

  expect(settings).toMatchObject({
    zo: 50,
    frequency: 14.2,
    frequencyUnit: "MHz",
    fSpan: 0.35,
    fSpanUnit: "MHz",
    fRes: 40,
    vswrCircles: [1.5, 2, 3],
    zMarkers: [
      [2450, 0],
      [50, 0],
    ],
  });
  expect(circuit[0]).toMatchObject({ name: "blackBox", real: 2450, imaginary: 0 });
});

test("every antenna sample can run through impedance calculations", () => {
  antennaSamples.forEach((sample) => {
    const settings = applyAntennaSampleToSettings(sample, initialSettings);
    const circuit = applyAntennaSampleToCircuit(sample, [{ name: "blackBox", real: 50, imaginary: 0 }]);
    const [processedImpedanceResults, spanResults, multiZResults] = allImpedanceCalculations(circuit, settings);

    expect(Number.isFinite(processedImpedanceResults.refReal)).toBe(true);
    expect(Number.isFinite(processedImpedanceResults.refImag)).toBe(true);
    expect(processedImpedanceResults.zStr).toBeTruthy();
    expect(spanResults.length).toBeGreaterThan(0);
    expect(multiZResults.length).toBeGreaterThan(0);
  });
});
