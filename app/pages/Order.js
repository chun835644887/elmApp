import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import LocalImg from '../images';

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            orderArr: [
                {
                    name: '犯得上广泛个',
                    state: true,
                    time: '2017-09-01 12:10',
                    shops: [
                        '排骨饭1(不辣)',
                        '排骨饭2（微辣）',
                        '排骨饭3（中辣）',
                        '排骨饭4（超级辣）',
                    ],
                    price: 250,
                    img: 'h13'
                },
                {
                    name: '犯得上广泛个',
                    state: true,
                    time: '2017-09-01 12:10',
                    shops: [
                        '排骨饭1(不辣)',
                        '排骨饭2（微辣）',
                        '排骨饭3（中辣）',
                        '排骨饭4（超级辣）',
                    ],
                    price: 250,
                    img: 'h13'
                },
                {
                    name: '犯得上广泛个',
                    state: true,
                    time: '2017-09-01 12:10',
                    shops: [
                        '排骨饭1(不辣)',
                        '排骨饭2（微辣）',
                        '排骨饭3（中辣）',
                        '排骨饭4（超级辣）',
                    ],
                    price: 250,
                    img: 'h13'
                }
            ]
        }
    }

    _renderOrderList = (item) => {
        return (
            <View
                key={Math.random()}
                style={[
                    {
                        flexDirection: 'row',
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        marginBottom: 16,
                        width: screenW,
                        backgroundColor: '#fff'
                    }
                ]}
            >
                <Image
                    source={LocalImg[item.img]}
                    style={[
                        {width: 40, height: 40}
                    ]}
                />
                <View style={[
                    {flex: 1, marginLeft: 8}
                ]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: '#333', fontSize: 14}}>{item.name}</Text>
                        <Text style={{color: '#333', fontSize: 12}}>{item.state ? '订单已完成' : '未完成'}</Text>
                    </View>
                    <Text style={{
                        color: '#aaa',
                        fontSize: 12,
                        paddingBottom: 6,
                        borderBottomWidth: 1,
                        borderColor: '#f8f8f8'
                    }}>{item.time}</Text>
                    <View style={{paddingVertical: 8, flexDirection: 'row'}}>
                        <Text numberOfLines={1} style={{
                            color: '#aaa',
                            fontSize: 14,
                            width: screenW - 50 - 32 - 20
                        }}>{item.shops.join('+')}</Text>
                        <Text style={{color: '#333', fontSize: 12}}>￥{item.price}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View
                style={[
                    {backgroundColor: '#f0f0f0', height: screenH, width: screenW}
                ]}
            >
                <View style={[
                    {
                        height: 50,
                        width: screenW,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }
                ]}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                index: 0
                            })
                        }}
                    >
                        <View style={[
                            {justifyContent: 'center', alignItems: 'center', height: 50}
                        ]}>
                            <Text style={[
                                styles.pageText,
                                this.state.index == 0
                                    ? styles.active
                                    : {}
                            ]}>订单</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                index: 1
                            })
                        }}
                    >
                        <View style={[
                            {justifyContent: 'center', alignItems: 'center', height: 50}
                        ]}>
                            <Text style={[
                                styles.pageText,
                                this.state.index == 1
                                    ? styles.active
                                    : {}
                            ]}>早餐</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{height: 50, width: screenW, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>近期订单</Text>
                </View>
                <View style={[
                    {flex: 1}
                ]}>
                    {this.state.orderArr.map(this._renderOrderList)}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    active: {
        color: '#0398FF',
        borderBottomWidth: 2,
        borderColor: '#0398FF',
    },
    pageText: {
        paddingVertical: 2,
        color: '#333'
    }
});
