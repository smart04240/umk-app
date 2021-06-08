import React from "react";
import { Linking } from "react-native";
import { WebView } from "react-native-webview";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";

export default function Web({ route, navigation }) {
// export default function Web(props) {
    // console.log(props);
    const uri = route.params.uri;
    // const uri = '';
	return (
		<ScreenWithHiddenHeader>
            <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ uri }}
                // onError={ console.error.bind(console, 'error') }
                javaScriptEnabled={ true }
            />
        </ScreenWithHiddenHeader>
    );
};