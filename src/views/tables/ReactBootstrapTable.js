
import React, {useEffect, useState} from 'react';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {upperCasePipe} from "../../components/helpers/upperCasePipe";
import {
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap';

import img1 from '../../assets/images/big/img1.jpg';
import img2 from '../../assets/images/big/img2.jpg';
import img3 from '../../assets/images/big/img3.jpg';
import img4 from '../../assets/images/big/img4.jpg';
import img5 from '../../assets/images/big/img5.jpg';
import img6 from '../../assets/images/big/img6.jpg';
import {getAllGames, getAllGamesThunk, getIsGamesFetching} from "../../reducers/games";
import {useDispatch, useSelector} from "react-redux";


const imgs = [img1, img2, img3, img4, img5, img6];

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  hideSelectColumn: true,
  bgColor: '#bce5fc'
};


const headers = ['id', 'icon_url', 'name', 'is_locked_default', 'main_color_hex', 'number of skins', 'live_build_id', 'updated_at', 'Actions'];



function jobNameValidator(value, row) {

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



const AllGames = (props) => {



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
      props.setSelected(true)
      props.setRow(row)
      console.log(row)
    },

    // afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    // afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
    // afterSearch: afterSearch, // define a after search hook
  };

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



  const games = useSelector(getAllGames);
  const isLoaded = useSelector(getIsGamesFetching);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()



 if (isLoaded) {
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
                    data={games}
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
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{type: 'number', placeholder: ' '}} dataSort={true} isKey>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    } else if (item === "icon_url") {
                      return <TableHeaderColumn width="100"  key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{type: 'file', validator: jobNameValidator}}
                                                dataFormat={(cell) => {
                                                  return <img src={cell} dataSort={true} className={'icons'}/>
                                                }}>
                        <span style={{cursor: 'pointer'}}>Icon</span>

                      </TableHeaderColumn>
                    } else if (item === 'name') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'string',
                        placeholder: ' ',
                        validator: jobNameValidator
                      }} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    } else if (item === 'live_build_id') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{placeholder: ' ', validator: jobNameValidator}}
                                                dataSort={true} dataAlign='center'
                      >
                        <span style={{cursor: 'pointer'}}>Live</span>
                      </TableHeaderColumn>
                    } else if (item === 'is_locked_default') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'select',
                        options: {values: locked},
                        validator: jobNameValidator
                      }} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>Locked</span>
                      </TableHeaderColumn>
                    } else if (item === 'main_color_hex') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'select',
                        options: {values: colorTemplate},
                        validator: jobNameValidator
                      }} dataSort={true} dataFormat={(cell) => {
                        return <input disabled={true} type={'color'} value={cell} className={'color_api'}/>
                      }}>
                        <span style={{cursor: 'pointer'}}>Color template</span>

                      </TableHeaderColumn>
                    } else if (item === 'updated_at') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
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
                    } else if (item === 'Actions') {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}} editable={{
                        type: 'date',
                        options: {values: colorTemplate},
                      }} dataSort={true} dataFormat={(cell) => {
                        let date = Date.parse(cell)
                        return <span>{new Date(date).toDateString()}</span>
                      }}>
                        <span style={{cursor: 'pointer'}}>Last update</span>

                      </TableHeaderColumn>
                    }else if (item) {
                      return <TableHeaderColumn width="100" key={item+i} dataField={item}
                                                filter={{type: 'TextFilter', delay: 1000, placeholder: ' '}}
                                                editable={{placeholder: ' '}} dataSort={true}>
                        <span style={{cursor: 'pointer'}}>{upperCasePipe(item)}</span>
                      </TableHeaderColumn>
                    }
                    })
                  }
                </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </>

  );
}
}

export default AllGames;
