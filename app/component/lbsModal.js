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
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import NavBar from './NavBar';
/*
* lbsModalFlag ---> 关闭modal
* closeLbsModal --->
* location ---> 定位信息
* setLocation ---> 改变定位地址
*
* */
export default class lbeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            addressArr: [
                {
                    name: 'Yang',
                    phone: '12345678910',
                    iconText: '公司',
                    address: '微软亚太研发集团',
                    iconBackgroundColor: {backgroundColor: '#0096ff'}
                },
                {
                    name: 'Yang',
                    phone: '12345678910',
                    iconText: '家',
                    address: '厦门同安',
                    iconBackgroundColor: {backgroundColor: '#ff6000'}
                }
            ],
            nearAddress: ["颐和雅苑烤鸭坊", "中国电子大厦", "立方-庭"]
        }
    }
    getLocation = () => {

    }
    closeModal=()=>{
        this.props.closeLbsModal();
    }
    render() {
        console.log(this.props.lbsModalFlag)
        return (
            <Modal
                visible={this.props.lbsModalFlag}
                animationType="slide"
            >
                <View>
                    <NavBar
                        title="选择收货地址"
                        leftIcon="ios-close"
                        leftPress={this.closeModal.bind(this)}
                    />
                    <View style={styles.searchBox}>
                        <TextInput style={styles.searchInput} placeholder="请输入地址" placeholderTextColor="#666"
                                   underlineColorAndroid="transparent"/>
                    </View>
                    <ScrollView>
                        <Text style={styles.title}>{this.props.loacation}</Text>
                        <View style={styles.loacation}>
                            <Text>厦门同安</Text>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                {this.state.loading
                                    ?<ActivityIndicator/>
                                    :<Icon name="ios-locate-outline" color="#0398ff" size={22}/>
                                }
                                <Text style={styles.reLocationText}>重新定位</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>收货地址</Text>
                        {this.state.addressArr.map((item, i) => {
                            return (
                                <TouchableOpacity key={i}>
                                    <View style={styles.receiverAddress}>
                                        <View style={styles.receiverInfo}>
                                            <Text style={[styles.receiverText, {marginRight: 6}]}>{item.name}</Text>
                                            <Text style={[styles.receiverText, {marginRight: 6}]}>{item.phone}</Text>
                                        </View>
                                        <View style={styles.addressInfo}>
                                            <Text style={[
                                                styles.addressText,
                                                {marginRight: 6, paddingHorizontal: 6, borderRadius: 4},
                                                item.iconBackgroundColor
                                            ]}>{item.iconText}</Text>
                                            <Text style={[styles.addressText]}>{item.address}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                        <Text style={styles.title}>附近地址</Text>
                        {this.state.nearAddress.map((nearItem,i) => {
                            return (
                                <View
                                    key={i}
                                    style={[styles.receiverAddress, {borderBottomWidth: 1, borderBottomColor: "#f5f5f5"}]}>
                                    <Text>{nearItem}</Text>
                                </View>
                            );
                        })}

                    </ScrollView>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#0398ff"
    },
    searchInput: {
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 0,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 13,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 10,
        color: '#666'
    },
    loacation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 16,
        height: 45,
        backgroundColor: '#fff'
    },
    reLocation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reLocationText: {
        marginLeft: 6,
        color: '#0398ff',
        fontSize: 13
    },
    receiverAddress: {
        paddingHorizontal: 16,
        height: 45,
        backgroundColor: "#fff",
        borderBottomWidth:1,
        borderBottomColor:'#f5f5f5'
    },
    receiverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    receiverText: {
        fontSize: 14,
        color: '#333'
    },
    addressText: {
        fontSize: 14,
        color: '#666'
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

