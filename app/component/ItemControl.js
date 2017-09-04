import React, {Component} from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ItemControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:this.props.item.item.count
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {this.state.count > 0
                    ? <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            if(this.props.item.item.count == 1){
                                this.props.setCount(this.props.item.index, this.props.item.section.title, 0,false);
                                this.setState({
                                    count:0
                                });
                            }else{
                                this.props.setCount(
                                    this.props.item.index,
                                    this.props.item.section.title,
                                    this.props.item.item.count - 1,
                                    false
                                );
                                this.setState({
                                    count:this.props.item.item.count - 1
                                });
                            }
                        }}
                    >
                        <Icon name='ios-remove-circle-outline' size={26} color="#3190e8"
                        />
                    </TouchableOpacity>
                    : <TouchableOpacity></TouchableOpacity>}

                {this.state.count > 0
                    ? <Text style={[styles.count]}>{this.props.item.item.count}</Text>
                    : <Text></Text>}

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        if(this.props.item.item.count == undefined || this.props.item.item.count == 0){
                            this.props.setCount(this.props.item.index, this.props.item.section.title, 1,true);
                            this.setState({
                                count:1
                            });
                        }else{
                            this.props.setCount(
                                this.props.item.index,
                                this.props.item.section.title,
                                this.props.item.item.count + 1,
                                true
                            );
                            this.setState({
                                count:this.props.item.item.count + 1
                            });
                        }
                    }}
                >
                    <Icon name='ios-add-circle' size={26} color='#3190e8'/>
                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    count: {
        width: 26,
        textAlign: 'center',
        fontSize: 12
    },
    displayN:{
        display:'none'
    },
});