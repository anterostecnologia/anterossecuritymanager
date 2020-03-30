import React, { Component } from 'react';
import { AnterosLinearProgressBar } from 'anteros-react-misc';
import {
  AnterosFullBackground,
  AnterosContainer,
  AnterosLoginHeader,
  AnterosLoginFooter,
  AnterosLoginForm,
  AnterosToolbar,
  AnterosToolbarGroup
} from 'anteros-react-containers';
import { AnterosRow, AnterosCol } from 'anteros-react-layout';
import {
  AnterosCard,
  AnterosForm,
  AnterosFormGroup,
  AnterosCarousel
} from 'anteros-react-containers';
import { AnterosImage } from 'anteros-react-image';
import {
  AnterosPassword,
  AnterosEdit,
  AnterosCheckbox
} from 'anteros-react-editors';
import { AnterosLabel, AnterosText } from 'anteros-react-label';
import { AnterosButton } from 'anteros-react-buttons';

const loginStyle = {
  boxShadow:
    '0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12),0 3px 5px -1px rgba(0,0,0,0.3)',
  borderRadius: '8px',
  background: 'white',
  border: '1px solid rgba(0,0,0,.225)'
};

const botaoEntrarStyle = {
  marginTop: '42px',
  color: 'white',
  marginBottom: '20px',
  background: 'linear-gradient(#32afda,#66c8a1)'
};

const slides = [
  {
    image: require('../assets/img/slide1.png'),
    title: 'Comentários',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam similique architecto blanditiis sapiente rem necessitatibus vero amet, accusantium quos vel ex. Ipsum harum quia, earum magnam. Reprehenderit assumenda, voluptas totam.'
  },
  {
    image: require('../assets/img/slide2.png'),
    title: 'Comentários',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam similique architecto blanditiis sapiente rem necessitatibus vero amet, accusantium quos vel ex. Ipsum harum quia, earum magnam. Reprehenderit assumenda, voluptas totam.'
  },
  {
    image: require('../assets/img/slide3.png'),
    title: 'Comentários',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam similique architecto blanditiis sapiente rem necessitatibus vero amet, accusantium quos vel ex. Ipsum harum quia, earum magnam. Reprehenderit assumenda, voluptas totam.'
  }
];

export default class AnterosLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const { loading } = this.state;
    return (
      // Container com o fundo
      <AnterosFullBackground color="#1B3DEC">
        {loading && <AnterosLinearProgressBar />}

        {/* Cabeçalho do login */}
        <AnterosLoginHeader>
          <AnterosContainer>
            <AnterosToolbar>
              <AnterosToolbarGroup justifyContent="start">
                <AnterosImage
                  src={require('../assets/img/logo-versatilcondm.png')}
                />
              </AnterosToolbarGroup>
            </AnterosToolbar>
          </AnterosContainer>
        </AnterosLoginHeader>

        {/* Formulário */}
        <AnterosLoginForm>
          <AnterosContainer>
            <AnterosRow>
              <AnterosCol style={loginStyle} small={7} medium={7} large={8}>
                <AnterosText
                  style={{ padding: '40px' }}
                  h3
                  center
                  text="LOGIN"
                />
                <AnterosForm>
                  <AnterosFormGroup row={false}>
                    <AnterosLabel caption="Empresa" small={2} />
                    <AnterosEdit
                      small={12}
                      id="empresa"
                      onChange={this.onChangeUser}
                      value={this.state.userName}
                      icon="fal fa-building"
                    />
                  </AnterosFormGroup>
                  <AnterosFormGroup row={false}>
                    <AnterosLabel caption="Usuário" small={2} />
                    <AnterosEdit
                      small={12}
                      id="userName"
                      onChange={this.onChangeUser}
                      value={this.state.userName}
                      icon="fa fa-user-circle"
                    />
                  </AnterosFormGroup>
                  <AnterosFormGroup row={false}>
                    <AnterosLabel caption="Senha" small={2} />
                    <AnterosPassword
                      small={12}
                      id="password"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      required
                    />
                  </AnterosFormGroup>
                  <AnterosFormGroup row={false}>
                    <AnterosLabel caption="" small={2} />
                    <AnterosCheckbox
                      small={6}
                      value="Lembre-me."
                      valueChecked={true}
                      valueUnchecked={false}
                    />
                  </AnterosFormGroup>
                </AnterosForm>
                <AnterosButton
                  block
                  large
                  style={botaoEntrarStyle}
                  caption="ENTRAR"
                />
              </AnterosCol>

              {/* Sliders de divulgação */}
              <AnterosCol small={5} medium={5} large={4}>
                <AnterosCarousel
                  autoplay={true}
                  renderCenterLeftControls={null}
                  renderCenterRightControls={null}
                >
                  {slides.map(slide => {
                    return (
                      <AnterosCard
                        style={{ borderRadius: '8px' }}
                        showHeader={false}
                        image={slide.image}
                        imageOverlay
                        imageStyle={{ borderRadius: '8px' }}
                        title={slide.title}
                        cardInverse
                        text={slide.text}
                      />
                    );
                  })}
                </AnterosCarousel>
              </AnterosCol>
            </AnterosRow>
          </AnterosContainer>
        </AnterosLoginForm>

        {/* Rodapé do login */}
        <AnterosLoginFooter />
      </AnterosFullBackground>
    );
  }
}
