import React from 'react'
import { Img, Item } from '../../../../../../apis/question/questionService.type'

interface VoteData {
  data: Img | Item
}

function VotePercent({ data }: VoteData) {
  console.log(data, 'data in vote percent')
  return <div>percent</div>
}

export default VotePercent
