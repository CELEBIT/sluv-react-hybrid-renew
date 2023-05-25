import React from 'react'
import {
  EditReportContainer,
  EditReportListWrapper,
  ReasonWrapper,
  Title,
} from '../editRequest/styles'
import Header from '../../../components/Header/Header'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'

const ReportItem = () => {
  const reasonList = [
    '스팸 / 홍보성 게시글이에요',
    '셀럽에게 피해가 가는 게시글이에요',
    '주제와 맞지 않는 게시글이에요',
    '해당 게시글로 도배되었어요',
    '외설적인 표현이 담겨있어요',
    '기타',
  ]
  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title='게시글 신고'></Header>
      <ReasonWrapper>
        <Title>게시글을 신고하는 이유를 알려주세요</Title>
        <EditReportListWrapper>
          {reasonList.map((reason) => {
            return (
              <DisplayField key={reason}>
                <span>{reason}</span>
              </DisplayField>
            )
          })}
        </EditReportListWrapper>
      </ReasonWrapper>
    </EditReportContainer>
  )
}

export default ReportItem
