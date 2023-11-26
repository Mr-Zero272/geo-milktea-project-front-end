import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import images from '~/assets/images';
import Routing from './Routing';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: images.activePoint,
    iconSize: 36,
});

function RoutingCustom({ isRouting }) {
    const [position, setPosition] = useState(null);
    const [destination, setDestination] = useState(null);
    const [oldControl, setOldControl] = useState(null);
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // If the position is successfully obtained, update the state
                setPosition([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                // If there is an error, alert the user
                alert(error.message);
            },
        );
    };

    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setDestination([lat, lng]);
            setPosition([10.033838388123124, 105.77002118227858]);
            //console.log([lng, lat]);

            const routingControl = L.Routing.control({
                waypoints: [L.latLng(10.033838388123124, 105.77002118227858), L.latLng(lat, lng)],
                routeWhileDragging: true,
            }).addTo(map);
            setOldControl(routingControl);
            if (isRouting && oldControl !== null) {
                map?.removeControl(oldControl);
            }
        },
    });
    useEffect(() => {
        return () => {
            if (oldControl !== null) {
                map?.removeControl(oldControl);
            }
        };
    }, [oldControl]);

    return null;
}

export default RoutingCustom;
