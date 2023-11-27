import { Button } from 'react-bootstrap';
import Control from 'react-leaflet-custom-control';

function RoutingControl({ isRouting, position, onClick }) {
    return (
        <Control position={position}>
            <button className="btn btn-outline-secondary" onClick={onClick}>
                Routing: {isRouting ? 'on' : 'off'}
            </button>
        </Control>
    );
}

export default RoutingControl;
