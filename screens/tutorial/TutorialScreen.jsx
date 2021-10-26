import React, {useRef} from "react";
import Routes from "../../constants/Routes";
import Main from "../../components/general/Main";
import ScreenWithHeaderTitleOnly from "../../components/layout/ScreenWithHeaderTitleOnly";
import {useDispatch, useSelector} from "react-redux";
import Actions from "../../redux/Actions";
import {FlatList, Image, useWindowDimensions, View} from "react-native";
import BottomPart from "../../components/tutorial/BottomPart";
import {Vibrator} from "../../helpers/Vibrator";

const cards = [
    {
        title: "Witaj!",
        img_source: require("../../assets/images/tutorial/1.png"),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: "Zbieraj odznaki!",
        img_source: require("../../assets/images/tutorial/2.png"),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: "Card 3",
        img_source: require("../../assets/images/tutorial/1.png"),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: "Card 4",
        img_source: require("../../assets/images/tutorial/2.png"),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: "Card 5",
        img_source: require("../../assets/images/tutorial/1.png"),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
];

export default function TutorialScreen(props) {
    const dimensions = useWindowDimensions();
    const dispatch = useDispatch();
    const flatListRef = useRef();
    const isDarkTheme = useSelector(state => state.app.theme) === 'dark';
    const [currentIndex, setCurrentIndex] = React.useState(0);

    console.log(isDarkTheme)

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
                leftButtonLabel: 'Skip',
                rightButtonLabel: 'Next',
                leftButtonOnPress: () => toStartScreen(),
                rightButtonOnPress: () => scrollToItem(1),
                imageSource: require("../../assets/images/tutorial/profile.png"),
                title: '',
                description: ''
            },
            {
                leftButtonLabel: 'Back',
                rightButtonLabel: 'Next',
                leftButtonOnPress: () => scrollToItem(0),
                rightButtonOnPress: () => scrollToItem(2),
                imageSource: require("../../assets/images/tutorial/map.png")
            },
            {
                leftButtonLabel: 'Back',
                rightButtonLabel: 'Next',
                leftButtonOnPress: () => scrollToItem(1),
                rightButtonOnPress: () => scrollToItem(3),
                imageSource: require("../../assets/images/tutorial/calendar.png")
            },
            {
                leftButtonLabel: 'Back',
                rightButtonLabel: 'Finish',
                leftButtonOnPress: () => scrollToItem(2),
                rightButtonOnPress: () => toStartScreen(),
                imageSource: require("../../assets/images/tutorial/rankings.png")
            },
        ];
    },[]);

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
                                backgroundColor: 'red',
                                width: dimensions?.width,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
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
            />
        </ScreenWithHeaderTitleOnly>
    )
}

