import React, {useState} from 'react';
// import {Row, Col, Card, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import * as data from "../tables/DataBootstrapTable";
import { cardsjsondata } from "../tables/DataCardsBootstrapTable";
import {upperCasePipe} from "../../components/helpers/upperCasePipe";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardGroup,
  CardDeck,
  CardLink,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col
} from 'reactstrap';

import img1 from '../../assets/images/big/img1.jpg';
import img2 from '../../assets/images/big/img2.jpg';
import img3 from '../../assets/images/big/img3.jpg';
import img4 from '../../assets/images/big/img4.jpg';
import img5 from '../../assets/images/big/img5.jpg';
import img6 from '../../assets/images/big/img6.jpg';

const imgs = [img1, img2, img3, img4, img5, img6];

const selectRowProp = {
  mode: "checkbox",
};
const cellEditProp = {
  mode: "click",
  blurToSave: true,
};

const headers = ['id', 'icon', 'name', 'locked', 'color template','coins balance', 'time limit','performance', 'number of skins', 'live', 'last update'];
const cards = ['id', 'order', 'name', 'image'];

function jobNameValidator(value, row) {
  // If this function return an object, you got some ability to customize your error message
  const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  }
  // else if (value.length < 10) {
  //   response.isValid = false;
  //   response.notification.type = 'error';
  //   response.notification.msg = 'Value must have 10+ characters';
  //   response.notification.title = 'Invalid Value';
  // }
  return response;
}



const FirstDashboard = () => {

  const createCustomExportCSVButton = () => {
    return (
        <button style={ { color: 'white', backgroundColor: 'green',  width: '95px', height: '30px', marginRight: '10px' } } onClick={() => multiple()}>{isHidden ? 'Show more':'Hide'}</button>
    );

  }
  const createCustomExportDeleteButton = (onClick) => {
    return (
        <button style={ { color: 'white', backgroundColor: 'red', marginLeft: '10px' } } onClick={onClick}>Delete</button>
    );

  }

  const options = {
    exportCSVBtn: createCustomExportCSVButton,
    deleteBtn: createCustomExportDeleteButton
    // afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    // afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
    // afterSearch: afterSearch, // define a after search hook
  };

  const [items, setItems] = useState(data.jsondata);
  const [isHidden, setHidden] = useState(true);
  const [isCard, setCard] = useState(false);

  function changeHidden() {
    setHidden(!isHidden)
    return isHidden
  }

  function changeHiddenCard() {
    setCard(!isCard)
    return isCard
  }

  function multiple() {
    changeHidden();
    changeHiddenCard();
  }

  const handleLiveClick = (id) => {
    const object = items.find(i => {
      return i.id === id
    });
    const index = items.findIndex(el => el.id === object.id);

    const newObject = {...object, live: !object.live};

    const newArr = [
      ...items.slice(0, index),
      newObject,
      ...items.slice(index + 1),
    ];

    setItems(newArr);
  }


  const locked = [ 'Yes', 'No' ];

  const colorTemplate = [ 'Main color', 'Secondary color', 'Secondary color 2' ];

  const performance = ['Time', 'Moves', 'Special']

  return (
      <div>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <BootstrapTable
                    striped
                    hover
                    condensed
                    search={true}
                    data={items}
                    deleteRow={true}
                    selectRow={selectRowProp}
                    pagination
                    insertRow={true}
                    exportCSV={true}
                    columnFilter={true}
                    options={options}
                    cellEdit={cellEditProp}
                    tableHeaderClass="mb-4"
                >

                  {headers.map((item, i) => {
                    if(i === 0) {
                      return <TableHeaderColumn width="100" dataField={item} editable={ { type: 'number', options: { values: '1' }  } } dataSort={ true } isKey>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }else if(item === "icon") {
                      return <TableHeaderColumn width="100" dataField={item}  dataFormat={(cell, format) => {
                        return <img src={cell} dataSort={ true }/>
                      } }>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }else if(item === 'live'){
                      return <TableHeaderColumn width="100" dataField={item} dataSort={ true } dataAlign = 'center'    dataFormat={(cell, row) => {
                        return <div className={cell ? 'btn-green' : 'btn-red'} onClick={() => handleLiveClick(row.id)}>{cell ? 'ON':'OFF'}</div>
                      }}>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }else if(item === 'locked'){
                      return <TableHeaderColumn width="100" dataField={item}  editable={ { type: 'select', options: { values: locked } } }  dataSort={ true }>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    } else if(item === 'color template'){
                      return <TableHeaderColumn width="100" dataField={item}  editable={ { type: 'select', options: { values: colorTemplate } } }  dataSort={ true }>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }else if(item === 'coins balance' || item === 'time limit' || item === 'performance'){
                      return <TableHeaderColumn width="100" dataField={item} hidden={isHidden} editable={ { type: 'select', options: { values: locked } } }  dataSort={ true }>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }else if(item){
                      return <TableHeaderColumn width="100" dataField={item}  editable={ { type: 'select', options: { values: colorTemplate } } }  dataSort={ true }>
                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }
                    // else return <TableHeaderColumn width="100" dataField={item}   dataSort={ true }>
                    //   <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    // </TableHeaderColumn>
                  })}

                </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className={'cards'}>
            {isCard && cardsjsondata.map((item,index) => {

              return <Card key={item.name}>
                <CardImg top width="100%" src={item.icon}/>
                <CardBody className={"cardBody"}>
                  <CardTitle>{item.name}</CardTitle>
                  <CardSubtitle>{item.id}</CardSubtitle>
                  <CardText>{item.order}</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>

            })}
          </Col>
        </Row>

      </div>
  );
}

export default FirstDashboard;
