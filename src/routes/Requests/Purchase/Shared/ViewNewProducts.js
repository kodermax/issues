import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

const styles = {
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
    }
  }

  function ViewNewProducts(props) {
    const classes = props.classes
    return (
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
              }}>Ед. измерения</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Внутренняя сертификация</TableCell>
              <TableCell classes={{
                root: classes.gridCellHead
              }}>Примечание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((n, i) => {
              return (
                <TableRow key={n.id} hover classes={{
                  root: n.delivered ? classes.theadRowHeadDelivered : classes.theadRowHead,
                }}>
                  <TableCell padding='none' classes={{
                    root: classes.gridCell
                  }}>
                    {i + 1}
                  </TableCell>
                  <TableCell classes={{
                    root: classes.gridCell
                  }} padding='none'>
                    {n.title}
                  </TableCell>
                  <TableCell classes={{
                    root: classes.gridCell
                  }} padding='none'>
                    {n.unit}
                  </TableCell>
                  <TableCell padding='none' classes={{
                    root: classes.gridCell
                  }}>
                    {n.certification? "Да": "Нет"}
                  </TableCell>
                  <TableCell padding='none' classes={{
                    root: classes.gridCell
                  }}>
                    {n.comment}
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>
        </Table>
    )
  }
  ViewNewProducts.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
  }
  
  export default withStyles(styles)(ViewNewProducts)