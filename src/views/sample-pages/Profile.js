import React, { useState } from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {upperCasePipe} from "../../components/helpers/upperCasePipe";
import * as data from "../tables/DataBootstrapTable";


import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import classnames from "classnames";




const selectRowProp = {
  mode: "checkbox",
};
const cellEditProp = {
  mode: "click",
  blurToSave: true,
};

const headers = ['id', 'icon', 'name', 'locked', 'color template','coins balance', 'time limit','performance', 'number of skins', 'live', 'last update'];

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


const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
    // onRowClick: function(row) {
    //   alert(`You click row id: ${row.id}`);
    // },
    // onRowDoubleClick: function(row) {
    //   alert(`You double click row id: ${row.id}`);
    // }
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

  return (
    <div>
      <Card>
        <Row>
            <Card>


              {/*<TabContent activeTab={activeTab}>*/}
              {/*  <TabPane tabId="1">*/}
              {/*    <Row>*/}
              {/*      <Col sm="12">*/}
              {/*        <Card>*/}
              {/*          <CardBody>*/}
              {/*           <h1>Zalupa</h1>*/}
              {/*          </CardBody>*/}
              {/*        </Card>*/}
              {/*      </Col>*/}
              {/*    </Row>*/}
              {/*  </TabPane>*/}
              {/*  <TabPane tabId="2">*/}
              {/*    <Row>*/}
              {/*      <Col sm="12">*/}
              {/*        <Card>*/}
              {/*          <CardBody>*/}
              {/*            <Row>*/}
              {/*              <Col md="3" xs="6" className="border-right">*/}
              {/*                <strong>Full Name</strong>*/}
              {/*                <br />*/}
              {/*                <p className="text-muted">Johnathan Deo</p>*/}
              {/*              </Col>*/}
              {/*              <Col md="3" xs="6" className="border-right">*/}
              {/*                <strong>Mobile</strong>*/}
              {/*                <br />*/}
              {/*                <p className="text-muted">(123) 456 7890</p>*/}
              {/*              </Col>*/}
              {/*              <Col md="3" xs="6" className="border-right">*/}
              {/*                <strong>Email</strong>*/}
              {/*                <br />*/}
              {/*                <p className="text-muted">johnathan@admin.com</p>*/}
              {/*              </Col>*/}
              {/*              <Col md="3" xs="6" className="border-right">*/}
              {/*                <strong>Location</strong>*/}
              {/*                <br />*/}
              {/*                <p className="text-muted">London</p>*/}
              {/*              </Col>*/}
              {/*            </Row>*/}
              {/*            <p className="mt-4">*/}
              {/*              Donec pede justo, fringilla vel, aliquet nec,*/}
              {/*              vulputate eget, arcu. In enim justo, rhoncus ut,*/}
              {/*              imperdiet a, venenatis vitae, justo. Nullam dictum*/}
              {/*              felis eu pede mollis pretium. Integer tincidunt.Cras*/}
              {/*              dapibus. Vivamus elementum semper nisi. Aenean*/}
              {/*              vulputate eleifend tellus. Aenean leo ligula,*/}
              {/*              porttitor eu, consequat vitae, eleifend ac, enim.*/}
              {/*            </p>*/}
              {/*            <p>*/}
              {/*              Lorem Ipsum is simply dummy text of the printing and*/}
              {/*              typesetting industry. Lorem Ipsum has been the*/}
              {/*              industry&apos;s standard dummy text ever since the*/}
              {/*              1500s, when an unknown printer took a galley of type*/}
              {/*              and scrambled it to make a type specimen book. It has*/}
              {/*              survived not only five centuries{" "}*/}
              {/*            </p>*/}
              {/*            <p>*/}
              {/*              It was popularised in the 1960s with the release of*/}
              {/*              Letraset sheets containing Lorem Ipsum passages, and*/}
              {/*              more recently with desktop publishing software like*/}
              {/*              Aldus PageMaker including versions of Lorem Ipsum.*/}
              {/*            </p>*/}
              {/*            <h4 className="font-medium mt-4">Skill Set</h4>*/}
              {/*            <hr />*/}
              {/*            <h5 className="mt-4">*/}
              {/*              Wordpress <span className="float-right">80%</span>*/}
              {/*            </h5>*/}
              {/*            <Progress value={2 * 5} />*/}
              {/*            <h5 className="mt-4">*/}
              {/*              HTML 5 <span className="float-right">90%</span>*/}
              {/*            </h5>*/}
              {/*            <Progress color="success" value="25" />*/}
              {/*            <h5 className="mt-4">*/}
              {/*              jQuery <span className="float-right">50%</span>*/}
              {/*            </h5>*/}
              {/*            <Progress color="info" value={50} />*/}
              {/*            <h5 className="mt-4">*/}
              {/*              Photoshop <span className="float-right">70%</span>*/}
              {/*            </h5>*/}
              {/*            <Progress color="warning" value={75} />*/}
              {/*          </CardBody>*/}
              {/*        </Card>*/}
              {/*      </Col>*/}
              {/*    </Row>*/}
              {/*  </TabPane>*/}
              {/*  <TabPane tabId="3">*/}
              {/*    <Row>*/}
              {/*      <Col sm="12">*/}
              {/*        <Card>*/}
              {/*          <CardBody>*/}
              {/*            <Form>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Full Name</Label>*/}
              {/*                <Input type="text" placeholder="Shaina Agrawal" />*/}
              {/*              </FormGroup>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Email</Label>*/}
              {/*                <Input*/}
              {/*                    type="email"*/}
              {/*                    placeholder="Jognsmith@cool.com"*/}
              {/*                />*/}
              {/*              </FormGroup>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Password</Label>*/}
              {/*                <Input type="password" placeholder="Password" />*/}
              {/*              </FormGroup>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Phone No</Label>*/}
              {/*                <Input type="text" placeholder="123 456 1020" />*/}
              {/*              </FormGroup>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Message</Label>*/}
              {/*                <Input type="textarea" />*/}
              {/*              </FormGroup>*/}
              {/*              <FormGroup>*/}
              {/*                <Label>Select Country</Label>*/}
              {/*                <Input type="select">*/}
              {/*                  <option>USA</option>*/}
              {/*                  <option>India</option>*/}
              {/*                  <option>America</option>*/}
              {/*                </Input>*/}
              {/*              </FormGroup>*/}
              {/*              <Button color="primary">Update Profile</Button>*/}
              {/*            </Form>*/}
              {/*          </CardBody>*/}
              {/*        </Card>*/}
              {/*      </Col>*/}
              {/*    </Row>*/}
              {/*  </TabPane>*/}
              {/*</TabContent>*/}
            </Card>
        </Row>
      </Card>
      <Row>
        <Nav tabs>
          <NavItem>
            <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
            >
              General Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
            >
              Skins
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
            >
              PCK
            </NavLink>
          </NavItem>
        </Nav>
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
                  selectRow={ selectRowProp }
                  // pagination
                  insertRow={true}
                  exportCSV={true}
                  options={options}
                  tableHeaderClass="mb-4"
              >

                {headers.map((item, i) => {

                  if(i === 0) {
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { type: 'number', placeholder: ' ' } } dataSort={ true } isKey>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === "icon") {
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { type: 'file', validator: jobNameValidator   } } dataFormat={(cell) => {
                      return <img src={cell} dataSort={ true }/>
                    } }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'name'){
                    return <TableHeaderColumn width="100" dataField={item}  filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { type: 'string',placeholder: ' ',  validator: jobNameValidator  } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'live'){
                    return <TableHeaderColumn width="100" dataField={item}  filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { placeholder: ' ', validator: jobNameValidator } } dataSort={ true } dataAlign = 'center'    dataFormat={(cell, row) => {
                      return <div className={cell===true ? 'btn-green' : 'btn-red'} >{cell===true ? 'ON':'OFF'}</div>
                    }}>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'locked'){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { type: 'select', options: { values: locked }, validator: jobNameValidator  } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  } else if(item === 'color template'){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ { type: 'select', options: { values: colorTemplate }, validator: jobNameValidator } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'coins balance'){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } hidden={isHidden} editable={ { type: 'select', options: { values: locked } } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'time limit'){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } hidden={isHidden} editable={ { type: 'select', options: { values: timeLimit } } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item === 'performance'){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } hidden={isHidden} editable={ { type: 'select', options: { values: performance } } }  dataSort={ true }>
                      <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }else if(item){
                    return <TableHeaderColumn width="100" dataField={item} filter={ { type: 'TextFilter', delay: 1000, placeholder: ' ' } } editable={ {  placeholder: ' '  } }  dataSort={ true }>
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
    </div>
  );
};

export default Profile;
