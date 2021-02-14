import React from 'react'
import {Image, Dimensions} from 'react-native'
import { Block} from 'galio-framework';
const { width, height } = Dimensions.get('screen');

function GifMonster({monsterStatus, monsterType}){
    if(monsterType === 'Steps'){
        return (
            <Block>
        {monsterStatus === 'start' && 
     <Image source={require('../../assets/Stepsstart.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'middle' && 
     <Image source={require('../../assets/Stepsmiddle.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'warning' && 
     <Image source={require('../../assets/Stepswarning.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'complete' && 
     <Image source={require('../../assets/Stepscomplete.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
            </Block>
        )
    } else 
    if (monsterType === 'Water'){
        return (
            <Block>
        {monsterStatus === 'start' && 
     <Image source={require('../../assets/Waterstart.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'middle' && 
     <Image source={require('../../assets/Watermiddle.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'warning' && 
     <Image source={require('../../assets/Waterwarning.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
          {monsterStatus === 'complete' && 
     <Image source={require('../../assets/Watercomplete.gif')} resizeMode="cover"
     style={{
       width,
       height: height * 0.4,
     }}/>}
            </Block>
        )
    }
}


export default GifMonster