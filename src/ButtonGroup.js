import PropTypes from 'prop-types';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, ViewPropTypes as RNViewPropTypes } from 'react-native';
import Colors from '../utility/Colors';
import normalize from '../utility/NormalizedText';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const ButtonGroup = props => {
    const {
        component: Component,
        buttons,
        onPress,
        selectedIndex,
        selectedIndexes,
        selectMultiple,
        containerStyle,
        innerBorderStyle,
        lastBorderStyle,
        buttonStyle,
        textStyle,
        selectedTextStyle,
        selectedButtonStyle,
        underlayColor,
        activeOpacity,
        onHideUnderlay,
        onShowUnderlay,
        setOpacityTo,
        containerBorderRadius,
        disableSelected,
        isHorizontal,
        ...attributes
    } = props;

    return (
        <ScrollView
            horizontal={isHorizontal}
            bounces={false}
            bouncesZoom={false}
            alwaysBounceVertical={false}
            {...attributes}
            style={[styles.container, containerStyle && containerStyle]}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
        >
            {buttons.map((button, i) => {
                const isSelected = selectedIndex === i || selectedIndexes.includes(i);

                return (
                    <Component
                        activeOpacity={activeOpacity}
                        setOpacityTo={setOpacityTo}
                        onHideUnderlay={onHideUnderlay}
                        onShowUnderlay={onShowUnderlay}
                        underlayColor={underlayColor || Colors.primary}
                        disabled={!!(disableSelected && isSelected)}
                        onPress={() => {
                            if (selectMultiple) {
                                if (selectedIndexes.includes(i)) {
                                    onPress(selectedIndexes.filter(index => index !== i));
                                } else {
                                    onPress([...selectedIndexes, i]);
                                }
                            } else {
                                onPress(i);
                            }
                        }}
                        key={i}
                        style={[
                            styles.button,
                            i < buttons.length - 1 && {
                                borderRightWidth:
                                    i === 0
                                        ? 0
                                        : (innerBorderStyle && innerBorderStyle.width) || 1,
                                borderRightColor:
                                    (innerBorderStyle && innerBorderStyle.color) || Colors.grey4,
                            },
                            i === 1 && {
                                borderLeftWidth:
                                    (innerBorderStyle && innerBorderStyle.width) || 1,
                                borderLeftColor:
                                    (innerBorderStyle && innerBorderStyle.color) || Colors.grey4,
                            },
                            i === buttons.length - 1 && {
                                ...lastBorderStyle,
                                borderTopRightRadius: containerBorderRadius,
                                borderBottomRightRadius: containerBorderRadius,
                            },
                            i === 0 && {
                                borderTopLeftRadius: containerBorderRadius,
                                borderBottomLeftRadius: containerBorderRadius,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.textContainer,
                                buttonStyle && buttonStyle,
                                isSelected && {
                                    backgroundColor: Colors.primary,
                                },
                                isSelected && selectedButtonStyle && selectedButtonStyle,
                            ]}
                        >
                            {button.element ? (
                                <button.element />
                            ) : (
                                <Text
                                    style={[
                                        styles.buttonText,
                                        textStyle && textStyle,
                                        isSelected && { color: '#fff' },
                                        isSelected && selectedTextStyle,
                                    ]}
                                >
                                    {button}
                                </Text>
                            )}
                        </View>
                    </Component>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        //flex: 1
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    container: {
        // marginLeft: 10,
        // marginRight: 10,
        // marginBottom: 5,
        // marginTop: 5,
        // borderColor: '#e3e3e3',
        // borderWidth: 1,
        //flexDirection: 'column',
        //borderRadius: 3,
        //margin: 10,
        //overflow: 'hidden',
        //backgroundColor: 'red',
        // height: 100
    },
    buttonText: {
        fontSize: normalize(13),
        color: Colors.grey2,
        ...Platform.select({
            ios: {
                fontWeight: '500',
            },
        }),
        textAlign: 'center'
    },
});

ButtonGroup.propTypes = {
    button: PropTypes.object,
    component: PropTypes.any,
    onPress: PropTypes.func,
    buttons: PropTypes.array,
    containerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    selectedTextStyle: Text.propTypes.style,
    selectedButtonStyle: ViewPropTypes.style,
    underlayColor: PropTypes.string,
    selectedIndex: PropTypes.number,
    selectedIndexes: PropTypes.arrayOf(PropTypes.number),
    activeOpacity: PropTypes.number,
    onHideUnderlay: PropTypes.func,
    onShowUnderlay: PropTypes.func,
    setOpacityTo: PropTypes.any,
    innerBorderStyle: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
    }),
    lastBorderStyle: PropTypes.oneOfType([
        ViewPropTypes.style,
        Text.propTypes.style,
    ]),
    buttonStyle: ViewPropTypes.style,
    containerBorderRadius: PropTypes.number,
    disableSelected: PropTypes.bool,
    selectMultiple: PropTypes.bool,
    isHorizontal: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    selectedIndexes: [],
    selectMultiple: false,
    containerBorderRadius: 3,
    onPress: () => {},
    component: Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback,
    isHorizontal: false
};

export default ButtonGroup;
