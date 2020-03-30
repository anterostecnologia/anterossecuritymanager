import React, { Component, Suspense, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import anterosWindowSize from "./AnterosWindowSize";
import AnterosFullscreen from './AnterosFullScreen';
import AnterosNavigation from './AnterosNavigation';
import AnterosNavBar from './AnterosNavBar';
import AnterosAdminLoader from "./AnterosAdminLoader";
import routes from "../routes";
import { actionTypes } from "./AnterosAdminReducer";
import { AnterosSecurityRoute } from 'anteros-react-security';
import { boundClass, processErrorMessage } from 'anteros-react-core';
import AnterosNavLeft from './AnterosNavLeft';
import AnterosNavRight from './AnterosNavRight';
import { AnterosButton } from 'anteros-react-buttons';
import { AnterosLookupCombobox } from 'anteros-react-editors';
import { AnterosRemoteDatasource, dataSourceConstants, DATASOURCE_EVENTS, dataSourceEvents } from 'anteros-react-datasource';
import { actions, SET_DATASOURCE_SISTEMAS_ADMIN } from '../redux/modules/sistemasAdmin';
import { Resources, EndPoints } from '../service/Resources';
import AnterosReactComponent from '../components/AnterosReactComponent';



@boundClass
class AnterosAdminLayout extends AnterosReactComponent {

    constructor(props) {
        super(props);
        this.configurarDatasource();
    }

    configurarDatasource() {
        if (this.props.dataSource) {
            this.dataSource = this.props.dataSource;
            if (this.dataSource.getState() !== dataSourceConstants.DS_BROWSE) {
                this.dataSource.cancel();
            }
        } else {
            this.dataSource = new AnterosRemoteDatasource();
            this.dataSource.setAjaxPostConfigHandler(entity => {
                return EndPoints.POST(Resources.SISTEMA, entity, this.props.user);
            });
            this.dataSource.setValidatePostResponse(response => {
                return response.data !== undefined;
            });
            this.dataSource.setAjaxDeleteConfigHandler(entity => {
                return EndPoints.DELETE(Resources.SISTEMA, entity, this.getUser());
            });
            this.dataSource.setValidateDeleteResponse(response => {
                return response.data !== undefined;
            });
            let params = {};
            this.dataSource.setAjaxPageConfigHandler(page => {
                return params;
            });
        }

        this.registerDatasourceEvent(this.dataSource,
            DATASOURCE_EVENTS,
            this.onDatasourceEvent
        );
    }

    onDatasourceEvent(event, error) {
        if (
            event === dataSourceEvents.AFTER_OPEN ||
            event === dataSourceEvents.AFTER_GOTO_PAGE ||
            event === dataSourceEvents.ON_ERROR
        ) {
            this.props.setDatasource(this.dataSource, this.dataSource.getCurrentRecord());
        }

        if (event === dataSourceEvents.AFTER_SCROLL) {
            this.props.setDatasource(this.dataSource, this.dataSource.getCurrentRecord());
        }

        if (event === dataSourceEvents.AFTER_INSERT) {
        }
        if (event === dataSourceEvents.ON_ERROR) {
            this.setState({
                ...this.state,
                alertIsOpen: true,
                alertMessage: processErrorMessage(error)
            });
        }
    }

    fullScreenExitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    UNSAFE_componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            if (this.props.onUNSAFE_componentWillMount) {
                this.props.onUNSAFE_componentWillMount();
            }
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            if (this.props.onUNSAFE_componentWillMount) {
                this.props.onUNSAFE_componentWillMount();
            }
        }
    }

    componentDidMount() {
        if (this.props.authenticated) {
            if (!this.dataSource.isOpen()) {
                this.dataSource.open(EndPoints.FIND_ALL(
                    Resources.SISTEMA,
                    0,
                    99999,
                    "", this.props.user, ''));
            }
        }
    }

    componentDidUpdate() {
        if (this.props.authenticated) {
            if (!this.dataSource.isOpen()) {
                this.dataSource.open(EndPoints.FIND_ALL(
                    Resources.SISTEMA,
                    0,
                    99999,
                    "", this.props.user, ''));
            }
        }
    }

    onChangeSystem(data){
        this.props.setDatasource(this.dataSource, this.dataSource.getCurrentRecord());    
    }

    render() {
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);
        let { authenticated } = this.props;
        const menu = routes.map((route, index) => {
            let Component = Route;
            if (route.isSecurity) {
                Component = AnterosSecurityRoute;
            }
            return (route.component) ? (
                <Component
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    allowAccess={authenticated}
                    component={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        let mainClass = ['pcoded-wrapper'];
        if (this.props.layout === 'horizontal' && this.props.subLayout === 'horizontal-2') {
            mainClass = [...mainClass, 'container'];
        }
        return (
            <Fragment>
                <AnterosFullscreen enabled={this.props.isFullScreen}>
                    <AnterosNavigation />
                    <AnterosNavBar>
                        <AnterosNavLeft />
                        <AnterosNavRight rtlLayout={this.props.rtlLayout}>
                            <AnterosLookupCombobox width="300px"
                                value={!this.dataSource.isEmpty()?this.dataSource.fieldByName('id'):''}
                                onChange={this.onChangeSystem}
                                clearable={false}
                                directInput={false}
                                lookupDataSource={this.dataSource}                            
                                lookupDataFieldId="id"
                                lookupDataFieldText="name" />
                            <AnterosButton
                                medium
                                circle
                                icon="fal fa-headset"
                                iconSize="24px"
                                hint="Suporte técnico"
                                onButtonClick={this.connectSupport}
                                color="white"
                                hintPosition="bottom"
                            />
                            <AnterosButton
                                medium
                                circle
                                icon="fal fa-expand"
                                iconSize="24px"
                                hint="Tela cheia"
                                onButtonClick={this.toggleScreenFull}
                                color="white"
                                hintPosition="bottom"
                            />
                        </AnterosNavRight>
                    </AnterosNavBar>
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className={mainClass.join(' ')}>
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<AnterosAdminLoader />}>
                                                <Switch>
                                                    {menu}
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnterosFullscreen>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        layout: state.layout,
        subLayout: state.subLayout,
        user: state.authenticationReducer.user,
        authenticating: state.authenticationReducer.authenticating,
        authenticated: state.authenticationReducer.authenticated,
        dataSource: state.sistemasAdminReducer.dataSource,
        system: state.sistemasAdminReducer.activeSystem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
        onUNSAFE_componentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
        setDatasource: (dataSource, system) => dispatch({ type: SET_DATASOURCE_SISTEMAS_ADMIN, payload: { dataSource, system } })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(anterosWindowSize(AnterosAdminLayout));
