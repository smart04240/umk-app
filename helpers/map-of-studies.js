import moment from "moment";

import bachelor_structure from "../components/map-of-studies/structures/bachelor";
import master_structure from "../components/map-of-studies/structures/master";
import mish_structure from "../components/map-of-studies/structures/mish";
import sj_structure from "../components/map-of-studies/structures/sj";

import bachelor_simulations from "../components/map-of-studies/simulations/bachelor";
import master_simulations from "../components/map-of-studies/simulations/master";
import mish_simulations from "../components/map-of-studies/simulations/mish";
import sj_simulations from "../components/map-of-studies/simulations/sj";

import Point from "../components/map-of-studies/point/Point";
import Branch from "../components/map-of-studies/Branch";
import BranchesNode from "../components/map-of-studies/BranchesNode";
import DropdownGroup from "../components/map-of-studies/DropdownGroup";

import StartCircle from "../components/map-of-studies/StartCircle";


const DEGREES = {
    "(s1)": {
        years_amount: 3,
        structure: bachelor_structure,
        simulations: bachelor_simulations
    },

    "(s2)": {
        years_amount: 2,
        structure: master_structure,
        simulations: master_simulations
    },

    "(sj)": {
        years_amount: 5,
        structure: sj_structure,
        simulations: sj_simulations
    },

    "(mish)": {
        years_amount: 2,
        structure: mish_structure,
        simulations: mish_simulations
    }
};

const getBranchStartCircle = () => ({
    Component: Branch,
    children: {Component: StartCircle}
});


export const detectBranchesNodeEndType = branches => {
    if (!branches.filter(item => item.dead_end).length)
        return "full";

    const first_branch = branches[0];
    const second_branch = branches[1];
    const third_branch = branches[2];

    switch (branches.length) {
        case 2 :
            if (!first_branch.dead_end && second_branch.dead_end) return "half";
            if (first_branch.dead_end && !second_branch.dead_end) return "half-right";
            break;
        case 3:
            if (first_branch.dead_end && !second_branch.dead_end && third_branch.dead_end) return "middle";
            if (!first_branch.dead_end && !second_branch.dead_end && third_branch.dead_end) return "half";
            if (first_branch.dead_end && !second_branch.dead_end && !third_branch.dead_end) return "half-right";
            if (!first_branch.dead_end && second_branch.dead_end && !third_branch.dead_end) return "full";
            break;
    }
};


const detectYearByCode = code => {
    if (!code) return null;
    return +code.match(/-\d\d?/)?.[0]?.replace("-", "")?.[0] || null;
};


const getDataForAllYears = (current_study, years_amount) => {
    const data = [];
    const {graduation_dates, studies_maps} = current_study;

    const getStudiesMapsForYear = term_id => studies_maps.filter(item => item.term_id === term_id);

    if (!!graduation_dates.length) {
        graduation_dates.forEach(item => {
            const year = detectYearByCode(item.kod_etapu_osoby);
            const term_id = item.academic_year_term?.id;

            if (year) {
                data.push({
                    year: year,
                    years: item.academic_year_term?.usos_id,
                    status: item.status_zaliczenia_etapu_osoby || "X",
                    studies_maps: getStudiesMapsForYear(term_id)
                });
            }
        });
    }

    return data.sort((a, b) => a.year > b.year ? 1 : -1);
};


const getTilEndOfStudy = study => {
    const planned_end_date = study?.graduation_dates?.find(item => !!item?.planowana_data_ukonczenia)?.planowana_data_ukonczenia;

    return planned_end_date
        ? moment.duration(moment().diff(planned_end_date)).humanize(false, {M: 99999})
        : "N/A"
};


export const getBasicStructureAndData = (degree, current_study) => {
    const current_degree = DEGREES?.[degree];
    if (!current_degree) return {};

    const {structure, years_amount, simulations} = current_degree;

    return {
        degree,
        simulations,
        structure,
        years_amount,
        til_end_of_study: getTilEndOfStudy(current_study),
        years_data: getDataForAllYears(current_study, years_amount)
    }
};


const changePointsInStructure = (structure, years_data) => {
    if (!structure || !years_data) return null;

    const getPointDates = (current_year_data, term_field, tags) => {
        if (!tags || !term_field) return null;

        const pattern_matches = tags.match(/(#\w+)+/g);

        if (pattern_matches) {
            const dates = {};

            for (const match of pattern_matches) {

                const [data_param_kind, data_param_name] = match.split("#").slice(1);

                switch (data_param_kind) {
                    case "year":
                        dates[data_param_name] = current_year_data?.[data_param_name] || "";
                        break;

                    case "term_field":
                        let value = term_field?.[data_param_name] || "";

                        if (!!value && ["start_date", "end_date"].includes(data_param_name))
                            dates[data_param_name] = moment(value).format("DD.MM.YYYY");
                        break;
                }
            }

            return dates;
        }
    };

    const getPointСhronology = (current_year_data, component_obj, term_field) => {
        let passed, current;

        if (current_year_data) {
            if (current_year_data?.status !== "X") {
                passed = true;
            } else {
                if (term_field) {
                    switch (component_obj.term_field_id) {
                        case 1:
                        case 4:
                        case 5:
                        case 10:
                            passed = moment() > moment(term_field.start_date)
                            break;
                        case 2:
                        case 3:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            passed = moment() > moment(term_field.end_date)
                            break;
                    }
                }
            }
        }

        return {passed, current}
    };

    const getChangedPointObj = component_obj => {

        const current_year_data = years_data?.find(item => item.year === component_obj?.year);
        const term_field = current_year_data?.studies_maps?.find(item => item.term_field_id === component_obj.term_field_id);

        const chronology = getPointСhronology(current_year_data, component_obj, term_field);
        const dates = getPointDates(current_year_data, term_field, component_obj.term_field_tags);

        return {
            ...component_obj,
            ...chronology,
            dates
        };
    };

    const getStructureWithData = structure => (
        structure.map(component_obj => {
            const {Component, children} = component_obj;

            switch (Component) {
                case Point:
                    return getChangedPointObj(component_obj);

                case Branch:
                    return {
                        ...component_obj,
                        children: Array.isArray(children)
                            ? getStructureWithData(children)
                            : children?.Component === Point
                                ? getChangedPointObj(children)
                                : children
                    }

                case BranchesNode:
                    return {
                        ...component_obj,
                        branches: getStructureWithData(component_obj.branches)
                    }

                default:
                    return component_obj;
            }
        })
    );

    return getStructureWithData(structure)
};


export const getFinalStructure = (structure, years_data, simulation_mode) => {
    if (!structure) return null;

    const maybe_next_year_parts = [];

    const getPastPartOfStructure = past_years_data => {
        const full_past_part = [{
            Component: Branch,
            children: []
        }];

        const isNodePassed = (node, year, status) => {
            if (node.year === year) {
                const node_year_status = node?.year_status;

                if (!node_year_status) return true;

                return Array.isArray(node_year_status)
                    ? node_year_status.includes(status)
                    : node_year_status === status;
            }

            return false;
        };

        const parseStructureForPastNodes = (year, status) => {
            const past_part = [];

            const parserStructureLevel = level => {
                level.forEach(item => {
                    if (item.year === year) {
                        switch (item.Component) {
                            case Point:
                                if (![7, 9].includes(item.term_field_id)) {
                                    isNodePassed(item, year, status) && past_part.push({
                                        ...item,
                                        bottom_margin: 20,
                                        label_position: "left"
                                    })
                                }
                                break;

                            case Branch:
                                if (isNodePassed(item, year, status)) {
                                    let children;
                                    let branches_nodes;

                                    const is_children_array = Array.isArray(item.children);

                                    if (is_children_array) {

                                        const updated_children = item.children.map(child => {
                                            return child.Component === Point
                                                ? {...child, bottom_margin: 20, label_position: "left"}
                                                : child
                                        });

                                        const not_from_current_year = updated_children
                                            .filter(item => item.year !== year && item.Component !== BranchesNode)

                                        const from_current_year = updated_children
                                            .filter(item => item.year === year && ![7, 9].includes(item.term_field_id));

                                        children = from_current_year.filter(child => child.Component !== BranchesNode)

                                        branches_nodes = item.children
                                            .filter(child => child.Component === BranchesNode)
                                            .map(branch_node => ({
                                                ...branch_node,
                                                inner: false,
                                                branches: branch_node.branches.map(branch => ({
                                                    ...branch,
                                                    left: 0,
                                                    absolute: false
                                                }))
                                            }));

                                        !!not_from_current_year.length && maybe_next_year_parts.push(...not_from_current_year);

                                    } else {
                                        children = {...item.children, bottom_margin: 20, label_position: "left"};
                                    }


                                    is_children_array
                                        ? past_part.push(...children)
                                        : past_part.push(children)


                                    if (branches_nodes && branches_nodes.length) {
                                        branches_nodes.forEach(branch_nodes => {
                                            maybe_next_year_parts.push(branch_nodes);
                                        });
                                    }
                                }
                                break;

                            case BranchesNode:
                                isNodePassed(item, year, status) && parserStructureLevel(item.branches);
                                break;
                        }
                    }
                })
            }

            parserStructureLevel([...maybe_next_year_parts, ...structure]);

            return past_part;
        }

        for (let i = 0; i < past_years_data.length; i++) {
            const past_year_obj = past_years_data[i];
            const current_year_part = parseStructureForPastNodes(past_year_obj.year, past_year_obj.status);
            const dated_current_year_part = changePointsInStructure(current_year_part, [past_year_obj]);

            full_past_part[0].children.push(...dated_current_year_part);
        }

        return full_past_part;
    };

    const getFuturePartOfStructure = current_year_num => {

        const future_part = [];

        maybe_next_year_parts?.length && maybe_next_year_parts.forEach(item => {
            item.year === current_year_num && future_part.push(item)
        });

        const structure_future_index = structure.findIndex(item => item.year === current_year_num);
        structure_future_index !== -1 && future_part.push(...structure.slice(structure_future_index));

        if (simulation_mode) {
            return future_part.filter(item => {

                if (item.Component !== Branch && item.Component !== Point) return false;
                return !item.year_status && item.year === current_year_num;
            })
        }

        return future_part;
    };

    const getPastPartWithDropdownGroup = past_part => {
        const all_brach_children = past_part[0].children;
        const new_children = [];

        const year_points_indexes = all_brach_children.reduce((result, current, i) => {
            ["year", "year_conditional"].includes(current.point_type) && result.push(i)
            return result;
        }, []);

        year_points_indexes.forEach((year_point_index, index) => {
            const next_year_point_index = year_points_indexes?.[index + 1];
            const dropdown_children = next_year_point_index
                ? all_brach_children.slice(year_point_index + 1, next_year_point_index)
                : all_brach_children.slice(year_point_index + 1)

            new_children.push(all_brach_children[year_point_index])
            new_children.push({
                Component: DropdownGroup,
                children: dropdown_children
            })
        });

        return [{
            Component: Branch,
            children: new_children
        }]
    };

    const buildFinalStructure = () => {

        const current_year_num = !years_data.length ? 1 : years_data.find(year => year?.status === "X")?.year;
        const past_years_data = [...years_data.filter(year => year?.status !== "X")];
        const future_years_data = [...years_data.filter(year => year?.status === "X")]

        const past_part = !!past_years_data.length ? getPastPartOfStructure(past_years_data) : [];
        const past_part_with_dropdowns = !!past_part.length ? getPastPartWithDropdownGroup(past_part) : [];

        let future_part = current_year_num ? getFuturePartOfStructure(current_year_num) : [];
        if (!!future_part.length) future_part = changePointsInStructure(future_part, future_years_data);

        if (simulation_mode) {

            const last_future_part_el = future_part[future_part.length - 1];

            if (last_future_part_el?.Component === Point) {
                last_future_part_el.bottom_margin = 0;
            } else if (last_future_part_el?.Component === Branch) {

                const last_point = Array.isArray(last_future_part_el.children)
                    ? last_future_part_el.children[last_future_part_el.children.length - 1]
                    : last_future_part_el.children

                if (last_point) last_point.bottom_margin = 0;

                last_future_part_el.dead_end = true;
            }
        }

        return [
            getBranchStartCircle(),
            ...past_part_with_dropdowns,
            ...future_part
        ];
    }

    return buildFinalStructure()
};


export const findSimulationsOptionByValue = (value, simulations) => (
    simulations.find(item => Array.isArray(item.value)
        ? item.value.includes(value)
        : item.value === value
    )
);


export const getSimulationOptionByHistory = (history, simulations) => {

    const iteration = (i, sim_part) => {
        return i === history.length - 1
            ? findSimulationsOptionByValue(history[i], sim_part)
            : iteration(i + 1, findSimulationsOptionByValue(history[i], sim_part)?.options);
    }

    return iteration(0, simulations);
};


export const getBasicSimulationsStructure = data => {

    if (!data) return null;
    if (!data.years_data?.length) return data.simulations;

    const changed_years_data = data?.years_data
        .filter(item => !["X", "N", "R", "T"].includes(item.status))
        .map(item => item.status)

    return !changed_years_data?.length
        ? data.simulations
        : getSimulationOptionByHistory(changed_years_data, data.simulations)?.options;
};