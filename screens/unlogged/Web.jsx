import React from "react";
import {WebView} from "react-native-webview";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";

export default function Web({route}) {
    return (
        <ScreenWithHiddenHeader>
            <WebView
                incognito={true} // reset sessions between logins
                source={{uri: route.params.uri}}
                // onError={ console.error.bind(console, 'error') }
                javaScriptEnabled={true}
            />
        </ScreenWithHiddenHeader>
    );
};
