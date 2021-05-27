import {useSelector} from "react-redux";
import ThemeStyles from "../constants/ThemeStyles";
import {ucfirst} from "../helpers/functions";

export default function useThemeStyles( ) {
    const theme = ucfirst(useSelector(state => state.app.theme));
    return ThemeStyles[theme] || ThemeStyles.Light;
};
