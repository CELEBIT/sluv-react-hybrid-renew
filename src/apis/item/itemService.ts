
import request from '../core';
import { GetResponseType } from '../core/type';

export interface ParentCategoryResult {
  id: number;
  name: string;
  subCategoryList?: Array<SubCategoryResult>;
}
export interface SubCategoryResult {
  id: number;
  name: string;
}

export default class ItemService {
  itemUrl: string;

  constructor() {
    this.itemUrl = '/app/item';
  }

  // 아이템 카테고리 조회
  async getItemCategory() {
    const data: GetResponseType<Array<ParentCategoryResult>> = await request.get(
      `${this.itemUrl}/category`
    );
    
    return data.result;
  }
}