
import React, {useEffect, useState} from 'react';

// import {Row, Col, Card, CardBody} from 'reactstrap';

import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import * as data from "../tables/DataBootstrapTable";

import { cardsjsondata } from "../tables/DataCardsBootstrapTable";
import * as pck from "../tables/DataGeneralDetail";

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

const headers = ['id', 'icon_url', 'name', 'is_locked_default', 'main_color_hex', 'number of skins', 'live_build_id', 'updated_at'];
const cards = ['id', 'order', 'name', 'image'];
const headersPck = ['Version', 'File name', 'Updated at', 'Updated by', 'Env', 'Comments'];


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
        <button style={ { color: 'white', backgroundColor: 'green',  width: '95px', height: '30px', marginRight: '10px', border: 0 } } onClick={() => multiple()}>{isHidden ? 'Show more':'Hide'}</button>
    );

  }
  const createCustomExportDeleteButton = (onClick) => {
    return (
        <button style={ { color: 'white', backgroundColor: 'red', marginLeft: '10px', border: 0 } } onClick={onClick}>Delete</button>
    );

  }

  const options = {
    exportCSVBtn: createCustomExportCSVButton,
    deleteBtn: createCustomExportDeleteButton,
    onRowClick: function(row) {
      console.log(row.id)
    },
    onRowDoubleClick: function(row) {
      alert(`You double click row id: ${row.id}`);
    }
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


  const locked = [ '', 'Yes', 'No' ];

  const colorTemplate = [ '', 'Main color', 'Secondary color', 'Secondary color 2' ];

  const performance = ['', 'Time', 'Moves', 'Special'];

  const timeLimit = (lim=90)=>{
    let res = [''];
    for (let i =0; i<=lim; i+=5){
      res.push(i)
    }
    return res
  }
  const cellEditProp = {
    mode: 'dbclick',
    blurToSave: true
  };


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [it, setIt] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`http://18.216.83.82:3000/api/v1/games/`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }})
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              setIt(result.payload);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])


if(error) {
  return <div>Error: {error.message}</div>
} else if (!isLoaded) {
  return <div>Loading...</div>
}else {

  return (
      <>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <BootstrapTable
                    striped
                    hover
                    condensed
                    search={true}
                    data={it}
                    deleteRow={true}
                    selectRow={selectRowProp}
                    // pagination
                    insertRow={true}
                    exportCSV={true}
                    options={options}
                    tableHeaderClass="mb-4"
                >
                  {headers.map((item, i) => {

                    if (i === 0) {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{type: 'number', placeholder: ' '}} dataSort={true} isKey>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    } else if (item === "icon_url") {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{type: 'file', validator: jobNameValidator}}
                                                dataFormat={(cell) => {
                                                  return <img src={cell} dataSort={true} className={'icons'}/>
                                                }}>
                        <span style={{cursor: 'pointer'}}>Icon</span>

                      </TableHeaderColumn>
                    } else if (item === 'name') {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'string',
                        placeholder: ' ',
                        validator: jobNameValidator
                      }} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    } else if (item === 'live_build_id') {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{placeholder: ' ', validator: jobNameValidator}}
                                                dataSort={true} dataAlign='center'
                      >
                        <span style={{cursor: 'pointer'}}>Live</span>
                      </TableHeaderColumn>
                    } else if (item === 'is_locked_default') {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'select',
                        options: {values: locked},
                        validator: jobNameValidator
                      }} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>Locked</span>
                      </TableHeaderColumn>
                    } else if (item === 'main_color_hex') {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'select',
                        options: {values: colorTemplate},
                        validator: jobNameValidator
                      }} dataSort={true} dataFormat={(cell) => {
                        return <input type={'color'} value={cell} className={'color_api'}/>
                      }}>
                        <span style={{cursor: 'pointer'}}>Color template</span>

                      </TableHeaderColumn>
                    } else if (item === 'updated_at') {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'date',
                        options: {values: colorTemplate},
                        validator: jobNameValidator
                      }} dataSort={true} dataFormat={(cell) => {
                        let date = Date.parse(cell)
                        return <span>{new Date(date).toDateString()}</span>
                      }}>
                        <span style={{cursor: 'pointer'}}>Last update</span>

                      </TableHeaderColumn>
                    } else if (item) {
                      return <TableHeaderColumn width="100" dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{placeholder: ' '}} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }
                    // else return <TableHeaderColumn width="100" dataField={item}   dataSort={ true }>
                    //   <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    // </TableHeaderColumn>
                    })
                  }
                </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col className={'cards'}>
            {isCard && cardsjsondata.map((item, index) => {

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

        <Card>
          <CardBody>
            <BootstrapTable
                data={pck.jsonpck}
                insertRow={true}
            >

              {headersPck.map((item,i)=> {
                if (i === 0) {
                  return <TableHeaderColumn width="100" dataField={item}
                                            editable={{type: 'number', placeholder: ' ', validator: jobNameValidator}}
                                            dataSort isKey>
                    <span style={{cursor: 'pointer'}}>{item}</span>
                  </TableHeaderColumn>
                } else if (item === 'Updated at') {
                  return <TableHeaderColumn width="100" dataField={item}
                                            editable={{type: 'datetime', placeholder: ' ', validator: jobNameValidator}}
                                            dataSort>
                    <span style={{cursor: 'pointer'}}>{item}</span>
                  </TableHeaderColumn>
                } else if (item === 'Updated by') {
                  return <TableHeaderColumn width="100" dataField={item}
                                            editable={{type: 'string', placeholder: ' ', validator: jobNameValidator}}
                                            dataSort>
                    <span style={{cursor: 'pointer'}}>{item}</span>
                  </TableHeaderColumn>
                } else if (item === 'Env') {
                  return <TableHeaderColumn width="100" dataField={item} editable={{
                    type: 'select',
                    options: {values: ['', 'Testing', 'Production']},
                    validator: jobNameValidator
                  }} dataSort>
                    <span style={{cursor: 'pointer'}}>{item}</span>
                  </TableHeaderColumn>
                } else if (item === 'Comments') {
                  return <TableHeaderColumn width="100" dataField={item} hidden
                                            editable={{type: 'string', placeholder: ' '}} dataSort>
                    <span style={{cursor: 'pointer'}}>{item}</span>
                  </TableHeaderColumn>
                } else return <TableHeaderColumn width="100" dataField={item} editable={{
                  type: 'number',
                  placeholder: ' ',
                  validator: jobNameValidator
                }} dataSort>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              })
              }
            </BootstrapTable>
          </CardBody>
        </Card>
      </>

  );
}
}

export default FirstDashboard;
