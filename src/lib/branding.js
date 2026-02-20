import ShimeLogoWhite from "@/assets/shime-logo-white.png";
import ShimeLogoBlack from "@/assets/shime-logo-black.png";

const logoVersion = import.meta.env.VITE_SHIME_LOGO_VERSION || "";

function withVersion(url) {
  if (!logoVersion || !url) return url;
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}v=${logoVersion}`;
}

export const SHIME_LOGO_WHITE = withVersion(
  import.meta.env.VITE_SHIME_LOGO_WHITE_URL || ShimeLogoWhite
);
export const SHIME_LOGO_BLACK = withVersion(
  import.meta.env.VITE_SHIME_LOGO_BLACK_URL || ShimeLogoBlack
);
