import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import PurchaseLayout from './Shared/Layout'
import { fetchSearch } from './SearchModule'

const styles = {
   tableRoot: {
    width: '100%'
  },
  theadRowHead: {
    height: 36
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
  h3: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 300
  }
}

class SearchComponent extends Component {
    constructor(props: Props) {
        super(props)
        this.state = {
            search: []
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.search) {
            
            this.setState({
                search: nextProps.search
            })
        }
    }
    handleEnter = (e,  query) => {
      if (e.key === 'Enter') {
         this.props.fetchSearch(e.target.value)
      }
    }
    render() {
        const classes = this.props.classes
        return (
            <PurchaseLayout>
                <TextField id="search" label="Поиск по заявкам" InputProps={{ placeholder: 'Введите любой текст' }}
                    fullWidth margin="normal" onKeyPress={this.handleEnter.bind(this)} />
                    
                    {this.state.search && this.state.search.length > 0 ? this.state.search.map(item => {
                        return (
                            <div key={item.id}>
                            <h2 className={classes.h2}>№ {item.id} {item.title}</h2>
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
                                }}>Сумма</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.products.map((n, i) => {
                                return (
                                    <TableRow key={n.id} hover classes={{
                                    root: classes.theadRowHead
                                    }}>
                                    <TableCell padding='none' classes={{
                                        root: classes.gridCell
                                    }}>
                                        {++i}
                                    </TableCell>
                                    <TableCell classes={{
                                        root: classes.gridCell
                                    }} padding='none'>
                                        {n.productName}
                                    </TableCell>
                                    <TableCell classes={{
                                        root: classes.gridCell
                                    }} padding='none'>
                                        {n.article}
                                    </TableCell>
                                    <TableCell padding='none' classes={{
                                        root: classes.gridCell
                                    }}>
                                        {n.comment}
                                    </TableCell>
                                    <TableCell padding='none' classes={{
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
                                        {n.price * n.count}
                                    </TableCell>
                                    </TableRow>
                                )
                                })}
                                <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell numeric> 
                                        <h5 style={{fontSize: 20, paddingTop: 15}}>Итого</h5>
                                        <h1 className={classes.h1}>{item.sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')} руб.</h1>
                                </TableCell>
                                </TableRow>
                            </TableBody>
                            </Table></div>)
                        
                    })
                         : <div>Ничего не найдено</div> }
            </PurchaseLayout>
        )
    }
}

SearchComponent.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapActionCreators = {
  fetchSearch
}

const mapStateToProps = (state) => ({
  search: state.search.data
})
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(SearchComponent))