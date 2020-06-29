import * as React from 'react';
import Hammer from 'react-hammerjs';

export interface OwnProps{
  onPanStart?: () => void
  onPan?:() => void
  onPanEndLeft?:() => void 
  onPanEndRight?: () => void
}

export interface OwnState{
  swiped : boolean
  deltaX : number
  deltaY: number
}

const panHUpperBoundary = 80
const panLowerBoubdary = -80

export default class SwipeComponent extends React.Component<OwnProps, OwnState> {
  constructor(props: any){
    super(props)
    this.state = {
      swiped: false,
      deltaX: 0,
      deltaY: 0
    }
    this.onPanStart = this.onPanStart.bind(this)
    this.onPan = this.onPan.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
  }

  private onPanStart(e: HammerInput){
    this.props.onPanStart && this.props.onPanStart()
    this.setState({deltaX : 0, deltaY: 0})
  }

  private onPan(e: HammerInput){
    this.props.onPan && this.props.onPan()
    const y = e.deltaY >= panHUpperBoundary
      ? panHUpperBoundary
      : e.deltaY <= panLowerBoubdary ? panLowerBoubdary : e.deltaY
    this.setState({deltaX : e.deltaX, deltaY: y})
  }

  private onPanEnd(e: HammerInput){ 
    if(e.deltaX >= 70) {
      this.props.onPanEndRight && this.props.onPanEndRight()
      this.setState({swiped: true})
    } else if(e.deltaX <= -70) {
      this.props.onPanEndLeft && this.props.onPanEndLeft()
      this.setState({swiped: true})
    } else {
      this.setState({deltaX: 0, deltaY: 0})
    }
  }

  render() {
    const style = {
      transform : `translate(${this.state.deltaX}px, ${this.state.deltaY}px)`
    }
    return  (
      <Hammer
        onPanStart={(e) => this.onPanStart(e)} 
        onPan={(e) => this.onPan(e)} 
        onPanEnd={(e) => this.onPanEnd(e)}
        key={"hammer"}><div style={style}>{!this.state.swiped ? this.props.children : null}</div></Hammer>
    )
  }

}