import React, {useRef} from 'react';
import {Card, CardBody, CardImg, FormGroup} from "reactstrap";
import Form from "react-validation/build/form";
import {useForm} from "react-hook-form";
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from './ItemTypes';

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

    return (
        <div ref={ref} style={{
            ...style,
            opacity,
        }}>
            <Card>
                <CardImg top width="100%" src={icon}/>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <label className="control-label" htmlFor="id">
                                ID
                            </label>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    name="id"
                                    className="form-control"
                                    // defaultValue={props.id}
                                    defaultValue={id}
                                />
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
                                    defaultValue={text}
                                />
                            </div>
                            <span className="text-danger">{errors.name && 'Name is required.'}</span>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Skins;
