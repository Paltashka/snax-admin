import React, {useEffect, useRef} from 'react';
import {Card, CardBody, CardImg, FormGroup} from "reactstrap";
import Form from "react-validation/build/form";
import {useForm} from "react-hook-form";
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from './ItemTypes';
import {useDispatch, useSelector} from "react-redux";
import {getAllSkins, getAllSkinsThunk} from "../../reducers/games";

export const Skins = ({id, icon, text, index, moveCard}) => {
    const style = {
        position: 'relative',
        width: '100%',
        paddingRight: '15px',
        paddingLeft: '15px',
        flex: '0 0 33.33333%',
        maxWidth: '33.33333%',
        cursor: 'move',
    }
    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();
    const skins = useSelector(getAllSkins);
    console.log(skins, 'TTTTTTTTTTTTTTTTTTTTTT')
    useEffect(() => {
        dispatch(getAllSkinsThunk());
    }, [])

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const unique = [...new Set(skins)];
    console.log(unique, 'EEEE')

    return (
        <div ref={ref} style={{
            ...style,
            opacity,
        }}>
            { unique.map((item, i) => {
                return (
            <Card>
                <CardImg top width="100%" src={item.skin_3d_url}/>
                <CardBody>
                    <Form>

                        <FormGroup editable={{placeholder: ' '}}>
                            <label className="control-label" htmlFor="id">
                                ID
                            </label>
                            <div className="mb-2">
                                <div
                                    type="text"
                                    name="id"
                                    className="form-control"
                                    // defaultValue={props.id}
                                    defaultValue={item.id}
                                >{item.game_id}</div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label className="control-label" htmlFor="icon">
                                Image
                            </label>
                            <div className="mb-2">
                                <input
                                    type="file"
                                    name="icon"
                                    ref={register({required: true})}
                                    className="form-control"
                                />
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
                                    ref={register({required: true})}
                                    className="form-control"
                                    // defaultValue={text}
                                    defaultValue={item.skin_name}
                                />
                            </div>
                            <span className="text-danger">{errors.name && 'Name is required.'}</span>
                        </FormGroup>
                        <FormGroup>
                            <label className="control-label" htmlFor="order">
                                Order
                            </label>
                            <div className="mb-2">
                                <input

                                    type="number"
                                    name="order"
                                    ref={register({required: true})}
                                    className="form-control"
                                    defaultValue={item.game_skin_number}
                                />
                            </div>
                            <span className="text-danger">{errors.name && 'Order is required.'}</span>
                        </FormGroup>

                    </Form>
                </CardBody>
            </Card>)})
            }

        </div>
    );
};

export default Skins;
