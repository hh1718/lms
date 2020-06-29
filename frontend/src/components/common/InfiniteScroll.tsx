import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

interface OwnProps {
    view: JSX.Element | JSX.Element[]
    hasMore: boolean
    loadMore: (page: number) => void
  }
  
interface OwnState {}
  
export default class InfiniteScrollComponent extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
    }
  }
  render() {
    return <InfiniteScroll
      pageStart={1}
      loadMore={this.props.loadMore}
      hasMore={this.props.hasMore}
      initialLoad={true}
      loader={<CircularProgress key={"progress"} />}
      style={{textAlign: "center"}}>
      {<div>{this.props.view}</div>}
    </InfiniteScroll>
  }
}