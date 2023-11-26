import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FormAddPoint.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { drawGeoActions } from '~/store/draw-geo-slice';

const cx = classNames.bind(styles);

const getTimeDetail = (time) => {
    let timeDetail;
    const firstIndexOfColon = time.indexOf(':');
    const firstIndexOfSpace = time.indexOf(' ');
    if (time !== '') {
        timeDetail = {
            hours: time.slice(0, firstIndexOfColon),
            minutes: time.slice(firstIndexOfColon + 1, firstIndexOfSpace),
            ampm: time.slice(firstIndexOfSpace + 1),
        };
    } else {
        timeDetail = {
            hours: 0,
            minutes: 0,
            ampm: 'AM',
        };
    }
    return timeDetail;
};

const createStringTime = (name, value, lastTimeDetail) => {
    const firstIndexOfTimeWord = name.indexOf('Time');
    const nameDetail = name.slice(firstIndexOfTimeWord + 4);
    if (nameDetail === 'Hours') {
        return value + ':' + lastTimeDetail.minutes + ' ' + lastTimeDetail.ampm;
    }
    if (nameDetail === 'Minutes') {
        return lastTimeDetail.hours + ':' + value + ' ' + lastTimeDetail.ampm;
    }
    if (nameDetail === 'Ampm') {
        return lastTimeDetail.hours + ':' + lastTimeDetail.minutes + ' ' + value;
    }
};

function FormAddPoint() {
    const dispatch = useDispatch();
    const pointInfo = useSelector((state) => state.drawGeoState.activePointInfo);
    const [pointValue, setPointValue] = useState(pointInfo);
    const openTimeDetail = getTimeDetail(pointValue.openTime);
    const closeTimeDetail = getTimeDetail(pointValue.closeTime);

    useEffect(() => {
        setPointValue(pointInfo);
    }, [pointInfo]);

    const handleChange = (e) => {
        const nameInput = e.target.name;
        const firstIndexOfTimeWord = nameInput.indexOf('Time');
        // check if it a time select like ...Time...
        if (firstIndexOfTimeWord !== -1) {
            // if it is a openTime
            if (nameInput.slice(0, firstIndexOfTimeWord) === 'open') {
                setPointValue((prev) => ({
                    ...prev,
                    openTime: createStringTime(nameInput, e.target.value, openTimeDetail),
                }));
            } else {
                // else it is closeTIme
                setPointValue((prev) => ({
                    ...prev,
                    closeTime: createStringTime(nameInput, e.target.value, closeTimeDetail),
                }));
            }
        } else {
            setPointValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = async () => {
        console.log(pointValue);
        await dispatch(drawGeoActions.updatePoint(pointValue));
        dispatch(drawGeoActions.setDrawPointState(false));
    };

    const handleCancel = () => {
        dispatch(drawGeoActions.setDrawPointState(false));
    };

    return (
        <Form className={cx('wrapper')}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={pointValue.name}
                    placeholder="Quán trà sữa Piti"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    size="lg"
                    as="textarea"
                    name="description"
                    onChange={handleChange}
                    rows={4}
                    value={pointValue.description}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={pointValue.address}
                    placeholder="Số 5, đường sao Hỏa..."
                />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Label>Open time</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Select
                            aria-label="Default select example"
                            name="openTimeHours"
                            onChange={handleChange}
                            value={openTimeDetail.hours}
                        >
                            <option value="0">Choose hours</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </Form.Select>
                        <Form.Select
                            aria-label="Default select example"
                            name="openTimeMinutes"
                            onChange={handleChange}
                            value={openTimeDetail.minutes}
                        >
                            <option value="0">Choose minutes</option>
                            <option value="00">00</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                        </Form.Select>
                        <Form.Select
                            aria-label="Default select example"
                            name="openTimeAmpm"
                            onChange={handleChange}
                            value={openTimeDetail.ampm}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label>Close time</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Select
                            aria-label="Default select example"
                            name="closeTimeHours"
                            onChange={handleChange}
                            value={closeTimeDetail.hours}
                        >
                            <option value="0">Choose hours</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </Form.Select>
                        <Form.Select
                            aria-label="Default select example"
                            name="closeTimeMinutes"
                            onChange={handleChange}
                            value={closeTimeDetail.minutes}
                        >
                            <option value="0">Choose minutes</option>
                            <option value="00">00</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                        </Form.Select>
                        <Form.Select
                            aria-label="Default select example"
                            name="closeTimeAmpm"
                            onChange={handleChange}
                            value={closeTimeDetail.ampm}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    size="lg"
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={pointValue.phoneNumber}
                    placeholder="098..."
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Position</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    value={pointInfo.positionWkt}
                    disabled
                    readOnly
                    placeholder="{1, 1}"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>This shop belong to</Form.Label>
                <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="roadId"
                    value={pointValue.roadId}
                >
                    <option value="0">Không có trong danh sách</option>
                    <option value="1">Đường Trần Hưng Đạo</option>
                    <option value="2">0Đường Mạc Thiên Tích2</option>
                    <option value="3">Đường 3 Tháng 2</option>
                    <option value="4">Đường Mậu Thân</option>
                </Form.Select>
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

export default FormAddPoint;
