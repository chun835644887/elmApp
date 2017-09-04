/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
/*
* name ---> 为icon图片名
* onPress ---> 为响应点击事件
* title ---> 标题
* */
export default class NavBar extends Component {
    renderBtn(obj) {
        const {name,onPress} = obj;
        /*判断为android还是ios设备*/
        if (Platform.OS == 'android') {
            return (
                <TouchableNativeFeedback style={styles.tabbarBtn} onPress={onPress} >
                    <Icon name={name} size={26} color="#fff"/>
                </TouchableNativeFeedback>
            );
        }
    }

    _render(pos){
        if(pos === 'left'){
            if(this.props.leftIcon){
                return this.renderBtn({
                    name: this.props.leftIcon,
                    onPress: this.props.leftPress
                })
            }else{
                return (<View style={styles.tabbarBtn}></View>)
            }
        }
        if(pos === 'right'){
            if(this.props.rightIcon){
                return this.renderBtn({
                    name: this.props.rightIcon,
                    onPress: this.props.rightPress
                })
            }else{
                return (<View style={styles.tabbarBtn}></View>)
            }
        }
    }

    render() {
        return (
            <View style={styles.tabbar}>
                {this._render('left')}
                <Text style={styles.tabbarTitle}>{this.props.title}</Text>
                {this._render('right')}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 0,
        paddingHorizontal: 10,
        backgroundColor: "#0398ff"
    },
    tabbarTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    tabbarBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
