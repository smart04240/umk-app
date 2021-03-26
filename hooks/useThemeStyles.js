
import {useSelector} from "react-redux";
import ThemeStyles from "../constants/ThemeStyles";
import {ucfirst} from "../helpers/functions";

export default function useThemeStyles( ) {
    const theme = ucfirst(useSelector(state => state.theme));
    return ThemeStyles[theme] || ThemeStyles.Light;
};
