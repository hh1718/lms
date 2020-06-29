import * as React from 'react';
//import * as ReactDOM from 'react-dom';

interface OwnProps {
  str: string
}

interface OwnState {
  clickCount: number
}

export default class ButtonSample extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      clickCount: 0,
    };
    this.countUp = this.countUp.bind(this)
  }
  render() {
    return (
      <button onClick={this.countUp}>{this.props.str}  {this.state.clickCount}</button>
    );
  }
  private countUp(): void{
    this.setState({clickCount: this.state.clickCount + 1})
  }
}