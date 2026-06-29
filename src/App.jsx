import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CardContent from "@mui/material/CardContent";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import Circuit from "./Circuit.jsx";
import Graph from "./Graph.jsx";
import Results from "./Results.jsx";
import Settings from "./Settings.jsx";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { syncObjectToUrl, updateObjectFromUrl } from "./urlFunctions.js"; // Import the syncObjectToUrl function
import { theme, convertSettingsToFloat } from "./commonFunctions.js";
import { circuitComponents } from "./circuitComponents.js";

import { allImpedanceCalculations } from "./impedanceFunctions.js";
// import { sParamFrequencyRange } from "./sparam.js"; // Import the sParamFrequencyRange function

import debounce from "lodash/debounce";

const STACKED_LAYOUT_STORAGE_KEY = "smith-chart-stacked-layout";

function readStackedLayoutPreference() {
  try {
    return localStorage.getItem(STACKED_LAYOUT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

const initialState = {
  zo: 50,
  frequency: 2440,
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

const initialCircuit = [{ name: "blackBox", ...circuitComponents.blackBox.default }];

const params = new URLSearchParams(window.location.search);
var [stateInURL, defaultCircuit, urlContainsState] = updateObjectFromUrl(initialState, initialCircuit, params);
console.log("stateInURL", stateInURL, defaultCircuit, urlContainsState);

function App() {
  const { t, i18n } = useTranslation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [userCircuit, setUserCircuit] = useState(defaultCircuit);
  const [settings, setSettings] = useState(stateInURL);
  const [urlSnackbar, setUrlSnackbar] = useState(false);
  const [showIdeal, setShowIdeal] = useState(false);
  const [stackedLayout, setStackedLayout] = useState(readStackedLayoutPreference);

  const settingsFloat = convertSettingsToFloat(JSON.parse(JSON.stringify(settings)));

  //debounding the URL syncing because 100 updateHistory in 10s causes chrome to crash, which happens when using sliders
  const debouncedSync = useMemo(() => debounce(syncObjectToUrl, 1000), []);
  // Run when dependencies change
  useEffect(() => {
    debouncedSync(settings, initialState, userCircuit, initialCircuit);
  }, [settings, userCircuit, debouncedSync]);

  const [processedImpedanceResults, spanResults, multiZResults, gainArray, noiseArray, numericalFrequency, RefIn, noiseFrequency] =
    allImpedanceCalculations(userCircuit, settingsFloat, showIdeal);

  //check if esr or esl exists, and if it does exist check that it is not 0 or ''
  const nonIdealUsed = userCircuit.findIndex((c) => (c.esr != null && c.esr != 0 && c.esr !== "") || (c.esl != null && c.esl != 0 && c.esl !== ""));

  const sParamIndex = userCircuit.findIndex((c) => c.name === "sparam");
  const sParameters = sParamIndex === -1 ? null : userCircuit[sParamIndex];
  const chosenSparameter =
    sParamIndex === -1 ? null : { ...userCircuit[sParamIndex].data[numericalFrequency], zo: userCircuit[sParamIndex].settings.zo };
  const chosenNoiseParameter = noiseFrequency === -1 ? null : userCircuit[sParamIndex].noise[noiseFrequency];
  // console.log("chosenNoiseParameter", chosenNoiseParameter);

  const handleSnackbarClick = () => {
    setSettings({ ...initialState });
    setUserCircuit([{ ...initialCircuit[0] }]);
    setUrlSnackbar(false);
  };

  //open the snackbar after 1 seconds if there is state in the URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (urlContainsState) {
        setUrlSnackbar(true);
      }
    }, 1000); // 1 seconds
    // Optional: Clean up the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = t("meta.pageTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta.pageDescription"));
  }, [i18n.language, t]);

  function handleLayoutChange(_event, newLayout) {
    if (newLayout == null) return;
    const isStacked = newLayout === "stacked";
    setStackedLayout(isStacked);
    try {
      localStorage.setItem(STACKED_LAYOUT_STORAGE_KEY, String(isStacked));
    } catch {
      // localStorage unavailable
    }
  }

  const useStackedLayout = isLargeScreen && stackedLayout;
  const circuitGridSize = useStackedLayout ? { xs: 12 } : { sm: 12, md: 6 };
  const graphGridSize = useStackedLayout ? { xs: 12 } : { xs: 12, sm: 12, md: 6, lg: 6 };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={urlSnackbar}
        autoHideDuration={10000}
        onClose={() => setUrlSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <SnackbarContent
          message={t("app.urlLoadedSnackbar")}
          sx={{
            backgroundColor: "#2196f3",
            color: "#fff",
            cursor: "pointer",
            maxWidth: 200,
          }}
          onClick={handleSnackbarClick}
        />
      </Snackbar>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          color: "rgb(37, 50, 64)",
          mx: 3,
          mt: 1,
        }}
      >
        <Typography sx={{ flex: 1, minWidth: 240 }}>{t("app.intro")}</Typography>
        {isLargeScreen && (
          <ToggleButtonGroup
            value={stackedLayout ? "stacked" : "sideBySide"}
            exclusive
            onChange={handleLayoutChange}
            size="small"
            aria-label={t("app.layoutToggleAria")}
          >
            <ToggleButton value="sideBySide" aria-label={t("app.layoutSideBySide")}>
              <ViewColumnIcon sx={{ mr: 0.75 }} fontSize="small" />
              {t("app.layoutSideBySide")}
            </ToggleButton>
            <ToggleButton value="stacked" aria-label={t("app.layoutStacked")}>
              <ViewAgendaIcon sx={{ mr: 0.75 }} fontSize="small" />
              {t("app.layoutStacked")}
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>
      <Box sx={{ flexGrow: 1, mx: { xs: 0, sm: 1, lg: 2 }, mt: 1 }}>
        <Grid container spacing={{ lg: 2, xs: 1 }}>
          <Grid size={circuitGridSize}>
            <Card>
              <CardContent>
                <Circuit
                  userCircuit={userCircuit}
                  setUserCircuit={setUserCircuit}
                  frequency={numericalFrequency}
                  setSettings={setSettings}
                  showIdeal={showIdeal}
                  stackedLayout={useStackedLayout}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={graphGridSize}>
            <Card sx={{ padding: 0 }}>
              <Graph
                zResultsSrc={multiZResults}
                zo={settingsFloat.zo}
                spanResults={spanResults}
                qCircles={settings.qCircles}
                vswrCircles={settings.vswrCircles}
                nfCircles={settings.nfCircles}
                gainInCircles={settings.gainInCircles}
                gainOutCircles={settings.gainOutCircles}
                zMarkers={settings.zMarkers}
                reflection_real={processedImpedanceResults.refReal}
                reflection_imag={processedImpedanceResults.refImag}
                sParameters={sParameters}
                chosenSparameter={chosenSparameter}
                freqUnit={settings.frequencyUnit}
                frequency={numericalFrequency}
                chosenNoiseParameter={chosenNoiseParameter}
                nonIdealUsed={nonIdealUsed}
                showIdeal={showIdeal}
                setShowIdeal={setShowIdeal}
              />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Card>
              <CardContent>
                <Results
                  zProc={processedImpedanceResults}
                  spanResults={spanResults}
                  freqUnit={settings.frequencyUnit}
                  sParameters={sParameters}
                  gainResults={gainArray}
                  noiseArray={noiseArray}
                  RefIn={RefIn}
                  zo={settingsFloat.zo}
                  frequency={numericalFrequency}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Card>
              <CardContent>
                <Settings
                  settings={settings}
                  setSettings={setSettings}
                  usedF={numericalFrequency}
                  chosenSparameter={chosenSparameter}
                  chosenNoiseParameter={chosenNoiseParameter}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
