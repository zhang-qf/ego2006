import axios from '../utils/request'
import base from './base'
var api = {
  //登录
  getLogin(params) {
    return axios.post(base.baseUrl + base.login, params)
  },
  //注册
  getRegister(params) {
    return axios.post(base.baseUrl + base.register, params)
  },
  //商品查询
  select(params) {
    return axios.get(base.baseUrl + base.selectTbItemAllByPage, { params })
  },
  //商品条数
  total() {
    return axios.get(base.baseUrl + base.total)
  },
  //模糊查询
  search(params) {
    return axios.get(base.baseUrl + base.search, { params })
  },
  //增加商品
  insertTbItem(params) {
    return axios.get(base.baseUrl + base.insertTbItem, { params })
  },
  /**
  * 类目选择
  */
  selectItemCategoryByParentId(params) {
    return axios.get(base.baseUrl + base.selectItemCategoryByParentId, {
      params
    })
  },
  /**
     * 删除产品
     */
  deleteItemById(params) {
    return axios.get(base.baseUrl + base.deleteItemById, {
      params
    })
  },
  /**
   * 预更新
   */
  preUpdateItem(params) {
    return axios.get(base.baseUrl + base.preUpdateItem, {
      params
    })
  },
  /**
   * 修改商品
   */
  updateTbItem(params) {
    return axios.get(base.baseUrl + base.updateTbItem, {
      params
    })
  },
  /**
   * 类目预更新
   */
  preCategory(params) {
    return axios.get(base.baseUrl + base.preCategory, {
      params
    })
  },


 /**
     * 规格参数读取数据
     */
    selectItemParamAll(params){
      return axios.get(base.baseUrl + base.selectItemParamAll,{
          params
      })
  },
  /**
   * 规格参数模糊查询
   */
  paramsSearch(params){
      return axios.get(base.baseUrl + base.paramsSearch,{
          params
      })
  },
  /**
   * 规格参数删除
   */
  paramsDelete(params){
      return axios.get(base.baseUrl + base.paramsDelete,{
          params
      })
  },
  /**
   * 规格参数总条数
   */
  paramsTotal(){
      return axios.get(base.baseUrl + base.paramsTotal)
  },
  /**
   * 规格参数添加
   */
  insertItemParam(params){
      return axios.get(base.baseUrl + base.insertItemParam,{
          params
      })
  },
  /**
   * 规格参数配和产品添加
   */
  paramsItem(params){
      return axios.get(base.baseUrl + base.paramsItem,{
          params
      })
  },

/**
     * 内容分类管理 导航查询
     */
    selectContentCategoryByParentId(params){
      return axios.get(base.baseUrl + base.selectContentCategoryByParentId,{
          params
      })
  },
   /**
   * 内容分类管理 添加导航
   */
  insertContentCategory(params){
      return axios.get(base.baseUrl + base.insertContentCategory,{
          params
      })
  },
   /**
   * 内容分类管理 修改导航
   */
  updateContentCategory(params){
      return axios.get(base.baseUrl + base.updateContentCategory,{
          params
      })
  },
  /**
   * 内容分类管理 删除导航
   */
  deleteContentCategoryById(params){
      return axios.get(base.baseUrl + base.deleteContentCategoryById,{
          params
      })
  },
  /**
   * 内容分类管理 内容添加
   */
  insertTbContent(params){
      return axios.get(base.baseUrl + base.insertTbContent,{
          params
      })
  },
  /**
   * 内容分类管理 内容查询
   */
  selectTbContentAllByCategoryId(params){
      return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId,{
          params
      })
  },
   /**
   * 内容分类管理 内容删除
   */
  deleteContentByIds(params){
      return axios.get(base.baseUrl + base.deleteContentByIds,{
          params
      })
  }


  
}

export default api