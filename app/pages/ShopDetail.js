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
    Image, TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    ScrollView,
    Dimensions,
    SectionList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalImg from '../images';
import ItemControl from '../component/ItemControl';
import ShopCar from '../component/ShopCar';
import Shops from '../data';

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
export default class ShopDetail extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
        }

    };
    constructor(props) {
        super(props);
        this.state = {
            bulletin: "公告：春节前，配送紧张，可能延时推送，请客户谅解",
            colorArr: {
                "减": "#f07373",
                "特": "#f1884f",
                "新": "#73f08e"
            },
            pageIndex: 0,
            slideIndex: 0,
            shop: Shops.list[1],
            keyArr: Object.keys(Shops.list[1].goods),
            shopOrScores: false,
            evaluate: {
                all: 1500,
                perfect: 250,
                disPerfect: 250,
                fast: 250,
                server: 250,
                taste: 250,
                img: 250
            },
            evaluateArr: [
                {
                    name: '123****456',
                    content: '史蒂夫纳什的快乐；烦恼吗违法那么深刻的v车内现款v没事的',
                    star: 4,
                    time: '2017-09-01',
                    icon: 'h10'
                }, {
                    name: '123****456',
                    content: '史蒂夫纳什的快乐；烦恼吗违法那么深刻的v车内现款v没事的',
                    star: 4,
                    time: '2017-09-01',
                    icon: 'h11'
                }
            ]

        }
    }
    componentDidMount = () => {
        this._getSectionH();
    }
    setCount = (index, title, count, addOrSub) => {
        this.state.shop.goods[title][index].count = count;
        let keyArrCount = this.state.keyArrCount;
        if (addOrSub) {
            keyArrCount[title] = keyArrCount[title] + 1;
        } else {
            keyArrCount[title] = keyArrCount[title] - 1;
        }
        this.setState({
            keyArrCount: keyArrCount,
        }, () => {
            // console.log(this.state.keyArrCount);
            /*setState后的回调*/
        });
        this.refs.shopCar.changeCount(title, index, count, addOrSub);
    }
    _renderLine = () => {
        return (
            <View style={styles.line}></View>
        )
    }
    /*组件即将被注册*/
    componentWillMount = () => {
        const {state} = this.props.navigation;
        if(state.params){
            this.setState({
                shop:state.params.shop
            },() => {
                console.log(this.state.shop.activities);
            })
        }
        let countObj = {};
        this.state.keyArr.map((item) => {
            let count = 0;
            this.state.shop.goods[item].map((foodItem) => {
                if (foodItem.hasOwnProperty('count') && foodItem.count >= 0) {
                    count += foodItem.count;
                }
            })
            countObj[item] = count;
        })
        this.setState({
            keyArrCount: countObj
        });
    }
    _renderHeader = () => {
        return (
            <View ref="detailHeader" style={styles.header}>
                <View style={styles.row}>
                    <Image
                        source={LocalImg['bg']}
                        style={styles.brandImg}
                    />
                    <View style={[styles.marginL16]}>
                        <Text style={[styles.name, styles.marginB4, styles.marginT4]}>{this.state.shop.name}</Text>
                        <View style={[styles.row, styles.marginB4]}>
                            {this.state.shop.fengniao ? <Text style={styles.fengNiao}>蜂鸟配送</Text> : <Text></Text>}
                            <Text style={styles.time}>{this.state.shop.time}送达</Text>
                        </View>
                        <Text numberOfLine={1} style={[styles.bulletin, styles.marginB4]}>{this.state.bulletin}</Text>
                    </View>
                </View>
                {this.state.shop.activities?this.state.shop.activities.map((item, index) => {
                    return (
                        <View key={index} style={[styles.row, styles.marginB4]}>

                            <Text style={[styles.paddingV2, {
                                marginRight: 4,
                                backgroundColor: this.state.colorArr[item.key]
                            }]}>{item.key}</Text>
                            <Text style={styles.active}>{item.text}</Text>
                        </View>
                    );
                }):[].map(() => {})}
            </View>
        );
    }
    /*y右边通栏*/
    _renderSlidBar = () => {
        return (
            <FlatList
                extraData={this.state.slideIndex}/*需要其他数据来触发faltlist的更新都在这里传值给faltlist*/
                keyExtractor={() => Math.random()}
                data={Object.keys(this.state.keyArrCount)}
                ItemSeparatorComponent={this._renderLine}/*item之间的组件*/
                ListHeaderComponent={this._renderLine}/*头部组件*/
                ListFooterComponent={this._renderLine}/*尾部组件*/
                renderItem={(item) => {
                    // let key = Object.keys(item.item);
                    return (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                this.setState({
                                    slideIndex: item.index
                                });
                                let sectionList = this.refs.sectionList;
                                sectionList.scrollToLocation({
                                    sectionIndex: item.index,
                                    itemIndex: 0
                                });
                                let header = this.refs.detailHeader;
                            }}
                        >
                            <View style={[
                                styles.slidItem,
                                this.state.slideIndex === item.index
                                    ? styles.slideItemActive
                                    : {}
                            ]}>
                                <Text>{item.item}</Text>
                                {this.state.keyArrCount[item.item] === 0
                                    ? <Text></Text>
                                    : <Text style={styles.slideItemCount}>{this.state.keyArrCount[item.item]}</Text>}
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
    /*item列表*/
    _renderSectionHeader = (section) => {
        return (
            <View style={styles.sectionHeader}>
                <Text>{section.section.title}</Text>
            </View>
        );
    }
    _renderSectionItem = (item,index) => {
        return (
            <TouchableOpacity
                ref={item.item.key}
                activeOpacity={0.7}
            >
                <View style={[styles.row, styles.sectionItemContent]}>
                    <Image
                        source={LocalImg['h0']}
                        style={styles.sectionItemImg}
                    />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={[styles.sectionItemTitle, styles.marginB2]}>{item.item.name}</Text>
                        <Text style={[styles.sectionItemDes, styles.marginB2]}>好吧！好像没有什么可以描述的，差评</Text>
                        <Text>{item.item.sale}</Text>
                        <View style={[
                            styles.row,
                            styles.sectionPriceControl
                        ]}>
                            <Text style={styles.sectionItemPrice}>￥{item.item.price}</Text>
                            <ItemControl
                                item={item}
                                setCount={this.setCount.bind(this)}

                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    _renderItem = () => {
        let keyArr = Object.keys(this.state.shop.goods);
        let arr = [];
        keyArr.map((keyItem) => {
            arr.push({
                data: this.state.shop.goods[keyItem], title: keyItem
            })
        })
        return (
            < SectionList
                  onScroll={(e) => {
                 }}
                keyExtractor={() => Math.random()}
                SectionSeparatorComponent={this._renderLine}
                ListHeaderComponent={this._renderLine}
                ListFooterComponent={() => {
                    return (
                        <View style={{height: 100}}></View>
                    )
                }}
                ItemSeparatorComponent={this._renderLine}
                stickySectionHeadersEnabled={true}
                renderSectionHeader={this._renderSectionHeader}
                sections={arr}
                renderItem={this._renderSectionItem}
                ref="sectionList"
            />
        );

    }
    _renderGoodsList = () => {
        return (
            <View style={{flex: 1}}>
                <View style={[
                    {flex: 1, flexDirection: 'row', position: 'relative'}
                ]}>
                    <View style={[
                        {backgroundColor: '#f8f8f8'}
                    ]}>
                        {this._renderSlidBar()}
                    </View>
                    <View style={[styles.row, {backgroundColor: '#fff'}]}>
                        {this._renderItem()}
                    </View>

                </View>
                <ShopCar
                    ref="shopCar"
                    shop={this.state.shop}
                />
            </View>
        );
    }
    _renderScores = () => {
        return (
            <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
                <View style={[styles.serviceScores, styles.row]}>
                    <View style={[styles.finallyScore, styles.columnCenter]}>
                        <Text style={[
                            {fontSize: 14, color: '#f60'},
                            styles.marginB2
                        ]}>{this.state.shop.scores}</Text>
                        <Text style={[
                            {fontSize: 12, color: '#333'},
                            styles.marginB2
                        ]}>综合评分</Text>
                        <Text style={[
                            {color: '#aaa', fontSize: 12},
                            styles.marginB2
                        ]}>高于周边商家57%</Text>
                    </View>
                    <View style={[
                        styles.detailScore,
                        {justifyContent: 'center', alignItems: 'center', flex: 1}
                    ]}>
                        <View style={[styles.row]}>
                            <Text style={styles.marginR6}>服务态度</Text>
                            {this._renderStart(this.state.shop.scores, 5)}
                        </View>
                        <View style={[
                            styles.row,
                            {marginTop: 8}
                        ]}>
                            <Text style={styles.marginR6}>商品评分</Text>
                            {this._renderStart(this.state.shop.scores, 5)}
                        </View>
                    </View>
                </View>
                <View style={[
                    {backgroundColor: '#fff', flex: 1, marginTop: 16}
                ]}>
                    <View style={[
                        styles.row,
                        {flexWrap: 'wrap', paddingHorizontal: 16}
                    ]}>
                        {
                            Object.keys(this.state.evaluate).map(this._renderEvaluateCount)
                        }
                    </View>
                    <View>
                        {this.state.evaluateArr.map(this._renderEvaluate)}
                    </View>
                </View>
            </View>
        );
    }
    _renderStart = (score, max) => {
        let intScore = Math.floor(score / 1);
        let smallScore = score % 1;
        let starArr = [];
        let getStar = () => {
            for (let i = 0; i < max; i++) {
                if (i < intScore) {
                    starArr.push(2);
                } else {
                    if (i === intScore && smallScore > 0.5) {
                        starArr.push(1);
                    } else {
                        starArr.push(0);
                    }
                }
            }
        }
        getStar();

        return (
            <View style={{flexDirection: 'row'}}>
                {starArr.map((item) => {
                    switch (item) {
                        case 2:
                            return (
                                <View key={Math.random()}>
                                    < Icon name="md-star" size={18} color="#fb4"/>
                                </View>
                            )
                            break;
                        case 1:
                            return (
                                <View key={Math.random()}>
                                    <Icon name="md-star-half" size={18} color="#fb4"/>
                                </View>
                            );
                            break;
                        case 0:
                            return (
                                <View key={Math.random()}>
                                    <Icon name="md-star-outline" size={18} color="#fb4"/>
                                </View>
                            );
                            break;
                        default:
                            return (
                                <View key={Math.random()}>
                                    <Icon name="md-star-outline" size={18} color="#fb4"/>
                                </View>
                            );
                            break;

                    }
                })}
            </View>
        )
    }
    _renderEvaluateCount = (evaluate) => {
        switch (evaluate) {
            case 'all':
                return <Text key={Math.random()} style={styles.evaluateCount}>全部{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'perfect':
                return <Text key={Math.random()} style={styles.evaluateCount}>满意{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'disPerfect':
                return <Text key={Math.random()} style={styles.evaluateCount}>不满意{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'fast':
                return <Text key={Math.random()} style={styles.evaluateCount}>配送快{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'server':
                return <Text key={Math.random()} style={styles.evaluateCount}>服务好{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'taste':
                return <Text key={Math.random()} style={styles.evaluateCount}>美味{this.state.evaluate[evaluate]}</Text>;
                break;
            case 'img':
                return <Text key={Math.random()} style={styles.evaluateCount}>有图{this.state.evaluate[evaluate]}</Text>;
                break;
            default:
                return;
                break;
        }
        return <Text key={Math.random()} style={styles.evaluateCount}>不满意{this.state.evaluate[evaluate]}</Text>
    }
    _renderEvaluate = (item) => {
        return (
            <View
                key={Math.random()}
                style={[
                    styles.row,
                    {paddingHorizontal: 16,paddingVertical:16,borderTopWidth:1,borderColor:'#f0f0f0'}
                ]}
            >
                <Image
                    source={LocalImg[item.icon]}
                    style={[
                        {width: 40, height: 40, borderRadius: 20}
                    ]}
                />
                <View style={{flex:1}}>
                    <View
                        style={[
                            {flexDirection:'row',justifyContent:'space-between'}
                        ]}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.time}</Text>
                    </View>
                    <View style={styles.row}>
                        {this._renderStart(item.star,5)}
                    </View>
                    <Text>{item.content}</Text>
                </View>
            </View>
        );
    }
    /*获取每个section的高度*/
    _getSectionH = () => {
        this.state.keyArr.map((key) => {
            this.state.shop.goods[key].map((item) => {
            })
        })
    }
    render() {
        console.log('在render方法里');
        const {state} = this.props.navigation;
        if(state.params){
            console.log('接收到的参数',state.params.shop);
        }
        return (
            <View>
                <Image
                    source={LocalImg['bg']}
                    style={styles.bg}
                />
                <View style={styles.content}>
                    {this._renderHeader()}
                    <View style={{flex: 1, paddingBottom: 20}}>
                        <View style={[styles.row, styles.paddingV8,
                            {
                                backgroundColor: '#fff',
                                justifyContent: 'space-around',
                            },
                            this.state.pageIndex != 0
                                ? {borderBottomWidth: 1, borderColor: '#f0f0f0'}
                                : {}
                        ]}>
                            <View
                                style={styles.pageItem}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.setState({
                                            pageIndex: 0
                                        })
                                    }}
                                >
                                    <View>
                                        <Text style={[styles.pageItemText,
                                            this.state.pageIndex === 0 ? styles.pageActive : {}]}>商品</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            <View
                                style={styles.pageItem}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.setState({
                                            pageIndex: 1
                                        })
                                    }}
                                >
                                    <View>
                                        <Text style={[styles.pageItemText,
                                            this.state.pageIndex === 1 ? styles.pageActive : {}]}>评价({this.state.shop.scores})</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {this.state.pageIndex === 0
                            ? this._renderGoodsList()
                            : this._renderScores()
                        }
                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',

    },
    columnCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bg: {
        width: screenW,
        height: screenH,
        resizeMode: "cover"
    },
    line: {
        height: 1,
        backgroundColor: '#f0f0f0'
    },
    marginT4: {
        marginTop: 4
    },
    marginB4: {
        marginBottom: 4
    },
    paddingV1: {
        paddingVertical: 1
    },
    marginR6: {
        marginRight: 6
    },
    marginL16: {
        marginLeft: 16
    },
    paddingV8: {
        paddingVertical: 8
    },
    marginB2: {
        marginBottom: 2
    },
    content: {
        position: 'absolute',
        width: screenW,
        height: screenH
    },
    header: {
        backgroundColor: 'rgba(0,0,0,.3)',
        paddingHorizontal: 16
    },
    name: {
        color: '#fff',
        fontSize: 14
    },
    brandImg: {
        width: 70,
        height: 70
    },
    fengNiao: {
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 1,
        paddingVertical: 1,
        backgroundColor: '#00abff',
        marginRight: 2
    },
    time: {
        color: '#fff'
    },
    bulletin: {
        color: '#fff',
        fontSize: 12
    },
    active: {
        color: '#fff',
        fontSize: 12
    },
    pageItem: {
        // flex: 1,
    },
    pageItemText: {
        color: '#666',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingBottom: 4
    },
    pageActive: {
        color: '#00abff',
        borderBottomWidth: 2,
        borderColor: '#00abff'
    },
    slidItem: {
        width: 80,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#f8f8f8',
    },
    slideItemActive: {
        borderLeftWidth: 2,
        borderColor: '#00abff',
        backgroundColor: '#fff',
    },
    slideItemCount: {
        position: 'absolute',
        top: 3,
        right: 3,
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#f60',
        width: 18,
        height: 14,
        textAlign: "center",
        lineHeight: 14,
        paddingVertical: 1,
        borderRadius: 6,
        borderBottomLeftRadius: 0
    },
    sectionHeader: {
        position: 'relative',
        width: screenW - 80,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderLeftWidth: 2,
        borderColor: '#f0f0f0',
        backgroundColor: '#f8f8f8'
    },
    sectionItemContent: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        width: screenW - 80
    },
    sectionItemImg: {
        width: 50,
        height: 50
    },
    sectionItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionItemDesc: {
        color: '#aaa',
        fontSize: 12,
    },
    sectionPriceControl: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 12
    },
    sectionItemPrice: {
        color: '#f60',
        fontWeight: 'bold',
        fontSize: 14
    },
    serviceScores: {
        paddingVertical: 16,
        backgroundColor: '#fff'
    },
    finallyScore: {
        width: 150,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#f0f0f0'
    },
    evaluateCount: {
        fontSize: 14,
        paddingHorizontal: 8,
        marginRight: 16,
        backgroundColor: '#EBF5FF',
        paddingVertical: 4,
        color: '#333',
        marginVertical: 6
    }
});