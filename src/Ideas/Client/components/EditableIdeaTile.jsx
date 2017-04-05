import React, { PropTypes } from 'react';
import moment from 'moment';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Formats } from 'main/Utils/DateTime';

const EditableIdeaTile = (props) => {
    return (
        <Segment className='idea-tile' >
            <div className='title'>
                <input className='' type='text' maxLength={15} size={14} autoFocus={props.hasFocus} 
                    value={props.title} 
                    onChange={(e) => props.changeIdeaTitle(props.index, e.target.value)}
                    onBlur={() => props.updateIdea(props.index)}  /> 
            </div>
            <div className='body'>
                <textarea className='' rows={3} cols={12} 
                    value={props.body}
                    onChange={(e) => props.changeIdeaBody(props.index, e.target.value)}
                    onBlur={() => props.updateIdea(props.index)} />
            </div>
            <div className='created-date'>{props.created_date}</div>
            <div className='actions'>
                <Button icon='remove' size='mini' onClick={() => props.deleteIdea(props.index)} />
            </div>
        </Segment>
    );
}

EditableIdeaTile.props = {
    index : React.PropTypes.number,
    hasFocus : React.PropTypes.bool,
    deleteIdea : React.PropTypes.function,
    changeIdeaTitle : React.PropTypes.function,
    changeIdeaBody : React.PropTypes.function,
    updateIdea : React.PropTypes.function
}

export default EditableIdeaTile;