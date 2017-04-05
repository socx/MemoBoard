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
                                            hasFocus = {idea.id === this.props.ideas.newestIdeaId}
                                            justSaved = {idea.id === this.props.ideas.newlySavedIdeaId}
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasView)
