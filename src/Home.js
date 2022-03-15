
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';

export default function Home() {
    const [data, setData] = useState()
    const [active, setActive] = useState(true)
    const GetData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setActive(false)
            })
    }
    useEffect(() => {
        GetData()
    }, [])
    if (active) {
        return (
            <ActivityIndicator size={60} color="#00ff00" style={styles.activeIndictor} />
        )
    }
    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>Data from API</Text>
            <ScrollView horizontal>

                <FlatList
                    data={data}
                    ItemSeparatorComponent={() => (<View style={{ height: 3, width: '100%', backgroundColor: 'black' }}></View>)}
                    style={styles.dataflatList}
                    renderItem={({ item }) => (
                        <View style={styles.fcontainer}>
                            <Text style={{ marginLeft: 10, width: 25, textAlignVertical: 'center' }}>{item.id}</Text>
                            <Text style={{ marginLeft: 10, width: 200, textAlignVertical: 'center' }}>{item.title}</Text>
                            <Text style={{ marginLeft: 10, width: 300 }}>{item.body}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fcontainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    dataflatList: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    headerText: {
        alignSelf: 'center'
    },
    activeIndictor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
});
