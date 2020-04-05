import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from '../actions/';

function GoogleAuth() {
    const dispatch = useDispatch();
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    console.log(isSignedIn);

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '806588662754-1cdvmjmk5ohqh1mp81033305apk550kb.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                const auth = window.gapi.auth2.getAuthInstance();
                onAuthChange(auth.isSignedIn.get());
                auth.isSignedIn.listen(onAuthChange);
            });
        })
    }, []);

    const onAuthChange = (val) => {
        if (val) {
            dispatch(signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId()));
        } else {
            dispatch(signOut());
        }
    }

    const onSignInClick = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    const onSignOutClick = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    function renderAuthButton() {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <button className='ui red google button' onClick={onSignOutClick}>
                    <i className='google icon' />
                    Sign Out
                </button>)
        } else {
            return (
                <button className='ui red google button' onClick={onSignInClick}>
                    <i className='google icon' />
                    Sign In with Google
                </button>)
        }
    }

    return (
        <div>
            {renderAuthButton()}
        </div>
    )
}

export default GoogleAuth
