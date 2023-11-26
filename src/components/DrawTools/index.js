import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import hash from 'object-hash';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import image from '~/assets/images';
import styles from './DrawTools.module.scss';
import { drawGeoActions } from '~/store/draw-geo-slice';

const { stringify } = require('wkt');

const cx = classNames.bind(styles);

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const customActiveIcon = new Icon({
    iconUrl: image.activePoint,
    iconSize: [38, 38],
});

const DrawTools = ({ onCreated, onEdited }) => {
    const map = useMap();
    // console.log(map);
    const dispatch = useDispatch();
    const drawGeoStat = useSelector((state) => state.drawGeoState);

    const handleEditLayer = (llId, newWkt) => {
        dispatch(drawGeoActions.edit({ id: llId, positionWkt: newWkt }));
    };

    const handleDeleteLayer = (layerId) => {
        dispatch(drawGeoActions.delete(layerId));
    };

    const _onEdited = (e) => {
        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
            handleEditLayer(layer._leaflet_id, stringify(layer.toGeoJSON()));
            //console.log(additionalEleMap);
        });
        //console.log(`_onEdited: edited ${numEdited} layers`, e);
        // this._onChange();
    };

    const _onCreated = (e) => {
        let type = e.layerType;
        let layer = e.layer;
        const geoJson = layer.toGeoJSON();
        if (type === 'marker') {
            // Do marker specific actions
            dispatch(drawGeoActions.setDrawPointState(true));
            const tempData = {
                id: e.layer._leaflet_id,
                name: '',
                description: '',
                address: '',
                openTime: '',
                closeTime: '',
                phoneNumber: '',
                positionWkt: stringify(geoJson),
                roadId: 0,
            };
            dispatch(drawGeoActions.createPoint(tempData));
            e.layer.bindTooltip('Double click to see and edit information!');
            e.layer.on('dblclick', () => {
                dispatch(drawGeoActions.setActivePointInfo(e.layer._leaflet_id));
                dispatch(drawGeoActions.setDrawPointState(true));
            });

            // map.on('click', () => {
            //     map._layers[e.layer._leaflet_id].setIcon(customIcon);
            // });

            console.log('_onCreated: marker created', e);
        } else {
            dispatch(drawGeoActions.setDrawLineStringState(true));

            const tempData2 = {
                id: e.layer._leaflet_id,
                name: '',
                positionWkt: stringify(geoJson),
            };
            dispatch(drawGeoActions.createLineString(tempData2));
            e.layer.bindTooltip('Double click to see and edit information!');
            e.layer.on('dblclick', () => {
                dispatch(drawGeoActions.setActiveLineStringsInfo(e.layer._leaflet_id));
                dispatch(drawGeoActions.setDrawLineStringState(true));
            });
            console.log('_onCreated: something else created:', type, e);
        }
        // Do whatever else you need to. (save to db; etc)

        // this._onChange();
    };

    const _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
            console.log(layer);
            if (layer.feature && layer.feature.properties) {
                if (layer.feature.geometry.type === 'Point') {
                    console.log(layer._leaflet_id);
                    dispatch(
                        drawGeoActions.setIdToDeleteArray({
                            type: 'Point',
                            id: layer._leaflet_id,
                            realId: layer.feature.properties.id,
                        }),
                    );
                } else {
                    dispatch(
                        drawGeoActions.setIdToDeleteArray({
                            type: 'LineString',
                            id: layer._leaflet_id,
                            realId: layer.feature.properties.id,
                        }),
                    );
                }
            }
            handleDeleteLayer(layer._leaflet_id);
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        // this._onChange();
    };

    const _onMounted = (drawControl) => {
        console.log('_onMounted', drawControl);
    };

    const _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    const _onEditStop = (e) => {
        console.log('_onEditStop', e);
    };

    const _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
    };

    const _onDeleteStop = (e) => {
        console.log('_onDeleteStop', e);
    };

    const _onDrawStart = (e) => {
        console.log('_onDrawStart', e);
    };

    /*onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/
    return (
        <EditControl
            key={hash(drawGeoStat)}
            onDrawStart={_onDrawStart}
            position="topright"
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
            onDeleteStart={_onDeleteStart}
            draw={{
                marker: {
                    icon: customActiveIcon,
                },
                polyline: {
                    icon: new L.DivIcon({
                        iconSize: new L.Point(8, 8),
                        className: 'leaflet-div-icon leaflet-editing-icon',
                    }),
                    shapeOptions: {
                        guidelineDistance: 10,
                        color: 'navy',
                        weight: 3,
                    },
                },
                rectangle: false,
                circlemarker: false,
                circle: false,
                polygon: false,
            }}
        />
    );
};

export default DrawTools;
