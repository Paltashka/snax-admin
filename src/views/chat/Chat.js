import React from "react";

import {Card, CardBody} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import * as pck from "../tables/DataGeneralDetail";



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



const PCK =  () => {

  return (
      <Card>
        <CardBody>
          <BootstrapTable
              data={pck.jsonpck}
              insertRow={true}
          >

            {headersPck.map((item,i)=> {
              if (i === 0) {
                return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                          editable={{type: 'number', placeholder: ' ', validator: jobNameValidator}}
                                          dataSort isKey>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              } else if (item === 'Updated at') {
                return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                          editable={{type: 'datetime', placeholder: ' ', validator: jobNameValidator}}
                                          dataSort>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              } else if (item === 'Updated by') {
                return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                          editable={{type: 'string', placeholder: ' ', validator: jobNameValidator}}
                                          dataSort>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              } else if (item === 'Env') {
                return <TableHeaderColumn width="100" key={item+i} dataField={item} editable={{
                  type: 'select',
                  options: {values: ['', 'Testing', 'Production']},
                  validator: jobNameValidator
                }} dataSort>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              } else if (item === 'Comments') {
                return <TableHeaderColumn width="100" key={item+i} dataField={item} hidden
                                          editable={{type: 'string', placeholder: ' '}} dataSort>
                  <span style={{cursor: 'pointer'}}>{item}</span>
                </TableHeaderColumn>
              } else return <TableHeaderColumn width="100" key={item+i} dataField={item} editable={{
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
  );
};

export default PCK
