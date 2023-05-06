import React from 'react'
import BottomSheetModal from '.'
import useItemCategoryQuery from '../../apis/item/hooks/useItemCategoryQuery'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import { ModalWrapper } from './ItemBrandSelectModal'
import { ChipWrapper } from './ItemPlaceInputModal'
import ButtonMedium from '../ButtonMedium/ButtonMedium'

export const CategoryListState = atom<Category[]>({
  key: atomKeys.CategoryListState,
  default: [
    {
      id: 1,
      name: '상의',
      subCategoryList: [
        {
          id: 10,
          name: '반소매',
        },
        {
          id: 11,
          name: '긴소매',
        },
        {
          id: 12,
          name: '맨투맨',
        },
        {
          id: 13,
          name: '후드티',
        },
        {
          id: 14,
          name: '블라우스',
        },
        {
          id: 15,
          name: '셔츠',
        },
        {
          id: 16,
          name: '니트',
        },
        {
          id: 17,
          name: '민소매',
        },
        {
          id: 18,
          name: '기타',
        },
      ],
    },
    {
      id: 2,
      name: '아우터',
      subCategoryList: [
        {
          id: 19,
          name: '후드집업',
        },
        {
          id: 20,
          name: '가디건',
        },
        {
          id: 21,
          name: '자켓',
        },
        {
          id: 22,
          name: '점퍼',
        },
        {
          id: 23,
          name: '코트',
        },
        {
          id: 24,
          name: '패딩',
        },
        {
          id: 25,
          name: '무스탕,퍼',
        },
        {
          id: 26,
          name: '기타',
        },
      ],
    },
    {
      id: 3,
      name: '바지',
      subCategoryList: [
        {
          id: 27,
          name: '반바지',
        },
        {
          id: 28,
          name: '면바지',
        },
        {
          id: 29,
          name: '데님바지',
        },
        {
          id: 30,
          name: '슬랙스',
        },
        {
          id: 31,
          name: '트레이닝',
        },
        {
          id: 32,
          name: '기타',
        },
      ],
    },
    {
      id: 4,
      name: '치마',
      subCategoryList: [
        {
          id: 33,
          name: '미니스커트',
        },
        {
          id: 34,
          name: '미디스커트',
        },
        {
          id: 35,
          name: '롱스커트',
        },
        {
          id: 36,
          name: '기타',
        },
      ],
    },
    {
      id: 5,
      name: '원피스',
      subCategoryList: [
        {
          id: 37,
          name: '미니원피스',
        },
        {
          id: 38,
          name: '미디원피스',
        },
        {
          id: 39,
          name: '롱원피스',
        },
        {
          id: 40,
          name: '점프수트',
        },
        {
          id: 41,
          name: '기타',
        },
      ],
    },
    {
      id: 6,
      name: '뷰티',
      subCategoryList: [
        {
          id: 42,
          name: '스킨케어',
        },
        {
          id: 43,
          name: '메이크업',
        },
        {
          id: 44,
          name: '헤어&바디',
        },
        {
          id: 45,
          name: '향수',
        },
        {
          id: 46,
          name: '기타',
        },
      ],
    },
    {
      id: 7,
      name: '패션잡화',
      subCategoryList: [
        {
          id: 47,
          name: '신발',
        },
        {
          id: 48,
          name: '모자',
        },
        {
          id: 49,
          name: '가방',
        },
        {
          id: 50,
          name: '시계',
        },
        {
          id: 51,
          name: '주얼리',
        },
        {
          id: 52,
          name: '폰케이스',
        },
        {
          id: 53,
          name: '기타',
        },
      ],
    },
    {
      id: 8,
      name: '라이프',
      subCategoryList: [
        {
          id: 54,
          name: '홈웨어',
        },
        {
          id: 55,
          name: '가구',
        },
        {
          id: 56,
          name: '생활용품',
        },
        {
          id: 57,
          name: '기타',
        },
      ],
    },
    {
      id: 9,
      name: '기타',
      subCategoryList: [],
    },
  ],
})

export const selectedParentCategoryIdState = atom<number>({
  key: atomKeys.selectedParentCategoryIdState,
  default: 1,
})
export const selectedSubCategoryIdState = atom<number>({
  key: atomKeys.selectedSubCategoryIdState,
  default: 1,
})

export interface Category {
  id: number
  name: string
  subCategoryList?: Category[]
}

const ItemCategoryModal = () => {
  const { closeModal } = useModals()
  const categoryList = useRecoilValue(CategoryListState)
  const [selectedParentCategory, setSelectedParentCategory] = useRecoilState(
    selectedParentCategoryIdState,
  )

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()
  console.log(data)
  console.log(categoryList)

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header
            isModalHeader={true}
            title={'아이템 종류'}
            modalCloseBtnClick={() => closeModal(modals.ItemCategoryModal)}
          />
        </div>
        <ChipWrapper>
          {categoryList.map((category) => {
            return (
              <ButtonMedium
                key={category.id}
                text={category.name}
                type='pri'
                active={selectedParentCategory === category.id}
                onClick={() => setSelectedParentCategory(category.id)}
              ></ButtonMedium>
            )
          })}
        </ChipWrapper>
        {/* <SubCategoryWrapper></SubCategoryWrapper> */}
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCategoryModal

// const ParentCategoryWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `
// const SubCategoryWrapper = styled.div`
//   display: flex;
//   padding: 0 1.25rem
//   width: 100%;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `

// const HotWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow-x: scroll;
//   width: 100%;
//   margin-top: 1.5rem;
//   margin-bottom: 1.25rem;
//   span {
//     ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
//     margin: 0.5625rem 0 0.5625rem 1.25rem;
//   }
