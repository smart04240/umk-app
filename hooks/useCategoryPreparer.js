import React, {useMemo} from 'react';
import {useSelector} from "react-redux";

export const useCategoryPreparer = () => {
    const lang = useSelector(state => state.locale);
    const categories = useSelector(state => state.eventCategories);

    return useMemo(() => {
        let options = [];

        categories.forEach(category => {
            options.push({
                value: category.id,
                label: category.title[lang]
            })
        });

        return options;
    },[lang]);
}
