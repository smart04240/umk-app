import Colors from '../../constants/Colors';
// base libs
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Text, View} from 'react-native';

'use-strict';

export default class ClusterMarker extends Component {
    onPress = () => this.props.onPress(this.props);

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const pointCount = this.props.properties.point_count; // eslint-disable-line camelcase
        const latitude = this.props.geometry.coordinates[1],
            longitude = this.props.geometry.coordinates[0];

        if (this.props.renderCluster) {
            const cluster = {
                pointCount,
                coordinate: {latitude, longitude},
                firstX: this.props.properties.firstX,
                firstY: this.props.properties.firstY,
                clusterId: this.props.properties.cluster_id,
            };
            return this.props.renderCluster(cluster, this.onPress);
        }


        let scaleUpRatio = this.props.scaleUpRatio ? this.props.scaleUpRatio(pointCount) : (1 + (Math.min(pointCount, 999) / 100));
        if (isNaN(scaleUpRatio)) {
            console.warn('scaleUpRatio must return a Number, falling back to default'); // eslint-disable-line
            scaleUpRatio = 1 + (Math.min(pointCount, 999) / 100);
        }

        let textForCluster = '1';

        let width = Math.floor(this.props.clusterInitialDimension * scaleUpRatio),
            height = Math.floor(this.props.clusterInitialDimension * scaleUpRatio),
            fontSize = Math.floor(this.props.clusterInitialFontSize * scaleUpRatio),
            borderRadius = Math.floor(width / 2);

        // cluster dimension upper limit
        width = width <= (this.props.clusterInitialDimension * 2) ? width : this.props.clusterInitialDimension * 2;
        height = height <= (this.props.clusterInitialDimension * 2) ? height : this.props.clusterInitialDimension * 2;
        fontSize = fontSize <= 18 ? fontSize : 18;

        if (pointCount >= 2 && pointCount <= 10) {
            textForCluster = pointCount.toString();
        }
        if (pointCount > 10 && pointCount <= 25) {
            textForCluster = '10+';
        }
        if (pointCount > 25 && pointCount <= 50) {
            textForCluster = '25+';
        }
        if (pointCount > 50 && pointCount <= 100) {
            textForCluster = '50+';
        }
        if (pointCount > 100) {
            textForCluster = '100+';
        }

        const {containerStyle, textStyle} = this.props;

        return (
            <MapView.Marker coordinate={{latitude, longitude}} onPress={this.onPress} tracksViewChanges={false}>
                <View style={[styles.container, containerStyle, {width, height, borderRadius}]}>
                    <Text style={[styles.counterText, textStyle, {fontSize}]}>{textForCluster}</Text>
                </View>
            </MapView.Marker>
        );
    }
}

ClusterMarker.defaultProps = {
    textStyle: {},
    containerStyle: {},
};

ClusterMarker.propTypes = {
    scaleUpRatio: PropTypes.func,
    renderCluster: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    geometry: PropTypes.object.isRequired,
    textStyle: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
    containerStyle: PropTypes.object.isRequired,
    clusterInitialFontSize: PropTypes.number.isRequired,
    clusterInitialDimension: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        alignItems: 'center',
        borderColor: Colors.Primary,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    counterText: {
        fontSize: 16,
        color: Colors.Primary,
        fontWeight: '400',
    },
});
