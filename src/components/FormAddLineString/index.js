import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FormAddPoint.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { drawGeoActions } from '~/store/draw-geo-slice';

const cx = classNames.bind(styles);

function FormAddLineString() {
    const dispatch = useDispatch();
    const lineStringInfo = useSelector((state) => state.drawGeoState.activeLineStringInfo);
    const [lineStringValue, setLineStringValue] = useState(lineStringInfo);

    useEffect(() => {
        setLineStringValue(lineStringInfo);
    }, [lineStringInfo]);

    const handleChange = (e) => {
        setLineStringValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        dispatch(drawGeoActions.updateLineString(lineStringValue));
        dispatch(drawGeoActions.setDrawLineStringState(false));
    };

    const handleCancel = () => {
        dispatch(drawGeoActions.setDrawLineStringState(false));
    };

    console.log(lineStringValue);
    return (
        <Form className={cx('wrapper')}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={lineStringValue.name}
                    placeholder="Quán trà sữa Piti"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Position</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    value={lineStringInfo.positionWkt}
                    disabled
                    readOnly
                    placeholder="LineString(1 1, 1 2, 1 3)"
                />
            </Form.Group>

            <Button type="button" variant="success" onClick={handleSubmit}>
                Save
            </Button>
            <Button type="button" variant="primary" onClick={handleCancel}>
                Cancel
            </Button>
        </Form>
    );
}

export default FormAddLineString;
