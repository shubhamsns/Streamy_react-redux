import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'

const StreamDelete = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const stream = useSelector(state => state.streams[id]);

    useEffect(() => {
        dispatch(fetchStream(id))
    }, []);

    const renderActions = () => (
        <>
            <button
                onClick={() => dispatch(deleteStream(id))}
                className="ui button negative"
            >
                Delete
            </button>
            <Link to='/' className="ui button">Cancel</Link>
        </>
    );

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream with title: ${stream.title}`
    }

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    )
}

export default StreamDelete
