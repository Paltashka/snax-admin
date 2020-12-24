import React, {useState} from "react";
// import * as data from "../tables/DataGeneralDetail";
import { Row, Col, Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {upperCasePipe} from "../../components/helpers/upperCasePipe";
//This is for the Delete row
// function onAfterDeleteRow(rowKeys) {
//   alert("The rowkey you drop: " + rowKeys);
// }
//This is for the insert new row
/*
function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}*/
//This is for the Search item
// function afterSearch(searchText, result) {
//   console.log("Your search text is " + searchText);
//   console.log("Result is:");
//   for (let i = 0; i < result.length; i++) {
//     console.log(
//       "Fruit: " + result[i].id + ", " + result[i].name + ", " + result[i].price
//     );
//   }
// }


const cellEditProp = {
    mode: "click",
    blurToSave: true,
};

const headers = ['id', 'icon', 'name', 'locked', 'color template', 'coins balance', 'time limit', 'performance', 'live'];

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


const Datatables = () => {

    // const [allData, setAllData] = useState(data.jsondata);
    // const [selectedFilter, setFilter] = useState(null);

    // useEffect(() => {
    //   const arr = allData.concat().sort((a, b) => {
    //     if (a[selectedFilter] < b[selectedFilter]) {
    //       return -1;
    //     }
    //     if (a[selectedFilter] > b[selectedFilter]) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   setAllData(arr)
    //   console.log(arr)
    // },[selectedFilter])
    // const [items, setItems] = useState(data.jsondata);

    const options = {
        // afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
        // afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
        // afterSearch: afterSearch, // define a after search hook
    };

    // const handleLiveClick = (id) => {
    //     const object = items.find(i => {
    //         return i.id === id
    //     });
    //     const index = items.findIndex(el => el.id === object.id);
    //
    //     const newObject = {...object, live: !object.live};
    //
    //     const newArr = [
    //         ...items.slice(0, index),
    //         newObject,
    //         ...items.slice(index + 1),
    //     ];
    //
    //     setItems(newArr);
    // }


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
                                // search={true}
                                // data={items}
                                // deleteRow={true}
                                // selectRow={selectRowProp}
                                // pagination
                                insertRow={true}
                                // columnFilter={true}
                                options={options}
                                cellEdit={cellEditProp}
                                tableHeaderClass="mb-4"

                            >

                                {headers.map((item, i)=>{

                                    if(i === 0) {
                                        return <TableHeaderColumn  width="100"  dataField={item} dataAlign = 'center'  dataSort={ true } isKey>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    }
                                    else if(item === "icon") {
                                        return <TableHeaderColumn width="100" dataField={item} dataAlign = 'center' dataFormat={(cell, format) => {
                                            return <img style={{width:32, height:32}} src={cell}/>
                                        } }>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    } else if(item === 'live'){
                                        return <TableHeaderColumn width="100" dataField={item} dataSort={ true } dataAlign = 'center'  editable={false} dataFormat={(cell, row) => {
                                            // return <div className={cell ? 'btn-green' : 'btn-red'} onClick={() => handleLiveClick(row.id)}>{cell ? 'ON':'OFF'}</div>
                                        }}>
                                            <span  style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    } else if(i > 0) {
                                        return <TableHeaderColumn width="100" dataField={item} dataAlign = 'center' dataSort={true}
                                                                  editable={{validator: jobNameValidator}}>
                                            <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                                        </TableHeaderColumn>
                                    }

                                   else return <TableHeaderColumn width="100" dataField={item} dataAlign = 'center' dataSort={ true }>
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
};
export default Datatables;
