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
                <Segment loading={this.props.ideas.isFetchingIdeas} textAlign='center' >                
                    <Button onClick={() => this.props.addIdea()} >
                        <Icon name='plus' />
                        Add New Idea                    
                    </Button>
                </Segment>
                
                <Grid className=''  >
                {
                  ideaList && ideaList.toArray().map((idea, index) => {
                      const tile = <EditableIdeaTile 
                                            key={`tile-${idea.id}`}  
                                            {...idea} 
                                            index={index}
                                            hasFocus = {idea.id === newestIdeaId}
                                            deleteIdea={this.props.deleteIdea}
                                            changeIdeaTitle = {this.props.changeIdeaTitle}
                                            changeIdeaBody = {this.props.changeIdeaBody}
                                            updateIdea={this.props.updateIdea}
                                        />
                      return tile;
                  })
                }
                </Grid>
                { this.props.ideas.errors.size > 0 &&
                <Message
                    attached
                    onDismiss={this.props.onClearErrors}
                    negative
                    icon='warning'
                    list={this.props.ideas.errors.toArray()}
                    />
                }
                { this.props.ideas.messages.size > 0 &&
                <Message
                    attached
                    onDismiss={this.props.onClearMessages}
                    warning
                    icon='info'
                    list={this.props.ideas.messages.toArray()}
                    />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasView)
