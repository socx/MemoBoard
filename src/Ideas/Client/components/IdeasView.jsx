import React, { Component }                 from 'react';
import { connect }                          from 'react-redux';
import { bindActionCreators }               from 'redux';
import { Segment, Icon, Message, Menu, Button, Grid}      from 'semantic-ui-react';

import * as actions                         from '../store/actionCreators';
import IdeaTile                             from './IdeaTile';
import EditableIdeaTile                     from './EditableIdeaTile';



const mapStateToProps = (state) => ({
    ideas : state.ideas
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

class IdeasView extends Component {
    getIdeasClick = (() => this.props.getIdeas())
    
    componentDidMount() {
        this.props.getIdeas();
    }
    
    render() {
        const ideaList = this.props.ideas.ideaList;
        const newestIdeaId = this.props.ideas.newestIdeaId;
        return (
            <div className='ideas-container'>
                <h2>Ideas/Memo Board</h2>
                <Segment loading={this.props.ideas.isFetchingIdeas} >
                
                <Button onClick={() => this.props.addIdea()} >
                    <Icon name='cancel' />
                    Add New Idea                    
                </Button>
                </Segment>
                
                <Grid className=''  >
                {
                  ideaList && ideaList.length > 0 && ideaList.map((idea) => {
                      console.log(idea);
                      console.log('newestIdeaId = ' + newestIdeaId + '; idea.id :' + idea.id)
                      const tile = (idea.id === newestIdeaId) 
                                    ? <EditableIdeaTile key={`tile-${idea.id}`}  {...idea} />
                                    : <IdeaTile key={`tile-${idea.id}`} {...idea} />
                      return tile;
                  })
                }
                </Grid>
                { this.props.ideas.errors.size > 0 &&
                <Message
                    attached
                    onDismiss={this.props.onClearReportErrors}
                    negative
                    icon='warning'
                    list={this.props.ideas.errors.toArray()}
                    />
                }
                { this.props.ideas.warnings.size > 0 &&
                <Message
                    attached
                    onDismiss={this.props.onClearReportWarnings}
                    warning
                    icon='info'
                    list={this.props.ideas.warnings.toArray()}
                    />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasView)
