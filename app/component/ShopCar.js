import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let screenW = Dimensions.get('window').width;
export default class ShopCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: this.props.shop,
            allPrice:0
        }
    }
    changeCount = (title,index,count,addOrSub) => {
        let allP = this.state.allPrice;
        let allCount = this.state.allCount;
        if(addOrSub){
            allP +=  this.state.shop.goods[title][index].price;
            allCount += 1;
        }else{
            allP -=  this.state.shop.goods[title][index].price
            allCount -= 1;
        }

        let shop = this.state.shop;
        this.state.shop.goods[title][index].count = count;
        this.setState({
            shop:shop,
            allPrice:allP,
            allCount:allCount
        });
    }
    componentWillMount = () => {
        let carList = [];
        let allP = 0;
        let allCount = 0;
        let keyArr = Object.keys(this.state.shop.goods);
        console.log(this.state.shop);
        keyArr.map((key) => {
            let obj = {};
            obj[key] = [];
            this.state.shop.goods[key].map((item) => {
                if (item.count != undefined && item.count > 0) {
                    obj[key].push(item);
                    allP += item.count*item.price;
                    allCount += item.count;
                }
            })
        });
        this.setState({
            carList: carList,
            allPrice:allP,
            allCount:allCount
        });
    }

    render() {
        return (
            <View style={styles.carBox}>

                <View style={[
                    styles.content
                ]}>

                    <View>
                        {this.state.allPrice === 0
                            ?<Text style={styles.price}>{this.state.shop.startPay}</Text>
                            :<View>
                                <Text style={styles.price}>￥{this.state.allPrice}</Text>
                                <Text style={styles.develiy}>另加{this.state.shop.deliverPay}</Text>
                            </View>}

                    </View>
                    <View style={[
                        styles.accountView
                    ]}>
                        <TouchableHighlight>
                            {
                                this.state.allPrice<20&&this.state.allPrice>0
                                ?<Text style={styles.account}>还差{20-this.state.allPrice}</Text>
                                    :<Text style={styles.account}>结算</Text>
                            }
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.car}>
                    <Icon name="md-cart" size={26} color="#3190E8"/>
                    {this.state.allCount === 0
                    ?<Text></Text>
                    :<Text style={styles.allCount}>{this.state.allCount}</Text>}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    carBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 56,
        backgroundColor:'#fff',
        width: screenW,
        width: screenW,

    },
    car: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 3,
        borderColor: '#565351',
        top: 0,
        left: 16
    },
    price: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    content: {
        height: 46,
        backgroundColor: 'rgba(0,0,0,.8)',
        width: screenW,
        bottom: 0,
        justifyContent: 'space-between',
        paddingLeft: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },
    develiy: {
        color: '#fff',
        fontSize: 12,
    },
    accountView: {
        backgroundColor: '#3190e8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 46,
        width: 100
    },
    account: {
        color: '#fff',
        alignItems: 'center',
    },
    allCount:{
        position:'absolute',
        top:-2,
        right:0,
        paddingHorizontal:1,
        fontSize:10,
        borderRadius:6,
        borderBottomLeftRadius:0,
        backgroundColor:'#f60',
        color:'#fff',
        textAlign:'center'
    },
});