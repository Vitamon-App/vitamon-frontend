import React from 'react'
import {Image} from 'react-native'
import { Block} from 'galio-framework';

 function WaterMonster({monsterStatus}) {
    return (
        <Block>
    {monsterStatus === 'start' && 
 <Image source={require('../../assets/waterbaby2.gif')} />}
      {monsterStatus === 'middle' && 
 <Image source={require('../../assets/watermiddle.png')} />}
      {monsterStatus === 'warning' && 
 <Image source={require('../../assets/waterwarning.png')} />}
      {monsterStatus === 'complete' && 
 <Image source={require('../../assets/watercomplete.png')} />}
        </Block>
    )
}

export default WaterMonster