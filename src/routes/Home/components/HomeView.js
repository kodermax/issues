import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List'
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight'
import PeopleIcon from 'material-ui-icons/People'
import SecurityIcon from 'material-ui-icons/Security'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar'

const styles = theme => ({
    expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: { flex: '1 1 auto' },
    card: {
        width: 305,
        minHeight: 300
    },
    cardRoot: {
        "-webkitBoxShadow": "0 6px 25px 0 rgba(38, 50, 56, 0.2)",
        "boxShadow": "0 6px 25px 0 rgba(38, 50, 56, 0.2)"
    },
    cardContentRoot: {
        paddingBottom: 0
    },
    cardActionsRoot: {
        height: 25
    },
    icon: {
        textAlign: 'center',
        color: '#2196F3'
    },
    iconRoot: {
        width: 35,
        height: 35,
        cursor: 'pointer'
    },
    title: {
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: 400,
        color: '#2a3134',
        lineHeight: 1.5
    },
    root: {
        marginTop: '20px'
    },
    row: {
        display: 'flex', justifyContent: 'center'
    },
    row2: {
        display: 'flex', justifyContent: 'left', marginTop: 16
    },
    column: {
        marginRight: 30
    },
    statTitle: {
        font: '500 13px Roboto,Helvetica Neue,sans-serif'
    },
    statText: {
        fontSize: 11.9,
        color: 'rgba(0,0,0,.54)!important'
    }
    
})

class HomeView extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props)

        this.onPurchaseLink = this.handleLink.bind(this, '/requests/purchase/list')
        this.onNomenclatureLink = this.handleLink.bind(this, '/requests/nomenclature/list')
        this.onRecruitmentLink = this.handleLink.bind(this, '/requests/recruitment/list')
        this.onAcLink = this.handleLink.bind(this, '/requests/accesscontrol/all/list')
        this.onAutoLink = this.handleLink.bind(this, '/requests/auto/all/list')
        this.onAcWealthLink = this.handleLink.bind(this, '/requests/accesscontrol/wealth/list')
        this.onAcAutoLink = this.handleLink.bind(this, '/requests/accesscontrol/auto/list')
        this.onAcGuestLink = this.handleLink.bind(this, '/requests/accesscontrol/guest/list')
        this.onAcKeysLink = this.handleLink.bind(this, '/requests/accesscontrol/keys/list')
        this.onAcStaffLink = this.handleLink.bind(this, '/requests/accesscontrol/staff/list')
        this.onAcOtherStaffLink = this.handleLink.bind(this, '/requests/accesscontrol/otherstaff/list')
        this.onAcHolidaysLink = this.handleLink.bind(this, '/requests/accesscontrol/holidays/list')
        this.onAutoStaffLink = this.handleLink.bind(this, '/requests/auto/staff/list')
        this.onAutoShippingLink = this.handleLink.bind(this, '/requests/auto/shipping/list')
        this.onAutoDeliveryLink = this.handleLink.bind(this, '/requests/auto/delivery/list')
        this.onAutoDocsLink = this.handleLink.bind(this, '/requests/auto/docs/list')
        this.state = { expanded: false }
    }
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    };
    handleLink = (link) => {
        this.context.router.push(link)
    }
    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item>
                        <Card className={classes.card} classes={{
                            root: classes.cardRoot
                        }}>
                            <CardContent>
                                <Typography type="headline" className={classes.icon} component="h2">
                                    <ShoppingCartIcon classes={{
                                        root: classes.iconRoot
                                    }} 
                                    />
                                </Typography>
                                <Typography type="body1" className={classes.title}>
                                    Отдел снабжения
                                </Typography>
                                <List>
                                    <ListItem dense button onTouchTap={this.onPurchaseLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Заявка на закупку" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card} classes={{
                            root: classes.cardRoot
                        }}>
                            <CardContent classes={{
                                root: this.props.classes.cardContentRoot
                            }}>
                                <Typography type="headline" className={classes.icon} component="h2">
                                    <SecurityIcon onTouchTap={this.onAcLink} classes={{
                                        root: this.props.classes.iconRoot
                                    }} 
                                    />
                                </Typography>
                                <Typography type="body1" className={classes.title}>
                                    Пропускной режим
                                </Typography>
                                <List>
                                    <ListItem dense disableGutters button onTouchTap={this.onAcStaffLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Пропуск для сотрудников" />
                                    </ListItem>
                                    <ListItem dense disableGutters button onTouchTap={this.onAcAutoLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Допуск транспорта" secondary="поставщиков, покупателей" />
                                    </ListItem>
                                    <ListItem dense disableGutters button onTouchTap={this.onAcGuestLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                            <ListItemText primary="Допуск посетителей (гостей)" />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions disableActionSpacing classes={{
                                root: classes.cardActionsRoot
                            }}>
                            <div className={classes.flexGrow} />
                                <Button
                                    className={classes.expand}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Показать еще"
                                >Еще</Button>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent classes={{
                                    root: classes.cardContentRoot
                                }}>
                                <List>
                                    <ListItem dense disableGutters button onTouchTap={this.onAcWealthLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Вынос/вывоз материальных ценностей" />
                                    </ListItem>
                                    <ListItem dense disableGutters button onTouchTap={this.onAcKeysLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Актуализация списка лиц," secondary="допущенных к получению ключей от помещений" />
                                    </ListItem>
                                    <ListItem dense disableGutters  button onTouchTap={this.onAcOtherStaffLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Пропуск для работников сторонних организаций" />
                                    </ListItem>
                                    <ListItem disableGutters dense button onTouchTap={this.onAcHolidaysLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Пропуск в нерабочее время" secondary="выходные/праздничные дни" />
                                    </ListItem>
                                </List>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card} classes={{
                            root: classes.cardRoot
                        }}>
                            <CardContent>
                                <Typography type="headline" className={classes.icon} component="h2">
                                    <DirectionsCarIcon onTouchTap={this.onAutoLink} classes={{
                                        root: this.props.classes.iconRoot
                                    }} 
                                    />
                                </Typography>
                                <Typography type="body1" className={classes.title}>
                                    Транспортный отдел
                                </Typography>
                                <List>
                                    <ListItem dense button onTouchTap={this.onAutoStaffLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Доставка сотрудников" />
                                    </ListItem>
                                    <ListItem dense button onTouchTap={this.onAutoShippingLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Отправка ТМЦ со склада" secondary="Перемещение ТМЦ" />
                                    </ListItem>
                                    <ListItem dense button onTouchTap={this.onAutoDeliveryLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Доставка ТМЦ на склад" />
                                    </ListItem>
                                    <ListItem dense button onTouchTap={this.onAutoDocsLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Корреспонденция" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card} classes={{
                            root: classes.cardRoot
                        }}>
                            <CardContent>
                                <Typography type="headline" className={classes.icon} component="h2">
                                    <PeopleIcon classes={{
                                        root: this.props.classes.iconRoot
                                    }} 
                                    />
                                </Typography>
                                <Typography type="body1" className={classes.title}>
                                    HR
                                </Typography>
                                <List>
                                    <ListItem dense button onTouchTap={this.onRecruitmentLink}>
                                        <ListItemIcon>
                                            <KeyboardArrowRightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Подбор специалиста" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

HomeView.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { name: 'HomeView'})(HomeView)
