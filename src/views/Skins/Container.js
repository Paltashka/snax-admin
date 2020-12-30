import React, {useState, useCallback} from 'react';
import {Skins} from './Skins';
import update from 'immutability-helper';
import img1 from "../../assets/images/big/img1.jpg";
import img2 from "../../assets/images/big/img2.jpg";
import img3 from "../../assets/images/big/img3.jpg";
import img4 from "../../assets/images/big/img4.jpg";
import img5 from "../../assets/images/big/img5.jpg";
import img6 from "../../assets/images/big/img6.jpg";
import {Row} from "reactstrap";

const style = {
    width: 400,
};
export const Container = () => {
    {
        const [cards, setCards] = useState([
            {
                "id": "1",
                "icon": img1,
                "name": "Jon",
            },
            {
                "id": "2",
                "icon": img2,
                "name": "John",
            },
            {
                "id": "3",
                "icon": img3,
                "name": "Peter",
            },
            {
                "id": "4",
                "icon": img4,
                "name": "Fred",
            },
            {
                "id": "5",
                "icon": img5,
                "name": "Cat",
            },
            {
                "id": "6",
                "icon": img6,
                "name": "Jorge",
            }
        ]);
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);

        const renderCard = (card, index) => {
            return (<Skins key={card.id} index={index} id={card.id} name={card.name} icon={card.icon}
                           moveCard={moveCard}/>);
        };
        return (
            <Row>{cards.map((card, i) => renderCard(card, i))}</Row>
        );
    }
};
