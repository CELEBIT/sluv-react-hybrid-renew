export const queryKeys = {
  termsAgree: ['termsAgree'] as const,
  getIdInfo: ['getIdInfo'] as const,
  getMarketingAgreeStatus: ['getMarketingAgreeStatus'] as const,
  itemCategory: ['itemCategory'] as const,
  brandRecentSelected: ['brandRecentSelected'] as const,
  brandTop: ['brandTop'] as const,
  tempItem: ['tempItem'] as const,
  getTempCount: ['getTempCount'] as const,
  searchBrand: (brandName: string) => ['searchBrand', brandName] as const,
  hotPlace: ['hotPlace'] as const,
  recentPlace: ['recentPlace'] as const,
  interestCeleb: ['interestCeleb'] as const,
  interestCelebWithCategory: ['interestCelebWithCategory'] as const,
  otherUserInterestCeleb: (userId: number) => ['otherUserInterestCeleb', userId] as const,
  otherUserInterestCelebWithCategory: (userId: number) =>
    ['otherUserInterestCelebWithCategory', userId] as const,
  hotCeleb: ['hotCeleb'] as const,
  recentCeleb: ['recentCeleb'] as const,
  searchCeleb: (celebName: string) => ['searchCeleb', celebName] as const,
  itemDetail: (itemId: number) => ['itemDetail', itemId] as const,
  sameCelebItem: (itemId: number) => ['sameCelebItem', itemId] as const,
  sameBrandItem: (itemId: number) => ['sameBrandItem', itemId] as const,
  sameScrapItem: (itemId: number) => ['sameScrapItem', itemId] as const,
  searchHashtag: (name: string) => ['searchHashtag', name] as const,
  searchRank: () => ['searchRank'] as const,
  recentViewItem: ['recentViewItem'] as const,
  scrapItem: ['scrapItem'] as const,
  userUploadItem: ['userUploadItem'] as const,
  otherUserUploadItem: (userId: number) => ['otherUserUploadItem', userId] as const,
  getOtherUserClosetList: (userId: number) => ['otherUserClosetList', userId] as const,
  userClosetList: ['userClosetList'] as const,
  otherUserClosetList: (userId: number) => ['otherUserClosetList', userId] as const,
  searchItem: (keyword: string) => ['searchItem', keyword] as const,
  questionDetail: (questionId: number) => ['questionDetail', questionId] as const,
  comment: (questionId: number) => ['comment', 'questionDetail', questionId] as const,
  commentDetail: (commentId: number) => [commentId] as const,
  subcomment: (commentId: number, size?: number) =>
    ['subcomment', 'questionDetail', 'comment', commentId, size] as const,
  recommendWait: (questionId: number) => ['recommendWait', questionId] as const,
  howAboutWait: (questionId: number) => ['howAboutWait', questionId] as const,
  findWait: (questionId: number) => ['findWait', questionId] as const,
  buyWait: (questionId: number) => ['buyWait', questionId] as const,
  recentSearch: ['recentSearch'] as const,
  searchKeywordPreview: (keyword: string) => ['searchKeywordPreview', keyword] as const,
  searchTotal: (keyword: string) => ['searchTotal', keyword] as const,
  searchAllData: (keyword: string) => ['searchAllData', keyword] as const,
  recommendHotItem: ['recommendHotItem'] as const,
  buyNowItem: ['buyNowItem'] as const,
  curationItem: ['curationItem'] as const,
  trendItem: ['trendItem'] as const,
  howAboutItem: ['howAboutItem'] as const,
  luxuryItem: ['luxuryItem'] as const,
  newItem: ['newItem'] as const,
  efficientItem: ['efficientItem'] as const,
  hotCelebItem: (standard: string) => ['hotCelebItem', standard] as const,
  getHotSluver: (celebId?: number) => ['getHotSluver', celebId] as const,
  getQuestionTotalList: ['getQuestionTotalList'] as const,
  getQuestionHotList: ['getQuestionHotList'] as const,
  deleteQuestion: (questionId?: number) => ['deleteQuestion', questionId] as const,
  getSelectCelebList: ['getSelectCelebList'] as const,
  searchSelectCeleb: (celebName: string) => ['searchSelectCeleb', celebName] as const,
  getMypageInfo: ['getMypageInfo'] as const,
  getOtherUserMypageInfo: (userId: number) => ['getOtherUserMypageInfo', userId] as const,
  userFollowerList: ['userFollowerList'] as const,
  userFollowingList: ['userFollowingList'] as const,
  otherUserFollowerList: (userId: number) => ['otherUserFollowerList', userId] as const,
  otherUserFollowingList: (userId: number) => ['otherUserFollowingList', userId] as const,
  userLikeItem: ['userLikeItem'] as const,
  userUploadQuestion: ['userUploadQuestion'] as const,
  userUploadComment: ['userUploadComment'] as const,
  recentViewCommunityItem: ['recentViewCommunityItem'] as const,
  likedComment: ['likedComment'] as const,
  likedQuestion: ['likedQuestion'] as const,
  noticeList: ['noticeList'] as const,
  getNotificationList: ['getNotificationList'] as const,
  getNotificationReadStatus: ['getNotificationReadStatus'] as const,
  noticeDetail: (noticeId: number) => ['noticeDetail', noticeId] as const,
  readNofitication: (notificationId: number) => ['readNofitication', notificationId] as const,
  getCommunityBannerItems: ['getCommunityBannerItems'] as const,
  getSearchRank: ['getSearchRank'] as const,
  getQuestionFindList: (celebId?: number) => ['getQuestionFindList', celebId] as const,
  getQuestionBuyList: (voteStatus?: string) => ['getQuestionBuyList', voteStatus] as const,
  getQuestionHowAboutList: (celebId?: number) => ['getQuestionHowAboutList', celebId] as const,
  getQuestionRecommendList: (hashtag?: string) => ['getQuestionRecommendList', hashtag] as const,
  searchCommunity: (keyword: string) => ['searchCommunity', keyword] as const,
  searchUser: (keyword: string) => ['searchUser', keyword] as const,
}
