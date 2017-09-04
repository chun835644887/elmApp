/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
// import LBSModal from './app/component/lbsModal';
import {TabNavigator} from "react-navigation";
import {StackNavigator,NavigationActions} from 'react-navigation';
import Home from './app/pages/Home';
import ItemControl from './app/component/ItemControl';
import ShopDetail from './app/pages/ShopDetail';
import Shop from './app/data';
import ShowCar from './app/component/ShopCar';
import Order from './app/pages/Order'
import Personal from './app/pages/Personal'
import Icon from 'react-native-vector-icons/Ionicons';

export default class elmApp extends Component {
    render() {
        return (
            <View>
                <Personal
                    shop={Shop.list[0]}
                />
            </View>
        );
    }
}
const Tab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarVisible: true,
            title: '首页',
            headerTintColor: '#000',
            tabBarIcon: <Icon name="md-home" size={20} color="#00f"/>
        }
    },
    Personal: {
        screen: Personal,
        headerTitleStyle: {
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
        },
        navigationOptions: {
            tabBarVisible: true,
            title: '设置',
            headerTintColor: '#000',
            tabBarIcon: <Icon name="md-person" size={20} color="#00f"/>
        }
    },

}, {
    tabBarPosition: 'bottom',
    //backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        showIcon: true,
        pressColor: '#666',//按下去的颜色
        pressOpacity: 0.5,
        style: {
            backgroundColor: '#f5f5f5', // TabBar 背景色
            height: 50,
            borderTopWidth: 0.5,
            borderTopColor: '#eeeeee',
        },
        labelStyle: {
            fontSize: 12,
            color: '#333',
            marginTop: 0
        },
    }

});
const routerApp = StackNavigator({
    Tab:{
        screen:Tab
    },
    ShopDetail:{
        screen:ShopDetail
    }
},{
    navigationOptions:{

    }
})
const styles = StyleSheet.create({});

AppRegistry.registerComponent('elmApp', () => routerApp);
