import { Button } from 'react-bootstrap';
import Control from 'react-leaflet-custom-control';

function DrawControl({ isDraw, position, onClick, onSave }) {
    return (
        <Control position={position}>
            <button className="btn btn-outline-secondary" onClick={onClick}>
                Draw: {isDraw ? 'on' : 'off'}
            </button>
            {isDraw && (
                <Button variant="success" onClick={onSave}>
                    Save
                </Button>
            )}
        </Control>
    );
}

export default DrawControl;
