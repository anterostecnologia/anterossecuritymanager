import React, { Component } from 'react';
import { boundClass } from 'anteros-react-core';
import {AnterosVerticalTimeline, AnterosVerticalTimelineElement} from 'anteros-react-calendar';
import { AnterosButton} from 'anteros-react-buttons';
import { AnterosRemoteDatasource} from 'anteros-react-datasource';
import axios from 'axios';
export function getJSessionId() {
  var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
  if (jsId !== null) {
    if (jsId instanceof Array) jsId = jsId[0].substring(11);
    else jsId = jsId.substring(11);
  }
  return jsId;
}



@boundClass
class HomeView extends Component {
  constructor(props, context) {
    super(props);
  }


  render() {
    return (
      <div style={{backgroundColor:'#f9f9f9',padding:30, height:"100 vh"}}>
          
    </div>);
  }
}

export default HomeView;
