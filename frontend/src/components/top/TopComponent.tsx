import * as React from 'react';
import { TopState } from '../../modules/top'
import { UserListState } from '../../modules/userList'
import { topActions } from '../../container/topContainer'
import { AccountReq } from '../../api/dataModels'
import { UserListComponent } from './UserList'
import { SwipedUserList } from './SwipedUserList'
import Button from '@material-ui/core/Button'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

export interface OwnProps{}
type TopProps = OwnProps & TopState & topActions & UserListState;
export interface OwnState{
  bottomNaviState: number,
  goodList: number[],
  badList: number[]
}

export class TopComponent extends React.Component<TopProps, OwnState> {
  constructor(props: any){
    super(props)
    this.state = {
      bottomNaviState: 0,
      goodList: [],
      badList: []
    }
    this.userlist = this.userlist.bind(this)
    this.handleBadList = this.handleBadList.bind(this)
    this.handleGoodList = this.handleGoodList.bind(this)
  }

  private userlist(bottomNaviState: number) {
      switch(bottomNaviState) {
        case 2:
          return this.props.userList.filter((x, index) => this.state.goodList.indexOf(index) >= 0)
        case 1:
          return this.props.userList.filter((x, index) => this.state.badList.indexOf(index) >= 0)
        default:
          return this.props.userList 
      }
  }

  public handleGoodList(index: number): void{
    const gl = this.state.goodList.indexOf(index) < 0
      ? this.state.goodList.concat(index)
      :this.state.goodList
    this.setState({goodList: gl})
  }

  public handleBadList(index: number): void{
    const gl = this.state.badList.indexOf(index) < 0
      ? this.state.badList.concat(index)
      :this.state.badList
    this.setState({badList: gl})
  }

  render() {
    return (
      <div>
        <h1>top page</h1>
        <Button variant="contained" color="primary" onClick={(e) => this.props.updateCount(1)}> click me {this.props.countTop}</Button>
        <section>
          <p>id: <span style={{color: "#f08300"}}>{this.props.account.id}</span></p>
          <p>name: <span style={{color: "#f08300"}}>{this.props.account.name}</span></p>
          <p>userClass: <span style={{color: "#f08300"}}>{this.props.account.userClass}</span></p>
          <button onClick={(e) => this.props.fetchAccount({} as AccountReq)} style={{background: "#165e83", color:"#fff"}}>fetch account</button>
          <button onClick={(e) => this.props.fetchAccountFailed({} as AccountReq)} style={{background: "#00a497" , color:"#fff"}}>fetch account failed</button>
          <button onClick={(e) => this.props.updateCount(2)}>count {this.props.countTop}</button>
        </section>
        <div style={{marginTop: "50px"}}>
          {this.state.bottomNaviState === 0 && <UserListComponent
            userList={this.props.userList} 
            noDispList={this.userlist(1).concat(this.userlist(2)).map((user, index) => index)}
            fetchUserList={this.props.fetchUserList}
            handleBadList={this.handleBadList}
            handleGoodList={this.handleGoodList}/>}
          {this.state.bottomNaviState === 1 && <SwipedUserList userList={this.userlist(1)} isGood={true}/>}
          {this.state.bottomNaviState === 2 && <SwipedUserList userList={this.userlist(2)} isGood={false}/>}
        </div>
        <BottomNavigation
          value={this.state.bottomNaviState}
          onChange={(event, newValue) => this.setState({bottomNaviState: newValue})}
          showLabels
          style={{position: "fixed", bottom: 0, width: "96%", background: "#ebf6f7"}}>
          <BottomNavigationAction label="recommend" />
          <BottomNavigationAction label="bad" icon={<ThumbDown style={this.state.bottomNaviState === 1 ? {color: "#e60033"} : {}}/>} />
          <BottomNavigationAction label="good" icon={<ThumbUp />} />
        </BottomNavigation> 
      </div>    
    );
  }
}
