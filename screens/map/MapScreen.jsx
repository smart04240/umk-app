import * as React from 'react';
import {ActivityIndicator, Keyboard, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import ClusteredMapView from "../../components/map/ClusteredMapView";
import MapView from 'react-native-maps';
import Actions from "../../redux/Actions";
import * as Location from 'expo-location';
import {FontAwesome5} from '@expo/vector-icons';
import useTranslator from "../../hooks/useTranslator";
import Input from "../../components/form/Input";
import Translations from "../../constants/Translations";
import {selectFilteredMarkers} from "../../redux/reducers/mapReducer";
import GeneralStyles from "../../constants/GeneralStyles";
import CategoryButton from "../../components/buttons/CategoryButton";
import Layout from "../../constants/Layout";
import Main from "../../components/general/Main";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {MaterialIcons} from '@expo/vector-icons';
import Routes from "../../constants/Routes";
import TopBox from "../../components/general/TopBox";
import shadowGenerator from "../../helpers/shadowGenerator";
import useThemeStyles from "../../hooks/useThemeStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Links from "../../helpers/Links";

const MapHeight = Layout.height * 0.5;
const MapPadding = {
    top: 160, // 50 is the baseMapPadding
    right: 100,
    left: 100,
    bottom: 50,
};
const InitialRegion = {
    latitude: 53.0196473,
    longitude: 18.6108992,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
};

export default function MapScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const theme = useThemeStyles();
    const markers = useSelector(state => selectFilteredMarkers(state));
    const data = useSelector(state => state.mapData);
    const [locationPermission, setLocationPermission] = React.useState(false);
    const [locating, setLocating] = React.useState(false);
    const [callout, setCallout] = React.useState(null);
    const map = React.useRef();
    const searchPanelHeight = React.useRef(60);
    const offset = searchPanelHeight.current - GeneralStyles.bottom_border_radius.borderBottomLeftRadius;

    React.useEffect(() => {
        /* Request location permissions */
        Location.requestForegroundPermissionsAsync().then(({status}) => {
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
                edgePadding: MapPadding,
                animated: false,
            }
        );
    }, [markers, map]);

    const renderMarker = marker => (
        <MapView.Marker
            key={marker.id}
            onPress={() => setCallout(marker)}
            tracksViewChanges={false}
            coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
        >
            <FontAwesome5 name="map-marker" size={32} color={marker.category.color}/>
        </MapView.Marker>
    );

    const searchChange = text => dispatch(Actions.ChangeMapSearch(text));

    const onLayout = e => searchPanelHeight.current = e.nativeEvent.layout.height;

    const goToList = () => navigation.navigate(Routes.MarkersList);

    const locate = () => {
        setLocating(true);
        Location.getCurrentPositionAsync().then(result => {
            map.current.getMapRef?.().animateToRegion({
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            });
            setLocating(false);
        });
    };

    const onMapPress = () => {
        setCallout(null);
        Keyboard.dismiss();
    };

    const navigateToMarkerDetails = () => navigation.navigate(Routes.Marker, callout);
    const openMarker = () => Links.openMap(translate(callout.title), callout.latitude, callout.longitude);

    return (
        <Main>
            <TopBox style={{position: 'absolute', width: '100%'}} onLayout={onLayout}>
                <Input placeholder={translate(Translations.Search)} onDebouncedChange={searchChange}/>
            </TopBox>

            <ScrollView
                style={{marginTop: offset}}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.map}>
                    {!!callout && (
                        <View style={[styles.callout.card, {backgroundColor: theme.box_bg}]}>
                            <Text style={[styles.callout.title, {color: theme.dark_text}]}>
                                {translate(callout.title)}
                            </Text>
                            <TouchableOpacity style={styles.callout.button} onPress={navigateToMarkerDetails}>
                                <MaterialCommunityIcons name="information-variant" size={24} color={theme.blue_text} />
                                <Text style={[styles.callout.buttonText, {color: theme.blue_text}]}>
                                    {translate(Translations.Details)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.callout.button} onPress={openMarker}>
                                <MaterialCommunityIcons name="google-maps" size={24} color={theme.blue_text} />
                                <Text style={[styles.callout.buttonText, {color: theme.blue_text}]}>
                                    {translate(Translations.Route)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <ClusteredMapView
                        ref={map}
                        onPress={onMapPress}
                        width={useWindowDimensions().width}
                        height={MapHeight}
                        clusteringEnabled={true}
                        data={markers}
                        renderMarker={renderMarker}
                        showsUserLocation={locationPermission}
                        showsMyLocationButton={false}
                        initialRegion={InitialRegion}
                    />

                    <TouchableOpacity style={styles.listButton.button} onPress={goToList}>
                        <Text style={styles.listButton.text}>lista</Text>
                    </TouchableOpacity>

                    {locationPermission && (
                        <TouchableOpacity style={styles.locationButton.button} onPress={locate}>
                            <LinearGradient
                                style={styles.locationButton.gradient}
                                colors={[Colors.PrussianBlue, Colors.Blue]}
                                start={{x: 0, y: 0.5}}
                                end={{x: 0.5, y: 0}}
                            >
                                {!locating && <MaterialIcons name="my-location" size={24} color={Colors.White}/>}
                                {locating && <ActivityIndicator color={Colors.White}/>}
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
                <Main style={styles.categories.container}>
                    {data.categories.map(category => (
                        <CategoryButton
                            key={category.id}
                            category={category}
                            style={{width: '25%', marginBottom: 20}}
                            size={Layout.width * 0.15}
                            buttonStyle={data.selectedCategories.length && !data.selectedCategories.includes(category.id) ? styles.categories.inactive : undefined}
                            onPress={() => dispatch(Actions.Categories.Toggle(category.id))}
                        />
                    ))}
                </Main>
            </ScrollView>
        </Main>
    );
};

const styles = {
    callout: {
        card: {
            ...shadowGenerator(10),
            borderRadius: 20,
            width: Layout.width * 0.5,
            padding: 15,
            top: 35,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 99,
        },
        title: {
            ...GeneralStyles.text_bold,
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            ...GeneralStyles.text_regular,
            textTransform: 'uppercase',
        },
    },
    search: {
        zIndex: 10,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 15,
        width: '100%',
        position: 'absolute',
        ...GeneralStyles.bottom_border_radius,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    map: {
        ...GeneralStyles.bottom_border_radius,
        overflow: 'hidden',
    },
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
    locationButton: {
        button: {
            overflow: 'hidden',
            borderRadius: 50,
            position: 'absolute',
            bottom: 20,
            right: 20,
        },
        gradient: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    listButton: {
        button: {
            position: 'absolute',
            top: 35,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.PigeonPost,
        },
        text: {
            color: Colors.PrussianBlue,
            fontFamily: Fonts.ProximaNova.Regular,
        },
    },
};
