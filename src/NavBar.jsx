import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";

import SnackbarContent from "@mui/material/SnackbarContent";
import { ThemeProvider } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GetAppIcon from "@mui/icons-material/GetApp";

import { radioColors, theme } from "./commonFunctions.js"; // import your theme

import SmithChartSvg from "./assets/smith-chart-icon.svg"; // import your SVG file
import LanguageSwitcher from "./LanguageSwitcher.jsx";

function NavBar() {
  const { t } = useTranslation();
  const [urlSnackbar, setUrlSnackbar] = useState(false);

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
          message={t("nav.urlCopied")}
          sx={{
            backgroundColor: radioColors.panel,
            color: "#fff",
            cursor: "pointer", // Indicate clickable
            maxWidth: 200,
          }}
        />
      </Snackbar>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: radioColors.panel, py: 1, borderBottom: `3px solid ${radioColors.accent}` }}>
          <Toolbar
            style={{ minHeight: 0 }}
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "space-between",
              px: { xs: 1, sm: 2 },
            }}
          >
            <Stack spacing={1} direction="row" sx={{ alignItems: "center", minWidth: 0 }}>
              <Box
                component="img"
                src={SmithChartSvg}
                alt="Smith Chart"
                sx={{ display: "block", flex: "0 0 auto", width: { xs: 42, sm: 50 }, height: { xs: 42, sm: 50 } }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  display: { xs: "block", md: "none" },
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                9M2PJU
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontWeight: "bold", display: { xs: "none", md: "block" } }}>
                {t("nav.title")}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" useFlexGap sx={{ alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap", minWidth: 0 }}>
              <LanguageSwitcher />
              <Tooltip title={t("nav.copyUrl")} placement="bottom">
                <IconButton
                  aria-label={t("nav.copyUrlAria")}
                  color="bland"
                  //on user click then copy url to clipboard
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                      setUrlSnackbar(true);
                    });
                  }}
                >
                  <GetAppIcon sx={{ fontSize: 30, color: radioColors.accent }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("nav.reset")} placement="bottom">
                <IconButton
                  aria-label={t("nav.resetAria")}
                  color="bland"
                  onClick={() => {
                    window.location.href = window.location.origin;
                  }}
                >
                  <RestartAltIcon sx={{ fontSize: 30, color: radioColors.accent }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default NavBar;
