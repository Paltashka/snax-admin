import React from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import * as data from "../tables/DataBootstrapTable";
import {upperCasePipe} from "../../components/helpers/upperCasePipe";


const options = {
    // afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    // afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
    // afterSearch: afterSearch, // define a after search hook
};
const selectRowProp = {
    mode: "checkbox",
};
const cellEditProp = {
    mode: "click",
    blurToSave: true,
};

const headers = ['id', 'icon', 'name', 'locked', 'color template', 'number of skins', 'live', 'last update'];

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
                                data={data.jsondata}
                                deleteRow={true}
                                selectRow={selectRowProp}
                                // pagination
                                insertRow={true}
                                columnFilter={true}
                                options={options}
                                cellEdit={cellEditProp}
                                tableHeaderClass="mb-0"
                            >

                                {headers.map((item, i)=>{
                                    if(i === 0) {
                                        return <TableHeaderColumn width="100" dataField={item}  dataSort={ true } isKey>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    }
                                    if(item === "icon") {
                                        return <TableHeaderColumn width="100" dataField={item}  dataFormat={(cell, format) => {
                                            return <img src={cell} dataSort={ true }/>
                                        } }>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    }

                                    if(i >= 0 && i <= 6){
                                        return <TableHeaderColumn width="100" dataField={item} dataSort={ true }  editable={{validator: jobNameValidator}}>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    }

                                    return <TableHeaderColumn width="100" dataField={item}  dataSort={ true }>
                                        <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                    </TableHeaderColumn>
                                })}
                            </BootstrapTable>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default FirstDashboard;
