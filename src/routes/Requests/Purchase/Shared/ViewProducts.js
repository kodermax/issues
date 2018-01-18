import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

const styles = {
    info: {
      color: '#212121',
      fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: 11.9,
      lineHeight: 1.57142857
    },
    h2: {
      color: '#212121',
      fontSize: '30px',
      letterSpacing: 0,
      fontFamily: '"Roboto",sans-serif',
      fontWeight: 300,
      lineHeight: 1.4
    },
    typeItem: {
      paddingLeft: '0!important'
    },
    tableRoot: {
      width: '100%'
    },
    theadRowHead: {
      height: 30
    },
    theadRowHeadDelivered: {
      height: 30,
      backgroundColor: '#DCEDC8'
    },
    theadRoot: {
      backgroundColor: '#a2a2a2',
      letterSpacing: '0.06em',
      fontSize: 14,
      lineHeight: 1.57142857,
      color: 'white'
    },
    gridContainer: {
      paddingTop: 30
    },
    gridItem: {
      backgroundColor: '#212528',
      color: 'white',
      width: 300,
      textAlign: 'right',
      paddingRight: 10
    },
    gridCell: {
      border: '1px solid rgba(0, 0, 0, 0.075)',
      whiteSpace: 'normal',
      fontSize: 11,
      padding: '0 10px 0 10px'
    },
    gridCellHead: {
      border: '1px solid #eeeeee',
      padding: '0 10px 0 10px'
    },
    h1: {
      fontSize: 16,
      lineHeight: '55px',
    },
    h3: {
     fontSize: 20,
     marginBottom: 10,
     fontWeight: 300
    }
  }

  function ViewProducts(props) {
    const classes = props.classes
    const sum = props.sum ? props.sum: 0
    return (
      <div>
        <Table classes={{
            root: classes.tableRoot
          }}>
          <TableHead classes={{
            root: classes.theadRoot
          }}>
            <TableRow classes={{
              head: classes.theadRowHead
            }}>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>#</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Номенклатура</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Артикул</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Примечание</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Характеристика</TableCell>
              <TableCell numeric classes={{
                root: classes.gridCellHead
              }}>Кол-во</TableCell>
              <TableCell numeric classes={{
                root: classes.gridCellHead
              }}>Цена</TableCell>
              <TableCell numeric classes={{
                root: classes.gridCellHead
              }}>Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((n, i) => {
              return (
                <TableRow key={n.id} hover classes={{
                  root: n.delivered ? classes.theadRowHeadDelivered : classes.theadRowHead,
                }}>
                  <TableCell padding='dense' classes={{
                    root: classes.gridCell
                  }}>
                    {i + 1}
                  </TableCell>
                  <TableCell classes={{
                    root: classes.gridCell
                  }} padding='dense'>
                    {n.productName}
                  </TableCell>
                  <TableCell classes={{
                    root: classes.gridCell
                  }} padding='dense'>
                    {n.article}
                  </TableCell>
                  <TableCell padding='dense' classes={{
                    root: classes.gridCell
                  }}>
                    {n.comment}
                  </TableCell>
                  <TableCell padding='dense' classes={{
                    root: classes.gridCell
                  }}>
                    {n.variant}
                  </TableCell>
                  <TableCell numeric classes={{
                    root: classes.gridCell
                  }}>
                    {n.count} {n.unit}
                  </TableCell>
                  <TableCell numeric classes={{
                    root: classes.gridCell
                  }}>
                    {n.price} руб.
                  </TableCell>
                  <TableCell numeric classes={{
                    root: classes.gridCell
                  }}>
                    {n.price * n.count} руб.
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div style={{textAlign: 'right',paddingRight:10}}> 
          <h5 style={{fontSize: 20, paddingTop: 15}}>Итого</h5>
          <h1 className={classes.h1}>{sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')} руб.</h1>
        </div>
      </div>
    )
  }
  ViewProducts.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    sum: PropTypes.number
  }
  
  export default withStyles(styles)(ViewProducts)