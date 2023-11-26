import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

function Routing({ userPosition, userDestination }) {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        let routingControl = L.Routing.control({
            waypoints: [
                L.latLng(10.033838388123124, 105.77002118227858),
                L.latLng(10.0295686843988, 105.76955602666983),
            ],
            routeWhileDragging: true,
        }).addTo(map);
        return () => {
            // if (routingControl._ready) {
            //     map?.removeControl(routingControl);
            // }
            map?.removeControl(routingControl);
        };
    }, [map]);

    return null;
}

export default Routing;
