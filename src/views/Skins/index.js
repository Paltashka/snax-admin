// import React, {useEffect, useState} from 'react';
// import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, FormGroup, Row} from "reactstrap";
// import Form from "react-validation/build/form";
// import {useForm} from "react-hook-form";
// import { cardsjsondata } from '../tables/DataCardsBootstrapTable';
//
// const Skins = (props) => {
//     const {register, handleSubmit, errors} = useForm();
//     const [cards, setCards] = useState(null);
//
//     useEffect(() => {
//         if (cardsjsondata) {
//             setCards(cardsjsondata);
//         }
//     }, [cardsjsondata]);
//
//     if (!cards) {
//         return null;
//     }
//
//     return (
//         <Row>
//             {cards.map(card => {
//                 // ref={dragRef}
//                 return <Col xs="12" md="4">
//                     <Card>
//                         <CardImg top width="100%" src={card.icon}/>
//                         <CardBody>
//                             <Form>
//                                 <FormGroup>
//                                     <label className="control-label" htmlFor="id">
//                                         ID
//                                     </label>
//                                     <div className="mb-2">
//                                         <input
//                                             type="text"
//                                             name="id"
//                                             className="form-control"
//                                             // defaultValue={props.id}
//                                             defaultValue={card.id}
//                                         />
//                                     </div>
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <label className="control-label" htmlFor="icon">
//                                         Image
//                                     </label>
//                                     <div className="mb-2">
//                                         <input
//                                             type="file"
//                                             name="icon"
//                                             ref={register({required: true})}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <span className="text-danger">{errors.icon && 'Icon is required.'}</span>
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <label className="control-label" htmlFor="name">
//                                         Name
//                                     </label>
//                                     <div className="mb-2">
//                                         <input
//
//                                             type="text"
//                                             name="name"
//                                             ref={register({required: true})}
//                                             className="form-control"
//                                             defaultValue={card.name}
//                                         />
//                                     </div>
//                                     <span className="text-danger">{errors.name && 'Name is required.'}</span>
//                                 </FormGroup>
//                             </Form>
//                         </CardBody>
//                     </Card>
//                 </Col>
//             })}
//         </Row>
//     );
// };
//
// export default Skins;


import React from 'react'
import ReactDOM from 'react-dom'
import DragDrop from './DragDrop'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Skins = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <DragDrop />
            </DndProvider>
        </div>
    )
}

export default Skins

