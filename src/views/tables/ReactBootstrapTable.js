import React, {useEffect, useState} from "react";
import * as data from "./DataBootstrapTable";
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
const options = {
  //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
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

const Datatables = () => {

  const [allData, setAllData] = useState(data.jsondata);
  const [selectedFilter, setFilter] = useState(null);

  useEffect(() => {
    const arr = allData.concat().sort((a, b) => {
      if (a[selectedFilter] < b[selectedFilter]) {
        return -1;
      }
      if (a[selectedFilter] > b[selectedFilter]) {
        return 1;
      }
      return 0;
    });
    setAllData(arr)
    console.log(arr)
  },[selectedFilter])

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
                data={allData}
                deleteRow={true}
                selectRow={selectRowProp}
                // pagination
                insertRow={true}
                options={options}
                cellEdit={cellEditProp}
                tableHeaderClass="mb-0"
              >
                {headers.map((item, i)=>{
                  if(i === 0) {
                    return <TableHeaderColumn width="100" dataField={item}  isKey>
                      <span onClick={() => {
                        setFilter(item);
                      }} style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }
                  if(item === "icon") {
                    return <TableHeaderColumn width="100" dataField={item}  dataFormat={(cell, format) => {
                        return <img src={cell}/>
                    } }>
                      <span onClick={() => {
                        setFilter(item);
                      }} style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }

                  if(i >= 0 && i <= 6){
                    return <TableHeaderColumn width="100" dataField={item}   editable={{
                      validator: (value, row) => {
                        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' }};
                        if (!value) {
                          response.isValid = false;
                          response.notification.type = 'error';
                          response.notification.msg = 'Value must be inserted';
                          response.notification.title = '';
                        }
                        return response;
                      }
                    }}>
                      <span onClick={() => {
                        setFilter(item);
                      }} style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
                    </TableHeaderColumn>
                  }

                  return <TableHeaderColumn width="100" dataField={item} >
                    <span onClick={() => {
                      setFilter(item);
                    }} style={{cursor:'pointer'}}>{upperCasePipe(item)}</span>
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
