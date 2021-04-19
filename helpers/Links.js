import * as Linking from 'expo-linking';
import {Platform} from 'react-native';

export default {
    openURL: link => Linking.openURL(link),
    openMap: (title, lat, lng) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const url = Platform.select({
            ios: `${scheme}${title}@${latLng}`,
            android: `${scheme}${latLng}(${title})`
        });
        Linking.openURL(url);
    },
    openPhone: phone => Linking.openURL('tel:' + phone),
    openEmail: email => Linking.openURL('mailto:' + email),
};
