import React, { PropTypes } from 'react';
import moment from 'moment';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Formats } from 'main/Utils/DateTime';

const IdeaTile = (props) => {
    function over(e){
        //e.target.style.backgroundColor="red";
        //console.log(e.target)
    }
    function out(e){
        //e.target.style.backgroundColor='';
    }
    return (
        <Segment className='idea-tile' onMouseOver={over} onMouseOut={out} >
            <Header as='h4' textAlign='left' className='title'> {props.title} </Header> 
            <div className='body'>{props.body}</div>
            <div className='created-date'>{props.created_date}</div>
            <div className='actions'>
                <Button icon='remove' size='mini' onClick={() => props.deleteIdea(props.index)} />
            </div>
        </Segment>
    );
}

IdeaTile.props = {
    index : React.PropTypes.number,
    deleteIdea : React.PropTypes.function
}

export default IdeaTile;