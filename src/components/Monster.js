import React from 'react'
import { View, StyleSheet, Image } from 'react-native'




function Monster({monsterType, monsterStatus}) {
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
        <Image source={require('../../assets/stepsmiddle.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'warning' ? 
            <Image source={require('../../assets/stepswarning.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'complete' ? 
            <Image source={require('../../assets/stepscomplete.png')} style={styles.mediumLogo}/> :<View></View> }
            {monsterType === 'Steps' && monsterStatus === 'fail' ? 
           <Image source={require('../../assets/stepsfail.png')} style={styles.mediumLogo}/> :<View></View> }


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

export default Monster

