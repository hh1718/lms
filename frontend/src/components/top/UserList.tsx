import * as React from 'react';
import { UserListReq, User } from '../../api/dataModels'
import InfiniteScroll from '../common/InfiniteScroll'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SwipeComponent from '../common/Swipe'
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

export interface OwnProps{
  userList: User[]
  noDispList?: number[]
  fetchUserList: (req: UserListReq) => void
  handleGoodList: (index: number) => void
  handleBadList: (index: number) => void
}

export interface OwnState{
  expandedList: number[]
  likedList: number[]
}

export class UserListComponent extends React.Component<OwnProps, OwnState> {
  constructor(props: any){
    super(props)
    this.state = {
      expandedList: [],
      likedList: []
    }
    this.loadMore = this.loadMore.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleLiked = this.handleLiked.bind(this)
  }

  private loadMore(page: number): void {
    if(this.props.userList.length < 120) {
      setTimeout(() => this.props.fetchUserList({size: 30} as UserListReq), 600)
    }
  }

  private handleExpand(id: number): void {
    const eList = this.state.expandedList.indexOf(id) >= 0
      ? this.state.expandedList.filter(x => x !== id)
      : this.state.expandedList.concat(id)
    this.setState({expandedList: eList})
  }

  private handleLiked(id: number): void {
    const lList = this.state.likedList.indexOf(id) >= 0
      ? this.state.likedList.filter(x => x !== id)
      : this.state.likedList.concat(id)
    this.setState({likedList: lList})
  }

  public onPanEnd(e: HammerInput){
  
  }

  render() {
    const userListView: JSX.Element[] = this.props.userList.map((user, index) => (
      this.props.noDispList &&  this.props.noDispList.indexOf(index) < 0)
      ? <SwipeComponent
          key={user.id + String(index)}
          onPanEndLeft={() => this.props.handleBadList(index)}
          onPanEndRight={() => this.props.handleGoodList(index)}
          >
        <Card style={{marginBottom: "20px", textAlign: "left"}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" style={{background: "#165e83"}}>{`${user.id}`}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`Title ${user.name}`}
            subheader={`SubHeader ${user.name}`}
          />
          {/*<CardMedia
            image=""
            title="face"
          />*/}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">Yes Yes Yes {user.message}</Typography>
          </CardContent>
          <CardActions style={{display: "flex", justifyContent: "space-between" }}>
          <IconButton style={{color: "#e60033"}}>
            <ThumbDown/><TrendingFlat style={{transform: "scale(-1,1)"}}/>
          </IconButton>
          <IconButton style={{color: "#3f51b5"}}>
            <TrendingFlat/><ThumbUp />
          </IconButton>
          </CardActions>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={(e) => this.handleLiked(index)}>
              <FavoriteIcon style={this.state.likedList.indexOf(index) >= 0 ? {color: "#f8b500"}: {color: "#bbb"}}/>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={(e) => this.handleExpand(index)}
              aria-expanded={this.state.expandedList.indexOf(index) >= 0}
              aria-label="show more"
              style={this.state.expandedList.indexOf(index) >= 0 ? {transform: "scale(1,-1)"}: {}}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expandedList.indexOf(index) >= 0} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Thank you for expanding!</Typography>
            </CardContent>
          </Collapse>
        </Card>
        </SwipeComponent>
      : undefined
    ).filter(Boolean) as JSX.Element[]

    return (
      <InfiniteScroll
        view={userListView}
        hasMore={this.props.userList.length < 50 }
        loadMore={(page) => this.loadMore(page)}
      />
    );
  }
}
