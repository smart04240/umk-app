import React from 'react';
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

export const CreateEvent = props => (
    <ScreenWithRoundedHeader>
        <MainWithNavigation>
            <ContainerWithScroll>
                <EventTaskEditForm
                    route={props.route}
                    isEvent={true}
                />
            </ContainerWithScroll>
        </MainWithNavigation>
    </ScreenWithRoundedHeader>
);
