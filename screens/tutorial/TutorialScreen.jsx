import React, {useRef} from "react";
import Routes from "../../constants/Routes";
import Main from "../../components/general/Main";
import ScreenWithHeaderTitleOnly from "../../components/layout/ScreenWithHeaderTitleOnly";
import {useDispatch, useSelector} from "react-redux";
import Actions from "../../redux/Actions";
import {FlatList, Image, useWindowDimensions, View} from "react-native";
import BottomPart from "../../components/tutorial/BottomPart";
import {Vibrator} from "../../helpers/Vibrator";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslator from "../../hooks/useTranslator";
import Translations from "../../constants/Translations";

export default function TutorialScreen(props) {
    const dimensions = useWindowDimensions();
    const dispatch = useDispatch();
    const flatListRef = useRef();
    const locale = useSelector(state => state.app.locale);
    const isDarkTheme = useSelector(state => state.app.theme) === 'dark';
    const theme = useThemeStyles();
    const translate = useTranslator();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const toStartScreen = () => {
        // remove Tutorial screen from history so that user could not go back to it
        props.navigation.reset({index: 0, routes: [{name: Routes.Start}]});
        dispatch(Actions.Tutorial.Passed());
    };

    const onViewableItemsChanged = React.useRef((viewableItems) => {
        setCurrentIndex(viewableItems?.viewableItems?.[0]?.index);
        Vibrator();
    });
    // Call function when 30% of item shows
    const viewConfigRef = React.useRef({itemVisiblePercentThreshold: 50});

    const scrollToItem = index => flatListRef?.current?.scrollToIndex({index: index, animated: true});

    const items = React.useMemo(() => {
        return [
            {
                leftButtonLabel: translate(Translations.SkipIt),
                rightButtonLabel: translate(Translations.Next),
                leftButtonOnPress: () => toStartScreen(),
                rightButtonOnPress: () => scrollToItem(1),
                imageSource: isDarkTheme ? require("../../assets/images/tutorial/profile-alternative.png") : require("../../assets/images/tutorial/profile.png"),
                title: translate(Translations.TutorialProfileTitle),
                description: translate(Translations.TutorialProfileDescription)
            },
            {
                leftButtonLabel: translate(Translations.Back),
                rightButtonLabel: translate(Translations.Next),
                leftButtonOnPress: () => scrollToItem(0),
                rightButtonOnPress: () => scrollToItem(2),
                imageSource:  isDarkTheme ? require("../../assets/images/tutorial/map-alternative.png") : require("../../assets/images/tutorial/map.png"),
                title: translate(Translations.TutorialSimulationsTitle),
                description: translate(Translations.TutorialSimulationsDescription)
            },
            {
                leftButtonLabel: translate(Translations.Back),
                rightButtonLabel: translate(Translations.Next),
                leftButtonOnPress: () => scrollToItem(1),
                rightButtonOnPress: () => scrollToItem(3),
                imageSource:  isDarkTheme ? require("../../assets/images/tutorial/calendar-alternative.png") : require("../../assets/images/tutorial/calendar.png"),
                title: translate(Translations.TutorialCalendarTitle),
                description: translate(Translations.TutorialCalendarDescription)
            },
            {
                leftButtonLabel: translate(Translations.Back),
                rightButtonLabel: translate(Translations.Finish),
                leftButtonOnPress: () => scrollToItem(2),
                rightButtonOnPress: () => toStartScreen(),
                imageSource:  isDarkTheme ? require("../../assets/images/tutorial/rankings-alternative.png") : require("../../assets/images/tutorial/rankings.png"),
                title: translate(Translations.TutorialRankingsTitle),
                description: translate(Translations.TutorialRankingsDescription)
            },
        ];
    },[theme, locale]);

    return (
        <ScreenWithHeaderTitleOnly>
            <Main>
                <FlatList
                    ref={flatListRef}
                    data={items}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item}) => (
                        <View
                            style={{
                                width: dimensions?.width,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    paddingTop: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image style={{
                                    height: '100%',
                                    width: '100%',
                                    resizeMode: 'contain',
                                }} source={item?.imageSource}/>
                            </View>
                        </View>
                    )}
                    onViewableItemsChanged={onViewableItemsChanged?.current}
                    viewabilityConfig={viewConfigRef?.current}
                    showsHorizontalScrollIndicator={false}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                    }}
                />
            </Main>
            <BottomPart
                items={items}
                currentIndex={currentIndex}
                leftButtonLabel={items[currentIndex]?.leftButtonLabel}
                rightButtonLabel={items[currentIndex]?.rightButtonLabel}
                leftButtonOnPress={items[currentIndex]?.leftButtonOnPress}
                rightButtonOnPress={items[currentIndex]?.rightButtonOnPress}
                title={items[currentIndex]?.title}
                description={items[currentIndex]?.description}
            />
        </ScreenWithHeaderTitleOnly>
    )
}

