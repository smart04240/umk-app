import * as React from 'react';
import {Keyboard, ScrollView, useWindowDimensions, View,} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import ClusteredMapView from "../components/map/ClusteredMapView";
import MapView from 'react-native-maps';
import Actions from "../redux/Actions";
import * as Location from 'expo-location';
import {FontAwesome5} from '@expo/vector-icons';
import useTranslator from "../hooks/useTranslator";
import Input from "../components/form/Input";
import Translations from "../constants/Translations";
import {selectFilteredMarkers} from "../redux/reducers/mapReducer";
import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles";
import CategoryButton from "../components/buttons/CategoryButton";
import Layout from "../constants/Layout";
import Main from "../components/general/Main";

export default function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const theme = useThemeStyles();
    const markers = useSelector(state => selectFilteredMarkers(state));
    const data = useSelector(state => state.mapData);
    const [locationPermission, setLocationPermission] = React.useState(null);
    const map = React.useRef();

    React.useEffect(() => {
        /* Request location permissions */
        Location.requestPermissionsAsync().then(({status}) => {
            if (status === 'granted')
                setLocationPermission(true);
        });
    }, []);

    React.useEffect(() => {
        if (!markers?.length || !map?.current?.getMapRef())
            return;

        map.current.getMapRef().fitToCoordinates(
            markers.map(marker => ({latitude: marker.latitude, longitude: marker.longitude})),
            {
                edgePadding: {
                    top: 100, // 50 is the baseMapPadding
                    right: 100,
                    left: 100,
                    bottom: 100,
                },
                animated: false,
            }
        );
    }, [markers, map]);

    const renderMarker = React.useCallback(marker => (
        <MapView.Marker
            key={marker.id}
            title={translate(marker.title)}
            tracksViewChanges={false}
            coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
        >
            <FontAwesome5 name="map-marker" size={32} color={marker.category.color}/>
        </MapView.Marker>
    ), [translate, navigation]);

    const searchChange = React.useCallback(text => dispatch(Actions.ChangeMapSearch(text)), []);

    return (
        <>
            <View style={{overflow: 'hidden', paddingBottom: 15, zIndex: 10}}>
                <View style={[styles.search, {backgroundColor: theme.box_bg}]}>
                    <Input placeholder={translate(Translations.Search)} onDebouncedChange={searchChange}/>
                </View>
            </View>

            <ScrollView>
                <ClusteredMapView
                    ref={map}
                    style={styles.map}
                    onPress={Keyboard.dismiss}
                    width={useWindowDimensions().width}
                    height={500}
                    clusteringEnabled={true}
                    data={markers}
                    renderMarker={renderMarker}
                    showsUserLocation={!!locationPermission}
                    initialRegion={{
                        latitude: 53.0196473,
                        longitude: 18.6108992,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03,
                    }}
                />
                <Main style={styles.categories.container}>
                    {data.categories.map(category => (
                        <CategoryButton
                            key={category.slug}
                            category={category}
                            style={{width: '25%', marginBottom: 20}}
                            size={Layout.width * 0.15}
                            buttonStyle={data.selectedCategories.length && !data.selectedCategories.includes(category.slug) ? styles.categories.inactive : undefined}
                            onPress={() => dispatch(Actions.ToggleCategory(category.slug))}
                        />
                    ))}
                </Main>
            </ScrollView>
        </>
    );
};

const styles = {
    search: {
        zIndex: 10,
        padding: 20,
        paddingTop: 10,
        ...GeneralStyles.bottom_border_radius,
        elevation: 10,
    },
    map: {},
    categories: {
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            paddingTop: 20,
            paddingHorizontal: 20,
        },
        inactive: {
            opacity: 0.5,
        },
    },
};
