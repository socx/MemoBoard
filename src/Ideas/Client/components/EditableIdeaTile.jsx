import React, { PropTypes } from 'react';
import moment from 'moment';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Formats } from 'main/Utils/DateTime';

const IdeaTile = (props) => {
    return (
        <Segment className='idea-tile' >
            <input className='' type='text' maxLength={15} size={15} autoFocus/> 
            <br/>
            <textarea className='' rows={3} cols={12} />
            <div className='created-date'>{props.created_date}</div>
            <div>
                <Button icon='remove'  size='mini' />
                <Button icon='checkmark'  size='mini'  />
            </div>
        </Segment>
    );
}

IdeaTile.props = {
    inEditMode : React.PropTypes.bool
}

export default IdeaTile;