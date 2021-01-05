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
import {getIsGameUpdating, updateGameThunk} from "../../reducers/games";


const GeneralDetails = ( props ) => {
    const { register, handleSubmit, errors } = useForm();
    const [Formvalue, setFormvalue] = useState({id: "", icon:"", email:"", age:"", title:"", mobile:"", developer:""});
    const numbers_time = [];
    const dispatch = useDispatch();
    const isFetching = useSelector(getIsGameUpdating);
    for(let i = 0; i<= 90; i+= 5) {
        numbers_time.push(i);
    }
    const onSubmit = (data) => {
        setFormvalue(data);
        const body = {
            game_id: props.row.id,
            name: data.name,
            is_locked: props.row.is_locked_default,
            is_live: props.row.is_live,
            color_template_id: props.row.color_id,
            performance: data.performance,
            show_coins: data.balance,
            time_limit: props.row.show_timer,
        }
        dispatch(updateGameThunk(body));
    };
    console.log(props.row.is_locked_default)
    const [previewImage, setPreviewImage] = useState(props.row.icon_url);
    const [image, setImage] = useState(null)


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
                                                src={previewImage}
                                                ref={register}
                                                className="form-control"
                                            />
                                            <input type="file" onChange={(e)=>{
                                                setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                                setImage(e.target.files[0])

                                            }}/>
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
                                                value={props.row.name}
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
                                                <option value="" selected={props.row.is_locked_default === null}>Select Option</option>
                                                <option value={false} selected={!props.row.is_locked_default && props.row.is_locked_default !== null}>No</option>
                                                <option value={true} selected={props.row.is_locked_default}>Yes</option>
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
                                                value={props.row.main_color_hex}
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
                                                <option value={'null'} selected={props.row.show_balance === null}>Select Option</option>
                                                <option value={true} selected={props.row.show_balance}>Yes</option>
                                                <option value={false} selected={!props.row.show_balance}>No</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="limit">
                                            Time limit
                                        </label>
                                        <div className="mb-2">
                                            <select name="limit" className="form-control" disabled={props.row.show_timer}>
                                                <option value="null">None</option>
                                                {numbers_time.map(num => <option value={num} key={num + 12312} selected={num === props.row.time_limit}>{num}</option>)}
                                            </select>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="control-label" htmlFor="performance">
                                            Performance
                                        </label>
                                        <div className="mb-2">
                                            <select name="performance" className="form-control" ref={register}>
                                                <option value={'null'} selected={props.row.performance === null}>Select Option</option>
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
                                            <ButtonSwitch live={props}/>
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

export default GeneralDetails;
