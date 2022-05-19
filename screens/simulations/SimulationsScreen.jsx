import React, {useMemo, useState} from "react";
import {Text, View} from "react-native";

import {getBasicSimulationsStructure} from "../../helpers/map-of-studies";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import TopBox from "../../components/general/TopBox";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ActiveStudiesSwitcher from "../../components/map-of-studies/ActiveStudiesSwitcher";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";
import StudySimulations from "../../components/map-of-studies/StudySimulations";


export default function SimulationsScreen() {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const [all_structure_data, setAllStructureData] = useState(null);
    const basic_simulations_structure = useMemo(() => all_structure_data ? getBasicSimulationsStructure(all_structure_data) : null, [all_structure_data]);
    const top_text_styles = [
        GeneralStyles.text_regular,
        {color: ThemeStyles.dark_blue_text}
    ];

    return (
        <MainWithNavigation>
            <TopBox>
                <View style={[GeneralStyles.row_center_between, {paddingVertical: 20}]}>
                    <Text style={[top_text_styles]}>{translate(Translations.EndOfStudies2)}</Text>
                    <Text style={[top_text_styles]}>{all_structure_data?.til_end_of_study}</Text>
                </View>
            </TopBox>
            <ContainerWithScroll container_style={{paddingHorizontal: 0}}>
                <ActiveStudiesSwitcher changeCallback={data => setAllStructureData(data)}/>
                {!!all_structure_data && (
                    <MapOfStudiesStructure
                        all_data={all_structure_data}
                        simulation_mode
                    />
                )}
                {!!basic_simulations_structure && <StudySimulations base={basic_simulations_structure}/>}
            </ContainerWithScroll>
        </MainWithNavigation>
    )
}
