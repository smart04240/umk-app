import * as React from 'react';
import {Image, Keyboard, Text, TouchableOpacity, useWindowDimensions, View,} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import useTranslated from "../hooks/useTranslated";
import ClusteredMapView from "../components/map/ClusteredMapView";
import MapView from 'react-native-maps';
import Actions from "../redux/Actions";
import * as Location from 'expo-location';

export default function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector(state => state.mapData);
    const locale = useSelector(state => state.locale);
    const [locationPermission, setLocationPermission] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState('');
    const map = React.useRef();

    React.useEffect(() => {
        /* Request location permissions */
        Location.requestPermissionsAsync().then(({status}) => {
            if (status === 'granted')
                setLocationPermission(true);
        });
    }, []);

    const renderMarker = React.useCallback(marker => (
        <MapView.Marker
            key={marker.id}
            title={marker.title}
            tracksViewChanges={false}
            image={marker.category?.thumbnail_url}
            onPress={() => navigation.navigate('marker', {marker})}
            coordinate={{
                latitude: marker.location.lat,
                longitude: marker.location.lng,
            }}
        />
    ), [locale, navigation]);

    React.useEffect(() => {
        if (!data.markers?.length || !map?.current?.getMapRef())
            return;

        setTimeout(() => {
            map.current.getMapRef().fitToCoordinates(
                data.markers.map(marker => ({latitude: marker.location.lat, longitude: marker.location.lng})),
                {
                    edgePadding: {
                        top: 100, // 50 is the baseMapPadding
                        right: 100,
                        left: 100,
                        bottom: 100
                    },
                    animated: false,
                }
            );
        }, 1);
    }, [data.markers, map]);

    return (
        <>
            <ClusteredMapView
                ref={map}
                onPress={Keyboard.dismiss}
                width={useWindowDimensions().width}
                height={400}
                clusteringEnabled={true}
                data={data.filteredMarkers}
                renderMarker={renderMarker}
                showsUserLocation={!!locationPermission}
                initialRegion={{
                    latitude: 54.35205,
                    longitude: 18.64637,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            />
            <View style={styles.categories.container}>
                {data.categories.map(category => (
                    <TouchableOpacity key={category.slug} style={{width: '30%'}}
                                      onPress={() => dispatch(Actions.ToggleCategory(category.slug))}>
                        <View style={[
                            styles.categories.button,
                            data.selectedCategories.length && !data.selectedCategories.includes(category.slug) ? styles.categories.inactive : undefined
                        ]}>
                            <Image style={styles.categories.icon} source={{uri: category.thumbnail_url}}/>
                            <Text style={styles.categories.name}>
                                {useTranslated(category.name)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

const styles = {
    search: {
        marginBottom: 20,
        justifyContent: 'center',
    },
    search_input: {
        height: 40,
        borderRadius: 15,
        paddingLeft: 30,
        paddingRight: 60,
    },
    search_icon: {
        position: 'absolute',
        right: 30,
    },
    categories: {
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        button: {
            marginBottom: 10,
            alignItems: 'center',
        },
        icon: {
            width: 50,
            height: 50,
            resizeMode: 'contain',
        },
        name: {
            textAlign: 'center',
        },
        inactive: {
            opacity: 0.5,
        },
    },
};
