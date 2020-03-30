import React, { Component } from 'react';
import { AnterosMasonry } from 'anteros-react-masonry';
import { AnterosPanel } from 'anteros-react-containers';
import { boundClass } from 'anteros-react-core';
import { AnterosIcon } from 'anteros-react-image';
import { AnterosText } from 'anteros-react-label';
import { AnterosFullBackground } from 'anteros-react-admin';



@boundClass
class MenuViewItem extends React.Component {
    constructor(props) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onItemClick(event) {
        this.props.onSelectedItem(this.props.record);
    }

    onDoubleClick(event) {
        this.props.onSelectedItem(this.props.record);
        this.props.onButtonClick(event, this.btnEdit);
    }


    render() {
        return (
            <div onDoubleClick={this.onDoubleClick}>
                <AnterosPanel
                    className={
                        this.props.selected
                            ? 'menu-griditem-selected'
                            : 'menu-griditem'
                    }
                    style={{
                        alignItems: "center",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <div style={{ display: "grid" }}>
                        <AnterosIcon color="#3EA7F1" icon={this.props.icon} size="96px" style={{ fontWeight: "200" }} />
                        <AnterosText text={this.props.title} />
                    </div>
                </AnterosPanel>
            </div>
        );
    }
}


export default class MenuView extends Component {

    render() {

        return (
            // <div
            //     style={{
            //         width: '100%',
            //         height: '800px',
            //         border: '4px solid red',
            //         backgroundRepeat: 'no-repeat',
            //         backgroundSize: 'cover',
            //         backgroundPosition: 'center',
            //         backgroundImage: 'url('+require('../assets/img/fundo.png')+')'
            //     }}
            // >
                <AnterosMasonry
                    className={'versatil-grid-layout'}
                    elementType={'ul'}
                    id={'masonryMenu'}
                    style={{ padding: "100px" }}
                    options={{
                        transitionDuration: 0,
                        gutter: 20,
                        horizontalOrder: false,
                        isOriginLeft: true
                    }}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >

                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Sistemas"
                        icon="fal fa-window"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Recursos"
                        icon="fal fa-code"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Ações do usuário"
                        icon="fal fa-cog"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Grupos"
                        icon="fal fa-users"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Usuários"
                        icon="fal fa-user"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Perfis"
                        icon="fal fa-id-card"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Terminal acesso"
                        icon="fal fa-laptop-code"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Horário acesso"
                        icon="fal fa-clock"
                        onButtonClick={this.onButtonClick}
                    />

                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        title="Log acesso"
                        icon="fal fa-file-alt"
                        onButtonClick={this.onButtonClick}
                    />
                    <MenuViewItem
                        onSelectedItem={this.onSelectedItem}
                        dispatch={this.props.dispatch}
                        history={this.props.history}
                        icon="fal fa-ballot-check"
                        title="Auditoria"
                        onButtonClick={this.onButtonClick}
                    />
                </AnterosMasonry>
            // </div>
        );
    }
}


