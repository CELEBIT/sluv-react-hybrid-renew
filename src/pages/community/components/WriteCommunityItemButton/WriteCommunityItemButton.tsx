import React, { useState } from 'react'
import { CommunityMenuList } from '../../../../config/communityMenu'
import DropDownMenu from '../../../../components/Header/CommunityHeader/DropDownMenu'
import { Menu } from '../../../../components/Header/CommunityHeader/DropDownMenu/styles'
import { ReactComponent as Add } from '../../../../assets/add_18.svg'
import { ReactComponent as Write } from '../../../../assets/writeCommunity_40.svg'
import { ReactComponent as QuestionIcon } from '../../../../assets/askQuestion_24.svg'
import { ReactComponent as WriteIcon } from '../../../../assets/write_community_13.svg'

import { ReactComponent as Close } from '../../../../assets/closeCommunity_40.svg'
import { useNavigate } from 'react-router-dom'
import { ButtonText, WriteCommunityItemButtonWrapper, WriteQuestionButton } from './styles'

interface WriteButtonProps {
  isTop: boolean
}

const WriteCommunityItemButton = ({ isTop }: WriteButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <WriteCommunityItemButtonWrapper>
      {menuOpen === true ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <DropDownMenu top={-110}>
            {CommunityMenuList.map((menu) => {
              return (
                <Menu key={menu.name} onClick={() => navigate(menu.url)}>
                  <Add></Add>
                  <span>{menu.name}</span>
                </Menu>
              )
            })}
          </DropDownMenu>
          <Close onClick={() => setMenuOpen(!menuOpen)}></Close>
        </div>
      ) : (
        <>
          {isTop ? (
            <WriteQuestionButton onClick={() => setMenuOpen(!menuOpen)} hasButtonText>
              <QuestionIcon></QuestionIcon>
              <ButtonText>질문하기</ButtonText>
            </WriteQuestionButton>
          ) : (
            <WriteQuestionButton onClick={() => setMenuOpen(!menuOpen)}>
              <QuestionIcon></QuestionIcon>
            </WriteQuestionButton>
          )}
        </>
      )}
    </WriteCommunityItemButtonWrapper>
  )
}

export default WriteCommunityItemButton
