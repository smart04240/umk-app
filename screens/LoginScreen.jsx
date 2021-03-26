import React from "react";
import { Text, TouchableOpacity, View} from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import UniversityLogo from "../components/UniversityLogo";
import LocaleSwitcher from "../components/locale/LocaleSwitcher";

export default function LoginScreen(props) {

    const ThemeStyles = useThemeStyles();

	React.useLayoutEffect(() => {
        props.navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerTitle: '',
			headerStyle: { height: 0 }
		});
    }, [ props.navigation ]);

    return (
        <View style={[ ThemeStyles.bg, { flex: 1 }]}>
            <LocaleSwitcher/>
			<UniversityLogo/>
        </View>
    );
};
