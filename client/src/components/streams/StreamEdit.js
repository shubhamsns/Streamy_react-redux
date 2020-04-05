import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions'
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

function StreamEdit() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const stream = useSelector(state => state.streams[id]);

    useEffect(() => {
        dispatch(fetchStream(id));
    }, []);

    const onSubmit = (formValues) => {
        dispatch(editStream(id, formValues));
    }

    if (!stream) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                initialValues={_.pick(stream, 'title', 'description')}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default StreamEdit;
