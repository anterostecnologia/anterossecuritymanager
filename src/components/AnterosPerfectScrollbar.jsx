import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';

const handlerNameByEvent = {
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd',
};
Object.freeze(handlerNameByEvent);


class AnterosPerfectScrollBar extends Component {
  constructor(props) {
    super(props);

    this.handleRef = this.handleRef.bind(this);
    this._updateEventHook = this._updateEventHook.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
    this._handlerByEvent = {};
  }

  componentDidMount() {
    this._ps = new PerfectScrollbar(this._container, this.props.options || this.props.option);
    this._updateEventHook();
  }

  componentDidUpdate(prevProps) {
    this._updateEventHook(prevProps);
    this._ps.update();
  }

  componentWillUnmount() {
    Object.keys(this._handlerByEvent).forEach((key) => {
      const value = this._handlerByEvent[key];

      if (value) {
        this._container.removeEventListener(key, value, false);
      }
    });
    this._handlerByEvent = {};
    this._ps.destroy();
    this._ps = null;
  }

  _updateEventHook(prevProps = {}) {
    let _this = this;
    Object.keys(handlerNameByEvent).forEach((key) => {
      const callback = _this.props[handlerNameByEvent[key]];
      const prevCallback = prevProps[handlerNameByEvent[key]];
      if (callback !== prevCallback) {
        if (prevCallback) {
          const prevHandler = _this._handlerByEvent[key];
          _this._container.removeEventListener(key, prevHandler, false);
          _this._handlerByEvent[key] = null;
        }
        if (callback) {
          const handler = () => callback(_this._container);
          _this._container.addEventListener(key, handler, false);
          _this._handlerByEvent[key] = handler;
        }
      }
    });
  }

  updateScroll() {
    this._ps.update();
  }

  handleRef(ref) {
    this._container = ref;
    this.props.containerRef(ref);
  }

  render() {
    const {
      children, component, className, style,
    } = this.props;
    const Comp = component;

    return (
      <Comp style={style} className={`scrollbar-container ${className}`} ref={this.handleRef}>
        {children}
      </Comp>
    );
  }
}

AnterosPerfectScrollBar.defaultProps = {
  className: '',
  style: undefined,
  option: undefined,
  options: undefined,
  containerRef: () => { },
  onScrollY: undefined,
  onScrollX: undefined,
  onScrollUp: undefined,
  onScrollDown: undefined,
  onScrollLeft: undefined,
  onScrollRight: undefined,
  onYReachStart: undefined,
  onYReachEnd: undefined,
  onXReachStart: undefined,
  onXReachEnd: undefined,
  component: 'div',
};

AnterosPerfectScrollBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  option: PropTypes.object,
  options: PropTypes.object,
  containerRef: PropTypes.func,
  onScrollY: PropTypes.func,
  onScrollX: PropTypes.func,
  onScrollUp: PropTypes.func,
  onScrollDown: PropTypes.func,
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  onYReachStart: PropTypes.func,
  onYReachEnd: PropTypes.func,
  onXReachStart: PropTypes.func,
  onXReachEnd: PropTypes.func,
  component: PropTypes.string,
};

export default AnterosPerfectScrollBar;