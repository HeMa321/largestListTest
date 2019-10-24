/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,

} from 'react-native';
import {LargeList} from "react-native-largelist-v3";

const SCREEN_WIDTH = Dimensions.get('window').width;
const cookData = require("./datas.json").result.directoryVoList;
const deptVoList = require("./datas.json").result.dirDeptVoList;
const directoryVoLists = require("./dept.json").result.directoryVoList;

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            directoryVoList: cookData
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.view_row}>
                    <LargeList
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                        ref={sectionList => this.listView = sectionList}
                        data={this.state.directoryVoList}
                        initialContentOffset={{x: 0, y: 0}}
                        heightForSection={() => 30}
                        renderSection={this._renderSection}
                        heightForIndexPath={() => 50}
                        renderIndexPath={this._renderItem}
                        renderHeader={this._renderHeader}
                    />
                    {/*{listChar}*/}
                </View>
            </View>
        );
    }

    _renderSection = (section: number) => {
        let contact = this.state.directoryVoList[section];
        return (
            <TouchableOpacity style={styles.section}>
                <Text style={[styles.sectionText]}>{contact.header}</Text>
            </TouchableOpacity>
        );
    };

    _renderHeader = () => {
        let headList = [];
        headList.push(
            deptVoList.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item.deptName + index + ''}
                        activeOpacity={1}
                        onPress={() => {
                            // console.warn(index);
                            this.setState({
                                directoryVoList: directoryVoLists
                            })
                        }}
                    >
                        <View style={[styles.view_name]}>
                            <Image style={styles.left_icon} source={require('./imgs/icon1.png')}/>
                            <Text style={[{
                                fontSize: 17,
                                color: '#000', marginLeft: 20
                            }]}>{item.deptName}</Text>
                            <Text style={{position: 'absolute', right: 40}}>{item.staffNum}</Text>
                        </View>
                        <View style={styles.line}/>
                    </TouchableOpacity>
                )
            })
        );
        return <View>{headList}</View>
    };

    _renderItem = ({section: section, row: row}) => {
        let contact = this.state.directoryVoList[section].items[row];
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {

                }}
            >
                <View style={styles.person_layout}>
                    <View style={{marginHorizontal: 10}}>
                        <Text key={contact.userId} style={{
                            fontSize: 15,
                            color: '#000'
                        }}>{contact.name}</Text>
                        {
                            '' !== contact.rank &&
                            <Text key={contact.namePinyin} style={styles.rank_tv}>{contact.rank}</Text>
                        }
                    </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        );
    };

}

const styles = StyleSheet.create({
    view_row: {
        flex: 1,
        flexDirection: 'row',
    },
    section: {
        flex: 1,
        backgroundColor: '#F5F5F9',
        justifyContent: "center"
    },
    sectionText: {
        marginLeft: 18,
        fontSize: 14,
        color: '#000'
    },
    deptTitle_hor: {
        height: 45,
        width: SCREEN_WIDTH,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8
    },
    dept_title_view: {
        paddingLeft: 8,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    view_name: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 50,
        paddingHorizontal: 18,
    },
    left_icon: {
        width: 25,
        height: 25,
        padding: 5
    },
    line: {
        position: "absolute",
        left: 18,
        right: 18,
        bottom: 0,
        height: 0.4,
        backgroundColor: '#DDDDDD'
    },
    person_layout: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        backgroundColor: '#FFF',
        // backgroundColor: Colors.work_btn,
    },
});
