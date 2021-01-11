import React, {useEffect} from "react";

import {Card, CardBody} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import * as pck from "../tables/DataGeneralDetail";
import {useDispatch, useSelector} from "react-redux";
import {getAllPCK, getAllPCKThunk} from "../../reducers/games";



const headersPck = ['version', 'game_id', 'created_at', 'build_id', 'pck_url', 'Comments'];


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

  const dispatch = useDispatch();
  const pckData = useSelector(getAllPCK);
  useEffect( () => {
    dispatch(getAllPCKThunk())
  }, []);

  pckData.filter(item => item.created_at = new Date(item.created_at).toDateString())

  return (
      <Card>
        <CardBody>
          <BootstrapTable
              data={pckData}
              insertRow={true}
          >

            {headersPck.map((item,i)=> {
              if (i === 0) {
                return <TableHeaderColumn width="30" key={item+i} dataField={item}
                                          editable={{type: 'number', placeholder: ' ', validator: jobNameValidator}}
                                          dataSort isKey>
                  <span style={{cursor: 'pointer'}}>Version</span>
                </TableHeaderColumn>
              } else if (item === 'created_at') {
                        // it.created_at = new Date(it.created_at).toDateString()
                          return <TableHeaderColumn width="30" key={item+i} dataField={item}
                                                    editable={{type: 'datetime', placeholder: ' ', validator: jobNameValidator}}
                                                    dataSort>
                            <span style={{cursor: 'pointer'}}>Updated at</span>
                            {console.log(item+i)}
                          </TableHeaderColumn>

              } else if (item === 'build_id') {
                return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                          editable={{type: 'string', placeholder: ' ', validator: jobNameValidator}}
                                          dataSort>
                  <span style={{cursor: 'pointer'}}>Updated by</span>
                </TableHeaderColumn>
              } else if (item === 'pck_url') {
                return <TableHeaderColumn width="50" key={item+i} dataField={item} editable={{
                  type: 'string',
                  // options: {values: ['', 'Testing', 'Production']},
                  validator: jobNameValidator
                }} dataSort style={{width: '50px !important'}}>
                  <span style={{cursor: 'pointer'}}>Env</span>
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
                <span style={{cursor: 'pointer'}}>File name</span>
              </TableHeaderColumn>
            })
            }
          </BootstrapTable>
        </CardBody>
      </Card>
  );
};

export default PCK
