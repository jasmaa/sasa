
import React from 'react';
import { View } from 'react-native';
import CacheStore from 'react-native-cache-store';

import Mastodon from '../networking/Mastodon.js';

/**
 * Dummy screen to redirect to login
 */
export default class InitScreen extends React.Component {

    /**
     * Check if logged in
     */
    async init(){
        const loginInfo = await CacheStore.get("loginInfo");

        if(loginInfo != null){
            let M = new Mastodon(loginInfo['baseurl']);
            await M.init();
            await M.registerApp();
            M.accessToken = loginInfo['accessToken'];

            this.props.navigation.navigate('LoginLanding', {M: M});
        }
        else{
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount(){
        this.init();
    }

    render(){
        return (
            <View></View>
        );
    }
}