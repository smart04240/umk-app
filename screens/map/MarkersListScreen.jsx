import React, {useMemo} from "react";
import TopBox from "../../components/general/TopBox";
import Input from "../../components/form/Input";
import Translations from "../../constants/Translations";
import Main from "../../components/general/Main";
import useTranslator from "../../hooks/useTranslator";
import Actions from "../../redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {selectFilteredMarkers} from "../../redux/reducers/mapReducer";
import {Text, TouchableOpacity, View} from "react-native";
import ColorCard from "../../components/general/ColorCard";
import Dropdown from "../../components/form/Dropdown";
import {useNavigation} from "@react-navigation/core";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import useThemeStyles from "../../hooks/useThemeStyles";
import ColorCardList from "../../components/general/ColorCardList";
import GeneralStyles from "../../constants/GeneralStyles";
import Routes from "../../constants/Routes";

export default function MarkersListScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const translate = useTranslator();
    const theme = useThemeStyles();
    const {categories, searchText} = useSelector(state => state.mapData);
    const markers = useSelector(state => selectFilteredMarkers(state));

    const searchChange = text => dispatch(Actions.ChangeMapSearch(text));
    const selectCategory = ({value}) => dispatch(Actions.Categories.Select(value));

    const options = useMemo(() => categories.map(category => ({
        value: category.id,
        label: translate(category.title),
    })), [translate, categories]);

    const openMarker = marker => () => navigation.navigate(Routes.Marker, marker);
    const goBack = () => navigation.goBack();

    return (
        <Main>
            <TopBox
                style={{
                    position: 'absolute',
                    width: '100%'
                }}
            >
                <Input
                    style={styles.search}
                    placeholder={translate(Translations.Search)}
                    value={searchText}
                    onChangeText={searchChange}
                />
                <Dropdown
                    placeholder={translate(Translations.SelectCategory)}
                    options={options}
                    onChange={selectCategory}
                />
            </TopBox>

            <ColorCardList
                keyExtractor={item => String(item.id)}
                data={markers}
                contentContainerStyle={{
                    paddingTop: 130
                }}
                renderItem={({item}) => (
                    <ColorCard
                        color={item.category.color}
                        title={translate(item.title)}
                        text={item.address}
                        onPress={openMarker(item)}
                    />
                )}
            />

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.goBack} onPress={goBack}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme.icon_color} />
                    <Text style={[styles.bottomText, {color: theme.blue_text}]}>
                        {translate(Translations.ReturnToMap)}
                    </Text>
                </TouchableOpacity>
            </View>
        </Main>
    );
}

const styles = {
    search: {
        marginBottom: 10,
    },
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        padding: 20,
    },
    bottomText: {
        marginLeft: 20,
        ...GeneralStyles.text_regular,
    },
};
