import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { radioColors } from "./commonFunctions.js";

function Footer() {
  return (
    <Box component="footer" sx={{ mt: 4, px: 2, py: 3, textAlign: "center", color: radioColors.text }}>
      <Typography variant="body2">
        9M2PJU Smith Chart is based on the original Online Smith Chart tool by{" "}
        <Link href="https://www.will-kelsey.com" target="_blank" rel="noopener noreferrer">
          Will Kelsey
        </Link>
        .
      </Typography>
    </Box>
  );
}

export default Footer;
