import it from "./it";
import en from "./en";
import fr from "./fr";
import de from "./de";

export default (currentLang: string) => {
  switch (currentLang) {
    case "it":
      return it;
    case "en":
      return en;
    case "fr":
      return fr;
    case "de":
      return de;
    default:
      return en;
  }
};
