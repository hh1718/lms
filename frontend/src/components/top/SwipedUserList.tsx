import * as React from 'react';
import { User } from '../../api/dataModels'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export interface OwnProps{
  userList: User[]
  isGood: boolean
}

export interface OwnState{
  expandedList: number[]
}

export class SwipedUserList extends React.Component<OwnProps, OwnState> {
  constructor(props: any){
    super(props)
    this.state = {
      expandedList: [],
    }
    this.handleExpand = this.handleExpand.bind(this)
  }

  private handleExpand(id: number): void {
    const eList = this.state.expandedList.indexOf(id) >= 0
      ? this.state.expandedList.filter(x => x !== id)
      : this.state.expandedList.concat(id)
    this.setState({expandedList: eList})
  }

  render() {
    return (
      this.props.userList.map((user, index) => 
        <Card key={`${user.id}/${index}/swiped/${this.props.isGood}`}style={{marginBottom: "20px", textAlign: "left"}}>
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
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">Yes Yes Yes {user.message}</Typography>
          </CardContent>
          <CardActions disableSpacing>
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
      )
    );
  }
}
