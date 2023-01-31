import { List, ListItemText } from '@material-ui/core';
import React, { Component } from 'react';

class Display extends Component {
    constructor(props){
        super(props);
      }

      render() {
        const {
          data,
          currentLine
        } = this.props;

        let id = 0;

        return (
            <div>
              <List style={{fontSize : 30}}>
                {
                    data.map((operation) => (
                      <div key={id++}>{operation}</div>
                    )
                  )
                }
                <br></br>
                {currentLine}
              </List>
            </div>
        );
      }
}

export default Display;