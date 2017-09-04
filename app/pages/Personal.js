import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import LocalImg from '../images';

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height
export default class Personal extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: (
                <View></View>
            ),
        }

    };
    constructor(props) {
        super(props);
        this.state = {
            name: '但是不乏i士大',
            phone: '13456478465',
            img: 'h8',
            remain: 9999,
            discount: 250,
            integral: 555,
            config: [
                {icon: "ios-pin", name: "收货地址", color: '#4DA6F0'},
                {icon: "ios-heart", name: "我的收藏", color: "#fc7b53"},
                {icon: "md-images", name: "美食相册", color: '#4DA6F0'},
                {icon: "logo-usd", name: "推荐有奖", subName: "5元现金", color: "#fc7b53"},
                {icon: "ios-cart", name: "积分商城", subName: "0元好物在这里", color: "#94d94a"},
                {icon: "ios-medal", name: "饿了吗会员卡", subName: "未开通", color: "#ffc636"},
                {icon: "md-flower", name: "服务中心", color: '#4DA6F0'},
                {icon: "ios-outlet", name: "欢迎评分", color: '#4DA6F0'},
                {icon: "md-contacts", name: "加盟合作", color: '#4DA6F0'},
            ]
        }
    }

    /*余额优惠积分*/
    _renderAccount = () => {
        return (
            <View style={[
                styles.row,
                {backgroundColor: '#fff'}
            ]}>
                <View style={[
                    {flex: 1, alignItems: 'center'},
                    styles.paddingV16,
                    styles.paddingH16
                ]}>
                    <Text style={[
                        styles.accountItem,
                        {color: '#ff9900'}
                    ]}>{this.state.remain}元</Text>
                    <Text style={styles.accountText}>余额</Text>
                </View>
                <View style={[
                    {flex: 1, alignItems: 'center'},
                    styles.paddingV16,
                    styles.paddingH16,
                    styles.leftBorder
                ]}>
                    <Text style={[
                        styles.accountItem,
                        {color: '#ff5f3e'}
                    ]}>{this.state.discount}个</Text>
                    <Text style={styles.accountText}>优惠</Text>
                </View>
                <View style={[
                    {flex: 1, alignItems: 'center'},
                    styles.paddingV16,
                    styles.paddingH16,
                    styles.leftBorder
                ]}>
                    <Text style={[
                        styles.accountItem,
                        {color: '#6AC20B'}
                    ]}>{this.state.integral}分</Text>
                    <Text style={styles.accountText}>积分</Text>
                </View>
            </View>
        );
    }
    /*地址收藏相册*/
    _renderPersonalItem = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                key={index}
            >
                <View style={[
                    index % 3 == 0 ? styles.marginT8 : {},
                    {backgroundColor: '#fff'},
                    styles.paddingH16
                ]}>
                    <View style={[
                        index % 3 != 0 ? styles.lineTop : {},
                        styles.row,
                        {justifyContent: 'space-between', height: 40, alignItems: 'center'}
                    ]}>
                        <View style={styles.row}>
                            <Icon name={item.icon} size={18} color={item.color}/>
                            <Text style={styles.itemNmae}>{item.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.itemSubName}>{item.subName}</Text>
                            <Icon name="ios-arrow-forward-outline" size={18} color="#bbb"/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon name="ios-notifications-outline" size={20} color="#fff"/>
                    <Text style={styles.title}>我的</Text>
                    <Icon name="md-settings" size={20} color="#fff"/>
                </View>
                <View>
                    <TouchableHighlight>
                        <View style={styles.safeInfo}>
                            <View style={[styles.row]}>
                                <Image
                                    source={LocalImg['h7']}
                                    style={styles.icon}
                                />
                                <View style={[styles.marginL8]}>
                                    <Text style={styles.name}>{this.state.name}</Text>
                                    <View style={[
                                        styles.row
                                    ]}>
                                        <Icon name="ios-phone-portrait" size={18} color="#fff"/>
                                        <Text style={styles.phone}>{this.state.phone}</Text>
                                    </View>
                                </View>
                            </View>
                            <Icon name="ios-arrow-forward-outline" size={24} color="#fff"/>
                        </View>
                    </TouchableHighlight>
                </View>
                {this._renderAccount()}
                {this.state.config.map(this._renderPersonalItem)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    marginL8: {
        marginLeft: 8
    },
    paddingV16: {
        paddingVertical: 16
    },
    paddingH16: {
        paddingHorizontal: 16
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderColor: '#f0f0f0'
    },
    lineTop: {
        borderTopWidth: 1,
        borderColor: '#f0f0f0'
    },
    marginT8: {
        marginTop: 8
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        height: 50,
        width: screenW,
        backgroundColor: '#0398FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    safeInfo: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0398FF',
        width: screenW,
        alignItems: 'center'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 2
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6
    },
    phone: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 8
    },
    accountItem: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    accountText: {
        fontSize: 12
    },
    itemNmae: {
        marginLeft: 8,
        fontSize: 14,
    },
    itemSubName: {
        marginRight: 8
    },

})