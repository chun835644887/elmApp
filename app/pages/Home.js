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
    TextInput,
    TouchableWithoutFeedback,
    SectionList,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalImage from '../images';
import LBSModal from '../component/lbsModal';
import Shops from '../data'

var Dimensions = require('Dimensions');
export default class Home extends Component {
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
            location: '厦门同安', /*地址*/
            searchFocus: false, /*焦点*/
            searchText: '', /*搜索输入*/
            foodTypeArr: ['肯德基', '烤肉', '吉野家', '粥', '必胜客', '一品生煎', '星巴克',
                '肯德基1', '烤肉1', '吉野家1', '粥1', '必胜客1', '一品生煎1', '星巴克1'],
            lbsModalFlag: false, /*lbsModal是否显示*/
            screenW: Dimensions.get('window').width,
            foodType: [
                ['美食', '甜品饮品', '商店超市', '预定早餐', '果蔬生鲜', '新店特惠', '准时达', '高铁订餐'],
                ['土豪推荐', '鲜花蛋糕', '汉堡炸鸡', '日韩料理', '麻辣烫', '披萨意面', '川湘菜', '包子粥店']
            ], /*食物分类*/
            foodTypeActiveIndex: 0,
            hotArr: ["热卖套餐", "霸王餐", "年货到新家", "5折优惠餐"], /*热卖*/
            limitTimeArr: ["全素冒菜套餐", "荤素套餐", "培根餐", "酸汤水饺"], /*限时抢购*/
            qualityArr: ["田老师红烧肉", "必胜宅急送", "嘉和一品", "西贝莜面村", "宏状元", "汉拿山韩式石锅拌饭", "U鼎冒菜", "阿香米线"], /*品质优选*/
            giftArr: [
                [{title: '推荐有奖1', giftText: '5元现金拿不停1', giftImg: 'coupon0'},
                    {title: '领券中心1', giftText: '代金券领取1', giftImg: 'coupon1'}],
                [{title: '推荐有奖2', giftText: '5元现金拿不停2', giftImg: 'coupon0'},
                    {title: '领券中心2', giftText: '代金券领取2', giftImg: 'coupon1'}]
            ], /*礼物*/
            shopArr: Shops.list,
            keyColorArr: ['#F07373', '#73F08E']
        }
    }
    /*输入框icon和提示文字位置*/
    searchIconPosition = () => {
        if (this.state.searchText !== '') {
            return {
                display: 'none'
            }
        }
        if (this.state.searchText === '') {
            return {
                alignSelf: 'center'
            }
        }
    }
    /*生成key*/
    _keyExtractor = (item, index) => {
        return index + Math.random()
    };
    /*重新定位设置location*/
    setLocation = (location) => {
        this.setState({
            location: location
        })
    }
    /*关闭lbsmodal*/
    closeLbsModal = () => {
        this.setState({
            lbsModalFlag: false
        })
    }
    scrollFoodType = (index) => {
        let scrollView = this.refs.foodTypeScrollView;
        scrollView.scrollTo({
            x: this.state.screenW * index,
            y: 0,
            animated: true
        })
    }
    /*头部，定位，查找，*/
    _renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.rowBetweenCenter}>
                        <TouchableWithoutFeedback style={styles.rowBetweenCenter}
                                                  onPress={() => {
                                                      this.setState({
                                                          lbsModalFlag: true
                                                      });
                                                  }}
                        >
                            <View style={styles.rowBetweenCenter}>
                                <Icon name='ios-pin' size={18} color="#fff"/>
                                <Text style={styles.locationText}>{this.state.location}</Text>
                                <Icon name="md-arrow-dropdown" color="#fff" size={16}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.rowBetweenCenter}>
                            <View style={[styles.columnCenter, {marginRight: 6}]}>
                                <Text style={styles.tempText}>3</Text>
                                <Text style={styles.weatherText}>阵雨</Text>
                            </View>
                            <Icon name="ios-flash-outline" size={22} color="#fff"/>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={{height: 28, paddingHorizontal: 12}}>
                        <View style={
                            {
                                position: 'relative',
                                marginTop: 12,
                                marginBottom: 12
                            }
                        }>
                            <TextInput style={{
                                backgroundColor: '#fff',
                                color: '#666',
                                borderRadius: 14,
                                height: 28,
                                fontSize: 18,
                                paddingTop: 5,
                                paddingBottom: 5
                            }} underlineColorAndroid="transparent"
                                       value={this.state.searchText}
                                       onFocus={() => {
                                           this.setState({
                                               searchFocus: true
                                           })
                                       }}
                                       onChangeText={(text) => {
                                           this.setState({
                                               searchText: text
                                           });
                                       }}
                            />
                            <View style={[
                                {
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bottom: 2,
                                    alignSelf: 'center'
                                }, this.searchIconPosition()
                            ]}>
                                <Icon name="ios-search" size={18} color="#333"/>
                                <Text style={{color: '#666', fontSize: 18}}>请输入商家，商品名称</Text>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.foodTypeArr}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity
                                    style={
                                        {
                                            marginRight: 12,
                                            marginTop: 12,
                                            marginBottom: 12
                                        }
                                    }
                                    activeOpacity={0.6}
                                >
                                    <Text style={
                                        {
                                            color: '#fff'
                                        }
                                    }>{item.item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
    /*分类*/
    /*有个关于key的警告*/
    _renderTypes = () => {
        const w = this.state.screenW / 4, h = w * .6 + 20
        let renderSwipeView = (item, index) => {
            return (
                <FlatList
                    key={Math.random()}
                    numColumns={4}
                    keyExtractor={this._keyExtractor}
                    data={item}
                    renderItem={(item) => {
                        let img = 'h' + (item.index + index * 8);
                        return (
                            <View
                                style={[
                                    {width: w, height: h},
                                    styles.columnCenter
                                ]}>
                                <Image
                                    source={LocalImage[img]}
                                    style={{width: w * 0.5, height: h * 0.5}}
                                />
                                <Text>{item.item}</Text>
                            </View>
                        )
                    }}
                />
            );
        }
        return (
            <View style={{
                position: 'relative',
                backgroundColor: '#fff'
            }}>
                <ScrollView
                    keyExtractor={this._keyExtractor}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => {
                        let offsetX = e.nativeEvent.contentOffset.x;
                        this.setState({
                            foodTypeActiveIndex: Math.round(offsetX / this.state.screenW)
                        });
                    }}
                    ref="foodTypeScrollView"
                >
                    {this.state.foodType.map(renderSwipeView)}
                </ScrollView>
                <View style={styles.rowCenter}>
                    {this.state.foodType.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={Math.random()}
                                onPress={() => {
                                    this.scrollFoodType(index)
                                }}
                            >
                                <View>
                                    <Text style={
                                        {
                                            color: this.state.foodTypeActiveIndex == index
                                                ? '#666'
                                                : '#aaa',
                                            fontSize: 30
                                        }
                                    }>&bull;</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        );
                    })}
                </View>
            </View>
        );
    }
    /*广告*/
    _renderAD = () => {
        return (
            <View style={[styles.paddingH16, styles.marginV12, {backgroundColor: '#fff'}]}>
                <ScrollView>
                    <Image
                        source={LocalImage['ad1']}
                        style={
                            {
                                width: this.state.screenW - 32,
                                height: (this.state.screenW - 32) * 0.25
                            }
                        }
                    />
                </ScrollView>
            </View>
        );
    }
    /*热销*/
    _renderHot = () => {
        let _renderHotScroll = (hotArr) => {
            return (
                <FlatList
                    keyExtractor={(item, index) => {
                        return this._keyExtractor(item, index);
                    }}
                    numColumns={2}
                    data={this.state.hotArr}
                    renderItem={(item, index) => {
                        let hotImg = 'hot' + item.index;
                        return (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={[
                                    styles.rowCenter,
                                    {width: this.state.screenW / 2, height: 70}
                                ]}>
                                <View style={[
                                    styles.columnCenter,
                                    {marginLeft: 12}
                                ]}>
                                    <Text style={{color: '#333', marginBottom: 5}}>{item.item}</Text>
                                    <Text style={{color: '#bbb'}}>{item.item}</Text>
                                </View>
                                <Image
                                    source={LocalImage[hotImg]}
                                    style={
                                        {
                                            width: 50,
                                            height: 50,
                                            marginLeft: 12
                                        }
                                    }
                                />

                            </TouchableOpacity>
                        );
                    }}
                />
            )
        }
        return (
            <ScrollView
                horizontal={true}
                style={[styles.marginV12, {backgroundColor: '#fff'}]}
            >
                {_renderHotScroll(this.state.hotArr)}
            </ScrollView>
        )
    }
    /*限时抢购*/
    _renderLimitTime = () => {
        let _renderLimitTimeItem = (item, index) => {
            return (
                <View style={[styles.columnCenter, {marginRight: 16},]}>
                    <Image
                        source={LocalImage['sale0']}
                        style={{width: 85, height: 85}}
                    />
                    <Text>{item.item}</Text>
                    <View style={styles.rowCenter}>
                        <Text style={{
                            color: '#f60',
                            fontWeight: 'bold',
                            fontSize: 14,
                            marginRight: 2
                        }}>￥99</Text>
                        <Text style={{
                            color: '#aaa',
                            fontSize: 12,
                            textDecorationLine: 'line-through'
                        }}>￥139</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={[styles.paddingH16, {backgroundColor: '#fff'}, styles.marginV12]}>
                <View style={[styles.rowBetweenCenter, {marginBottom: 12}]}>
                    <View style={styles.rowCenter}>
                        <Text style={
                            {
                                color: '#666',
                                fontSize: 14,
                                marginRight: 6
                            }
                        }>限时抢购</Text>
                        <Text style={
                            {
                                color: '#aaa',
                                fontSize: 12,
                                marginRight: 6
                            }
                        }>距离结束</Text>
                        <Text style={styles.timeText}>01</Text>
                        <Text>:</Text>
                        <Text style={styles.timeText}>07</Text>
                        <Text>:</Text>
                        <Text style={styles.timeText}>10</Text>
                    </View>
                    <View style={styles.rowCenter}>
                        <Text style={
                            {
                                fontSize: 14,
                                color: '#aaa',
                                marginRight: 6,
                            }
                        }>更多</Text>
                        <Icon name="ios-arrow-forward" size={16} color="#aaa"/>
                    </View>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={() => <View></View>}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.limitTimeArr}
                    renderItem={_renderLimitTimeItem}
                />
            </View>
        );
    }
    /*品质优先*/
    _renderQuality = () => {
        let _renderQualityItem = (item, index) => {
            let size = (this.state.screenW - 32 ) / 4 - 16;
            return (
                <View style={[styles.columnCenter, {
                    marginVertical: 12,
                    marginRight: 16,
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }]}>
                    <Image
                        source={LocalImage['nice' + item.index]}
                        style={{width: size, height: size}}
                    />
                    <Text style={{
                        width: size,
                        fontSize: 12,
                        color: '#333',
                        marginVertical: 5,
                        textAlign: 'center'
                    }} numberOfLines={1}
                    >{item.item}</Text>
                    <Text numberOfLines={1} style={styles.qtag}>大牌精选</Text>
                </View>
            );

        }
        return (
            <View style={[styles.paddingH16, {backgroundColor: '#fff'}, styles.marginV12]}>
                <View style={[styles.rowBetweenCenter, {marginBottom: 12}]}>
                    <View style={styles.rowCenter}>
                        <Text style={
                            {
                                color: '#666',
                                fontSize: 14,
                                marginRight: 6,
                                marginTop: 6
                            }
                        }>品质优选</Text>
                    </View>
                    <View style={styles.rowCenter}>
                        <Text style={
                            {
                                fontSize: 14,
                                color: '#aaa',
                                marginRight: 6,
                            }
                        }>更多</Text>
                        <Icon name="ios-arrow-forward" size={16} color="#aaa"/>
                    </View>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={() => <View></View>}
                    showsHorizontalScrollIndicator={false}
                    numColumns={4}
                    data={this.state.qualityArr}
                    renderItem={_renderQualityItem}
                />
            </View>
        );
    }
    /*礼物*/
    _renderGift = () => {
        let renderGift = (itemArr, index) => {
            let size = (this.state.screenW - 32) / 2;
            return (
                <View key={Math.random()}>
                    <FlatList
                        key={Math.random()}
                        keyExtractor={this._keyExtractor}
                        style={[styles.paddingV16, styles.paddingH16]}
                        numColumns={2}
                        data={itemArr}
                        renderItem={(item, index) => {
                            return (
                                <View
                                    style={[styles.rowBetweenCenter, {width: size}, item.index === 0
                                    ? {borderRightWidth: 1, borderColor: '#f0f0f0'} : {}]}>
                                    <View style={[styles.columnCenter, item.index === 1
                                        ? styles.marginL16 : {}]}>
                                        <Text numberOfLine={1} style={styles.gitTitle}>{item.item.title}</Text>
                                        <Text numberOfLine={1} style={styles.gitContent}>{item.item.giftText}</Text>
                                    </View>
                                    <Image
                                        source={LocalImage['coupon' + item.index]}
                                        style={[{width: 40, height: 40}, item.index === 0
                                            ? styles.marginR16 : {}]}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>

            );
        }
        return (
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={[styles.marginV12, {backgroundColor: '#fff'}]}
            >
                {this.state.giftArr.map(renderGift)}
            </ScrollView>
        );
    }
    /*推荐商家*/
    _renderShop = () => {
        const {navigate} = this.props.navigation;
        return (
            <View style={[styles.paddingH16, {backgroundColor: '#fff'}, styles.marginV12]}>
                <View style={[styles.rowBetweenCenter, {marginBottom: 12}]}>
                    <View style={styles.rowCenter}>
                        <Text style={
                            {
                                color: '#666',
                                fontSize: 14,
                                marginRight: 6,
                                marginTop: 6
                            }
                        }>推荐商家</Text>
                    </View>
                </View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.shopArr}
                    renderItem={(item) => {
                        let activity = !(item.item.activities == undefined);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('ShopDetail',{shop:item.item,title:item.item.name})
                                }}
                                activeOpacity={0.6}
                                style={[{borderBottomWidth: 1, borderColor: '#f0f0f0'}, styles.paddingV16]}
                            >
                                <View style={[styles.marginV12, {flexDirection: 'row'}]}>
                                    <Image
                                        source={LocalImage.bg}
                                        style={
                                            {width: 70, height: 70}
                                        }
                                    />
                                    <View style={[styles.marginL4, {flex: 1}]}>
                                        <View style={[styles.row, {justifyContent: 'space-between'}, styles.marginB4]}>
                                            <View style={styles.row}>
                                                <Text style={styles.brand}>品牌</Text>
                                                <Text numberOfLine={1} style={styles.shopName}>{item.item.name}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                {item.item.bao ? <Text style={styles.shopTag}>保</Text> : <Text></Text>}
                                                {item.item.piao ? <Text style={styles.shopTag}>票</Text> : <Text></Text>}
                                            </View>
                                        </View>
                                        <View style={[styles.row, {
                                            flex: 1,
                                            justifyContent: 'space-between'
                                        }, styles.marginB4]}>
                                            <View style={styles.rowCenter}>
                                                <Icon name='md-star' size={18} color="#fb4"/>
                                                <Icon name='md-star' size={18} color="#fb4"/>
                                                <Icon name='md-star' size={18} color="#fb4"/>
                                                <Icon name='md-star-half' size={18} color="#fb4"/>
                                                <Icon name="md-star-outline" size={18} color="#ccc"/>
                                                <Text style={styles.shopScores}>{item.item.scores}</Text>
                                                <Text style={styles.shopSale}>月售{item.item.sale}单</Text>
                                            </View>
                                            <View style={[styles.rowCenter]}>
                                                {item.item.ontime ? <Text style={styles.onTime}>准时送达</Text> :
                                                    <Text></Text>}
                                                {item.item.fengniao ? <Text style={styles.fengNiao}>蜂鸟配送</Text> :
                                                    <Text></Text>}
                                            </View>
                                        </View>
                                        <View style={[styles.row, {justifyContent: 'space-between'}, styles.marginB4]}>
                                            <View style={styles.rowCenter}>
                                                <Text style={styles.minPrice}>{item.item.startPay}</Text>
                                                <Text style={styles.deliverPay}>{item.item.deliverPay}</Text>
                                                <Text style={styles.evOnePay}>{item.item.evOnePay}</Text>
                                            </View>
                                            <View style={styles.rowCenter}>
                                                <Text style={styles.journey}>{item.item.journey}</Text>
                                                <Text style={styles.time}>{item.item.time}</Text>
                                            </View>
                                        </View>

                                        <View>
                                            {
                                                activity ? item.item.activities.map((item, index) => {
                                                    return (
                                                        <View key={Math.random()} style={[styles.row, {marginBottom: 2}]}>
                                                            <Text
                                                                style={[styles.activityKey, {backgroundColor: this.state.keyColorArr[index % 2]}]}>{item.key}</Text>
                                                            <Text style={styles.activityContent}>{item.text}</Text>
                                                        </View>
                                                    )
                                                }) : <View></View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        );
                    }}
                />
            </View>
        );
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this._renderHeader()}
                    {this._renderTypes()}
                    {this._renderAD()}
                    {this._renderHot()}
                    {this._renderLimitTime()}
                    {this._renderQuality()}
                    {this._renderGift()}
                    {this._renderShop()}
                </ScrollView>

                <LBSModal
                    lbsModalFlag={this.state.lbsModalFlag}
                    closeLbsModal={(this.closeLbsModal).bind(this)}
                    location={this.state.location}
                    // setLocation={(this.setLocation).bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBetweenCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    header: {
        backgroundColor: '#0398ff',
        paddingHorizontal: 16
    },
    paddingH16: {
        paddingHorizontal: 16
    },
    paddingH4: {
        paddingHorizontal: 4
    },
    paddingH8: {
        paddingHorizontal: 8
    },
    marginL8: {
        marginLeft: 8
    },
    marginR8: {
        marginRight: 8
    },
    marginL16: {
        marginLeft: 16
    },
    marginR16: {
        marginRight: 16
    },
    marginL4: {
        marginLeft: 4
    },
    marginB4: {
        marginBottom: 4
    },
    locationWeather: {
        backgroundColor: '#0398ff',
    },
    locationText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 6
    },
    tempText: {
        fontSize: 12,
        color: '#fff'
    },
    weatherText: {
        fontSize: 15,
        color: '#fff'
    },
    timeText: {
        paddingHorizontal: 2,
        backgroundColor: '#222',
        color: '#fff',
        fontSize: 14
    },
    qtag: {
        fontSize: 12,
        borderWidth: 1,
        color: "#00abff",
        borderColor: "#00abff",
        paddingHorizontal: 4,
        paddingVertical: 3,
        borderRadius: 5
    },
    marginV12: {
        marginVertical: 12
    },
    paddingV16: {
        paddingVertical: 16
    },
    gitTitle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4
    },
    gitContent: {
        color: '#aaa',
        fontSize: 12
    },
    brand: {
        paddingHorizontal: 4,
        backgroundColor: '#FFDC37',
        paddingVertical: 2,
        fontSize: 12,
        lineHeight: 12,
        height: 16
    },
    shopName: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 2
    },
    shopScores: {
        color: '#FF6C40',
        fontSize: 12
    },
    shopSale: {
        color: '#666',
        fontSize: 12
    },
    minPrice: {
        color: '#666',
        fontSize: 12,
        paddingHorizontal: 3,
        borderRightWidth: 1,
        borderColor: '#f0f0f0'
    },
    startPay: {
        color: '#666',
        fontSize: 12,
        paddingHorizontal: 3,
        borderRightWidth: 1,
        borderColor: '#f0f0f0'
    },
    evOnePay: {
        color: '#666',
        fontSize: 12,
        paddingHorizontal: 3
    },
    shopTag: {
        color: '#aaa',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        paddingHorizontal: 2,
        paddingVertical: 3
    },
    onTime: {
        color: '#00abff',
        fontSize: 12,
        borderColor: '#00abff',
        borderWidth: 1
    },
    fengNiao: {
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 1,
        paddingVertical: 1,
        backgroundColor: '#00abff',
        marginLeft: 2
    },
    journey: {
        color: '#aaa',
        fontSize: 12,
        paddingHorizontal: 1,
    },
    time: {
        color: '#00abff',
        fontSize: 12,
        borderLeftWidth: 1,
        borderColor: '#f0f0f0',
    },
    activityKey: {
        backgroundColor: '#EF6E6E',
        fontSize: 12,
        height: 14,
        lineHeight: 14,
        color: '#fff',
    },
    activityContent: {
        fontSize: 12,
        lineHeight: 14,
        color: '#aaa'
    },
});

