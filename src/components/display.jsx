import { List } from '@material-ui/core';
import React, { Component } from 'react';

class Display extends Component {

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
                    data.map((operation, index) => (
                      index === data.length - 1 ? 
                      <div style={{color: "red"}}
                           key={++id}>
                        {operation}
                      </div> : 
                      <div key={++id}>
                      {operation}
                    </div>
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