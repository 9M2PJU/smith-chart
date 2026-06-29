# 9M2PJU Smith Chart

9M2PJU Smith Chart is a browser-based Smith chart tool adapted for amateur radio antenna work. It helps radio amateurs visualize antenna feedpoint impedance, SWR behavior, matching-network movement, and common 50 ohm matching targets directly on a Smith chart.

The app is based on the original Online Smith Chart tool by Will Kelsey and has been reworked for 9M2PJU amateur radio usage.

## Purpose

This version focuses on practical ham-radio matching tasks:

- Checking how an antenna feedpoint impedance sits on a Smith chart.
- Comparing antenna loads against 50 ohm systems.
- Viewing VSWR circles for quick match quality checks.
- Trying matching components such as capacitors, inductors, transmission lines, stubs, and transformers.
- Using sample antenna impedances as starting points for learning and experimentation.
- Working comfortably in both desktop and mobile browsers.

In the app, **BLACK BOX** represents the load or device being matched. For amateur radio use, this usually means the antenna feedpoint impedance or another unknown RF load. For example, a resonant dipole may be near `72 + j0 ohms`, while a short loaded vertical may be much lower resistance with capacitive reactance.

## Amateur Radio Additions

The app now includes an **Amateur radio** settings area with ham-focused shortcuts.

Band presets were added for common amateur bands:

- 160 m
- 80 m
- 60 m
- 40 m
- 30 m
- 20 m
- 17 m
- 15 m
- 12 m
- 10 m
- 6 m
- 2 m
- 70 cm

Applying a band preset sets a representative frequency, frequency span, 50 ohm reference impedance, and useful VSWR circles.

## Antenna Samples

Antenna sample presets were added as practical starting points. Each sample sets the frequency range and places a representative impedance marker on the Smith chart.

Current samples:

- 20 m resonant dipole
- 40 m low dipole
- 40 m loaded vertical
- 20 m off-center-fed
- 20 m end-fed/random wire
- 40 m small magnetic loop
- 2 m quarter-wave whip

These are approximate educational examples, not guaranteed values for every real antenna setup. Actual impedance depends on height, ground, feedline, nearby objects, construction, and measurement method.

## Results Improvements

An antenna-focused summary was added to the results area. It helps show:

- Match quality.
- Operating frequency.
- Reactance type.
- Best VSWR.
- Approximate 2:1 bandwidth.
- Approximate 3:1 bandwidth.

This makes the tool more useful for quick antenna-tuning checks instead of only general RF matching.

## Interface Changes

Several interface changes were made to simplify the app for this use case:

- Renamed the app to **9M2PJU SMITH CHART**.
- Updated the browser title bar and metadata to match the app title.
- Changed the theme to a restrained amateur-radio style.
- Improved desktop and mobile browser layout.
- Removed the old helper/resource button section.
- Removed external navigation buttons for TRGMC and Online Circuit Solver.
- Removed the old home/Smith Chart navigation button group.
- Removed on-page Tutorials, Equations, and Release Notes sections from the main interface.
- Kept the experience focused on the Smith chart, circuit, settings, and results.

## Deployment

The site is configured for GitHub Pages deployment from the `main` branch workflow to the `gh-pages` branch.

The published custom domain is:

`smith.hamradio.my`

The GitHub Pages workflow was updated to use write permission for `GITHUB_TOKEN`, Node.js 24, and the correct custom domain.

## Credit

This project is based on the original Online Smith Chart tool by **Will Kelsey**.

Thank you to Will Kelsey for creating and sharing the original tool that made this amateur-radio adaptation possible.

9M2PJU modifications adapt the tool for amateur radio antenna work, simplify the public interface, add ham-band and antenna examples, update the theme, and improve mobile/desktop usability.

## License

This work remains licensed under the Creative Commons Attribution 4.0 International License. You may not resell this tool.
