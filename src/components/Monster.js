import React from 'react'
import { View, TextInput, Text, StyleSheet, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'



function SearchBar({monsterType, monsterStatus}) {
    return (
        <View style={styles.backgroundStyle}>
            {monsterType === 'Water' && monsterStatus === 'start' ? 
            <Image source={require('../../assets/waterstart.png')} style={styles.mediumLogo}/> :<View></View> }
             {monsterType === 'Water' && monsterStatus === 'middle' ? 
             <Image source={require('../../assets/watermiddle.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Water' && monsterStatus === 'warning' ? 
            <Image source={require('../../assets/waterwarning.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Water' && monsterStatus === 'complete' ? 
           <Image source={require('../../assets/watercomplete.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Water' && monsterStatus === 'fail' ? 
             <Image source={require('../../assets/waterfail.png')} style={styles.mediumLogo}/> :<View></View> }
            
            {monsterType === 'Steps' && monsterStatus === 'start' ? 
            <Image source={require('../../assets/stepsstart.png')} style={styles.mediumLogo}/> :<View></View> }
             {monsterType === 'Steps' && monsterStatus === 'middle' ? 
            <Text>Steps Middle</Text> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'warning' ? 
            <Text>Water Warning</Text> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'complete' ? 
            <Text>Steps Middle</Text> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'fail' ? 
            <Text>Steps Middle</Text> :<View></View> }


        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyles: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    mediumLogo: {
          width: 100,
          height: 100,
          alignSelf: 'center'
        }
})

export default SearchBar

