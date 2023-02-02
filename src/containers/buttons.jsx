import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../buttons';
import CalcButton from '../components/calcButton'
import Display from '../components/display';
import exprsActions from "../actions/actions";

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
                    if(this.isLastSymbolAnOperation(line)) {
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
                    // substitute operation with another one
                    if(this.isLastSymbolAnOperation(line)) {
                        this.substituteLine(value);
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

    isLastSymbolAnOperation(line) {
        let lastSymbol = line.charAt(line.length - 1);
        return lastSymbol == '+' || 
               lastSymbol == '-' || 
               lastSymbol == '/' || 
               lastSymbol == '*' ;
    }

    evaluateExpression(fn) {
        let result = 0;
        try {
            result =  new Function('return ' + fn)();
            if(result == "Infinity" || result == "-Infinity") {
                return "Error! Division by zero!"
            }
            return result.toFixed(2);
        } catch (error) {
            // If trying to do math with string "Error!.."
            alert("That was not a number! Should have cleared the line.");
        }
        return "";
    }

    substituteLine(value) {
        this.setState({
            line: this.state.line.slice(0, -1) + value
        });
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

    componentDidUpdate(prevProps, prevState) {
        const {
            expressions
        } = this.props;

        // Expressions from BE
        if(expressions.length && prevState === this.state) {
            const newData = [...this.state.data];
            expressions.map(expr => {
                newData.push(expr + "=" + this.evaluateExpression(expr));
            })
            this.setState({
                data: newData
            });
        }
    }

    render() {
        const {
            line,
            data
        } = this.state;

        const {
            dispatch,
            loading,
            error
        } = this.props;

        return (
            <div>
                {store.buttons.map(button => 
                    <CalcButton key={button.id}
                                num={button.num}
                                value={button.value}
                                clickFunc={this.handleClick}
                    />)}
                    <CalcButton clickFunc={() => exprsActions.fetchExpressions()(dispatch)}
                                value="Get exprs from BE"
                    />
                    {loading && (
                        <div style={{fontSize : 30}}>
                            Loading from BE...
                        </div>
                    )}
                    {
                        error && (
                            <div style={{fontSize : 30}}>
                                Could not fetch expressions! + {error}
                            </div>
                        )
                    }
                <Display currentLine = {line} data = {data}/>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => {
    return {
        ...reduxState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Buttons);