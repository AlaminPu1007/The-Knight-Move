import {View, StyleSheet, Pressable, Image} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';

const dataArray = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

let X = [2, 1, -1, -2, -2, -1, 1, 2];
let Y = [1, 2, 2, 1, -1, -2, -2, -1];

interface itemProps {
    rowIndex: any;
    colIndex: any;
}

const HomeComponent = () => {
    const [currentIndex, setCurrentIndex] = useState<any>({
        rowIndex: 3,
        colIndex: 3,
    });

    // const [possiblePosition, setPossiblePosition] = useState<any>([]);
    const [data, setData] = useState<any>(dataArray);

    useEffect(() => {
        PossiblePositionUpdateMethod({
            rowIndex: 3,
            colIndex: 3,
        });
    }, []);

    const PossiblePositionUpdateMethod = ({rowIndex, colIndex}: itemProps) => {
        const initialMatrix: any = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        for (let i = 0; i < 8; i++) {
            let new_row: any = rowIndex + X[i];
            let new_col: any = colIndex + Y[i];

            if (new_row >= 0 && new_row < 8 && new_col >= 0 && new_col < 8) {
                initialMatrix[new_row][new_col] = 1;
                setData(initialMatrix);
            }
        }
    };

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${rotation.value}deg`}],
        };
    });

    return (
        <View style={styles.container}>
            {data.map((row: any[], rowIndex: React.Key | null | undefined) => {
                return (
                    <View key={rowIndex} style={styles.boardContainer}>
                        {row.map((col, colIndex) => {
                            const isImageVisible =
                                rowIndex === currentIndex?.rowIndex &&
                                colIndex === currentIndex?.colIndex;

                            const color =
                                // @ts-ignore
                                (rowIndex + colIndex) % 2 === 0
                                    ? 'white'
                                    : '#769656';

                            return (
                                <Pressable
                                    key={colIndex}
                                    onPress={() => {
                                        PossiblePositionUpdateMethod({
                                            rowIndex,
                                            colIndex,
                                        });
                                        setCurrentIndex({
                                            rowIndex,
                                            colIndex,
                                        });
                                        rotation.value = withSequence(
                                            withTiming(-10, {duration: 50}),
                                            withRepeat(
                                                withTiming(50, {
                                                    duration: 500,
                                                }),
                                                6,
                                                true,
                                            ),
                                            withTiming(0, {duration: 100}),
                                        );
                                    }}
                                    style={[
                                        styles.boardStyle,
                                        {backgroundColor: color},
                                    ]}>
                                    {col === 1 && (
                                        <Animated.Text
                                            style={[
                                                styles.pointStyles,
                                                animatedStyle,
                                            ]}>
                                            *
                                        </Animated.Text>
                                    )}

                                    {isImageVisible ? (
                                        <Image
                                            source={require('../assets/images/hors.png')}
                                            style={styles.imageStyles}
                                        />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    boardStyle: {
        width: '12.5%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        elevation: 0.5,
        zIndex: -10,
    },
    imageStyles: {width: 30, height: '100%'},
    starStyles: {
        backgroundColor: 'red',
        fontSize: 20,
        color: 'red',
        zIndex: 1000,
    },
    pointStyles: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#001',
    },
});

export default memo(HomeComponent);
