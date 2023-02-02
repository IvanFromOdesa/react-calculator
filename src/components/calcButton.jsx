import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
    inlineElements: {
        display: 'inline-block',
        fontSize : 30
    }
});

class CalcButton extends Component {

    render() {
        const {
            num,
            value,
            clickFunc
        } = this.props;

        return (
            <Button
                className={this.props.classes.inlineElements}
                onClick={clickFunc}
                color={this.defineButtonStyle(num)}
                variant="contained"
            >
                {value}
            </Button>
        );
    }
    
    defineButtonStyle(num) {
        return num === true ? "primary" : "secondary";
    };
}

export default withStyles(styles)(CalcButton);