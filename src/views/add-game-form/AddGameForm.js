import React, {useState} from 'react';
import {
    Row,
    Col,
    Button,
    FormGroup,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import {Games} from "../../api/games/games-api";
import ButtonSwitch from "../../components/buttons/ButtonSwitch";
import {useDispatch, useSelector} from "react-redux";
import {getIsGameAdding, updateGameThunk} from "../../reducers/games";


const AddGame = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const isFetching = useSelector(getIsGameAdding);
    const onSubmit = (data) => {

        dispatch(updateGameThunk(data));
    };
        return (<>
                {isFetching ? <div>Loading...</div> : <Row>
                    <Col sm="12">
                        <Card>
                            <CardTitle className="p-3 border-bottom mb-0">
                                Form
                            </CardTitle>
                            <CardBody>

                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <FormGroup>
                                        <label className="control-label" htmlFor="icon">
                                            Icon
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                style={ {width: 200, height: 200} }
                                                type="image"
                                                name="icon"
                                                ref={register}
                                                className="form-control"
                                            />
                                            <input type="file" />
                                        </div>
                                        <span className="text-danger">{errors.icon && 'Icon is required.'}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="name">
                                            Name
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                name="name"
                                                ref={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <span className="text-danger">{errors.name && 'Name is required.'}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="locked">
                                            Locked
                                        </label>
                                        <div className="mb-2">
                                            <select name="locked" className="form-control" ref={register}>
                                                <option value="">Select Option</option>
                                                <option value={false}>No</option>
                                                <option value={true}>Yes</option>
                                            </select>
                                        </div>
                                        <span className="text-danger">{errors.locked && 'Locked select value.'}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="color">
                                            Color template
                                        </label>
                                        <div className="mb-2">
                                            <input
                                                disabled
                                                type="color"
                                                name="color"
                                                ref={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <span className="text-danger">{errors.color && 'Color template is required.'}</span>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="balance">
                                            Coins balance
                                        </label>
                                        <div className="mb-2">
                                            <select name="balance" className="form-control" ref={register}>
                                                <option value={'null'}>Select Option</option>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="limit">
                                            Time limit
                                        </label>
                                        <div className="mb-2">
                                            <select name="limit" className="form-control">
                                                <option value="null">None</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="performance">
                                            Performance
                                        </label>
                                        <div className="mb-2">
                                            <select name="performance" className="form-control" ref={register}>
                                                <option value={'null'}>Select Option</option>
                                                <option value="time">Time</option>
                                                <option value="moves">Moves</option>
                                                <option value="special">Special</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="live">
                                            Live
                                        </label>
                                        <div className="mb-2">
                                            <ButtonSwitch />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button className="button btn-info" type="submit">
                                            Save
                                        </Button>
                                    </FormGroup>
                                </Form>
                                {/*<hr/>              */}
                                {/*<h4 className="mt-5">Check Data after form submit</h4> */}
                                {/*<ListGroup>*/}
                                {/*    <ListGroupItem>Firstname: {Formvalue.firstname}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Lirstname: {Formvalue.lastname}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Username: {Formvalue.username}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Age: {Formvalue.age}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Email Id: {Formvalue.email}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Mobile No: {Formvalue.mobile}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Gender: {Formvalue.title}</ListGroupItem>*/}
                                {/*    <ListGroupItem>Are you developer?: {Formvalue.developer}</ListGroupItem>*/}
                                {/*</ListGroup>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>}
    </>
        );
    }

export default AddGame;
