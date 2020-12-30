// import React, { useRef } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
// import { ItemTypes } from './ItemTypes';
// const style = {
//     border: '1px dashed gray',
//     padding: '0.5rem 1rem',
//     marginBottom: '.5rem',
//     backgroundColor: 'white',
//     cursor: 'move',
// };
// export const Cards = ({ id, text, index, moveCard }) => {
//     const ref = useRef(null);
//     const [, drop] = useDrop({
//         accept: ItemTypes.CARD,
//         hover(item, monitor) {
//             if (!ref.current) {
//                 return;
//             }
//             const dragIndex = item.index;
//             const hoverIndex = index;
//             // Don't replace items with themselves
//             if (dragIndex === hoverIndex) {
//                 return;
//             }
//             // Determine rectangle on screen
//             const hoverBoundingRect = ref.current?.getBoundingClientRect();
//             // Get vertical middle
//             const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//             // Determine mouse position
//             const clientOffset = monitor.getClientOffset();
//             // Get pixels to the top
//             const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//             // Only perform the move when the mouse has crossed half of the items height
//             // When dragging downwards, only move when the cursor is below 50%
//             // When dragging upwards, only move when the cursor is above 50%
//             // Dragging downwards
//             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//                 return;
//             }
//             // Dragging upwards
//             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//                 return;
//             }
//             // Time to actually perform the action
//             moveCard(dragIndex, hoverIndex);
//             // Note: we're mutating the monitor item here!
//             // Generally it's better to avoid mutations,
//             // but it's good here for the sake of performance
//             // to avoid expensive index searches.
//             item.index = hoverIndex;
//         },
//     });
//     const [{ isDragging }, drag] = useDrag({
//         item: { type: ItemTypes.CARD, id, index },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     });
//     const opacity = isDragging ? 0 : 1;
//     drag(drop(ref));
//     return (<div ref={ref} style={{ ...style, opacity }}>
//         {text}
//     </div>);
// };


import React, {useEffect, useState, useRef} from 'react';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, FormGroup, Row} from "reactstrap";
import Form from "react-validation/build/form";
import {useForm} from "react-hook-form";
import { cardsjsondata } from '../tables/DataCardsBootstrapTable';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

export const Skins = ({id, text, index, moveCard}) => {
    const {register, handleSubmit, errors} = useForm();
    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (cardsjsondata) {
            setCards(cardsjsondata);
        }
    }, [cardsjsondata]);

        const ref = useRef(null);
        const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    if (!cards) {
        return null;
    }

    return (
        <Row>
            {cards.map(card => {
                // ref={dragRef}
                return <Col xs="12" md="4">
                    <div ref={ref} style={{...style, opacity}}>
                    <Card>
                        <CardImg top width="100%" src={card.icon}/>
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
                                            defaultValue={card.id}
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
                                            defaultValue={card.name}
                                        />
                                    </div>
                                    <span className="text-danger">{errors.name && 'Name is required.'}</span>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    </div>
                </Col>
            })}
        </Row>
    );
};

export default Skins;
