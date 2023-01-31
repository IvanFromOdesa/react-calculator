import React, { Component } from 'react'
import store from '../buttons';
import CalcButton from './calcButton'
import Display from './display';

class Buttons extends Component {
    constructor() {
        super();
        this.state = {

            data: [
                
            ],

            line: ""
        };
    }

    handleClick = e => {
        const value = e.target.innerText;
        const {
            line,
            data
        } = this.state;
        this.doCalculate(value, line, data);
    }

    doCalculate(value, line, data) {
        if(!line) {
            switch(value) {
                case '+':
                case '-':
                case '/':
                case '*':
                case '=':
                case 'C':
                    // nothing
                    alert("First enter a number!");
                    break;
                default:
                    this.appendLine(value);
            }
        }
        else {
            switch(value) {
                case 'C':
                    this.clearLine();
                    break;
                case '=':
                    if(this.checkSymbol(line)) {
                        // nothing
                        alert("Enter a number after arythmetic operation!");
                    }
                    // valid e.g. 2+2=
                    else if(
                        line.includes("+") ||
                        line.includes("-") ||
                        line.includes("/") ||
                        line.includes("*")
                        ) {
                            let result = this.evaluateExpression(line);
                            line = line + value + result;
                            this.appendHistory(data, line);
                            this.setResultLine(result.toString());
                        }
                    else {
                        alert("Enter either a number or arythmetic operation!");
                    }
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                    // to exclude 2++, 343-/ etc.
                    if(this.checkSymbol(line)) {
                        // nothing
                        alert("Enter a number!");
                    }
                    // 2+2* gives 4, 4*...
                    else if(
                        line.includes("+") ||
                        line.includes("-") ||
                        line.includes("/") ||
                        line.includes("*")
                    ) {
                        let result = this.evaluateExpression(line);
                        line = line + "=" + result;
                        this.appendHistory(data, line);
                        this.setResultLine(result.toString() + value);
                    }
                    else {
                        this.appendLine(value);
                    }
                    break;
                default:
                    this.appendLine(value);
                
            }
        }
    }

    clearLine() {
        this.setState({
            line: ""
        })
    }

    setResultLine(result) {
        this.setState({
            line: result
        })
    }

    checkSymbol(line) {
        let lastSymbol = line.charAt(line.length - 1);
        return lastSymbol == '+' || 
               lastSymbol == '-' || 
               lastSymbol == '/' || 
               lastSymbol == '*' ;
    }

    evaluateExpression(fn) {
        let result =  new Function('return ' + fn)();
        if(result == "Infinity") {
            return "Error! Division by zero!"
        }
        return result.toFixed(2);
    }

    appendLine(value) {
        this.setState({
            line: this.state.line + value
        });
    }

    appendHistory(data, value) {
        const newData = [...data];
        newData.push(value);
        this.setState({
            data: newData
        });
    }

    render() {
        const {
            line,
            data
        } = this.state;

        return (
            <div>
                {store.buttons.map(button => 
                    <CalcButton key={button.id}
                                num={button.num}
                                value={button.value}
                                clickFunc={this.handleClick}
                    />)}
                <Display currentLine = {line} data={data}/>
            </div>
        );
    }
}

export default Buttons;