import {Component} from 'react';

export default class AnterosReactComponent extends Component {

    constructor(props){
        super(props);
        this.datasourceEvents = [];
    }

    registerDatasourceEvent(ds, event, fn){
        ds.addEventListener(event,fn);
        this.datasourceEvents.push({ds,event,fn});
    }

    componentWillUnmount(){
        this.datasourceEvents.map(record => {
            record.ds.removeEventListener(record.event, record.fn);
            return null;
        });
    }

    getFoto(value, defaultImg) {
        if (value) {
            if (this.isBase64(value)) {
                if (this.isUrl(atob(value))) {
                    return atob(value)
                } else {
                    return 'data:image;base64,' + value;
                }
            } else {
                return value
            }
        }
        else {
            return defaultImg
        }
    }

    isBase64(str) {
        try {
          return btoa(atob(str)) === str;
        } catch (err) {
          return false;
        }
    }

    isUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    render(){
        return null;
    }
}