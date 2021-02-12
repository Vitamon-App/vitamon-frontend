import React from 'react'
import {Image} from 'react-native'
import { Block} from 'galio-framework';

 function StepsMonster({monsterStatus}) {
    return (
        <Block>
    {monsterStatus === 'start' && 
 <Image source={require('../../assets/stepsstart.png')} />}
      {monsterStatus === 'middle' && 
 <Image source={require('../../assets/stepsmiddle.png')} />}
      {monsterStatus === 'warning' && 
 <Image source={require('../../assets/stepswarning.png')} />}
      {monsterStatus === 'complete' && 
 <Image source={require('../../assets/stepscomplete.png')} />}
        </Block>
    )
}

export default StepsMonster