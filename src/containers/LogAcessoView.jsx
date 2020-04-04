import React,{Component} from 'react';
import { connect } from 'react-redux';

class LogAcessoView extends Component {

    render(){
        return (<div>LOG ACESSO</div>);
    }
}


const mapStateToProps = state => {
    return {
        user: state.authenticationReducer.user,
        authenticated: state.authenticationReducer.authenticated,
        system: state.sistemasAdminReducer.activeSystem
    }
};

export default connect(mapStateToProps, null)(LogAcessoView);