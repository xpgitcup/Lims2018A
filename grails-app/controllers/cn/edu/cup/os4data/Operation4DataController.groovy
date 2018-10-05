package cn.edu.cup.os4data

import cn.edu.cup.dictionary.DataDictionary
import cn.edu.cup.dictionary.DataKeyA
import cn.edu.cup.system.SystemChat
import grails.converters.JSON

class Operation4DataController {

    /*
    *  数据模型统计
    * */
    def countDataKey() {
        def count = 0
        def dataDictionary = DataDictionary.get(params.id)
        if (dataDictionary) {
            count = dataDictionary?.datakeys?.size()
        } else {
            count = DataKeyA.count()
        }
        println("统计结果：${count} ${dataDictionary}")
        def result = [count: count]
        if (request.xhr) {
            render result as JSON
        } else {
            result
        }
    }

    /*
    * 数学模型列表
    * */

    def listDataKeyA() {
        def dataDictionary = DataDictionary.get(params.id)
        def dataKeyAList = DataKeyA.findAllByDictionary(dataDictionary, params)
        if (request.xhr) {
            render(template: 'listDataKeyA', model: [dataKeyAList: dataKeyAList])
        } else {
            respond dataDictionaryList
        }
    }

    /*
    * 显示数据字典
    * */

    def showDataTictionary() {
        def dataDictionary = DataDictionary.get(params.id)
        if (request.xhr) {
            render(template: 'showDataDictionary', model: [dataDictionary: dataDictionary])
        } else {
            respond dataDictionary
        }
    }

    /*
    * 数据字典列表
    * */

    def listDataDictionary() {
        def dataDictionaryList = DataDictionary.list(params)
        if (request.xhr) {
            render(template: 'listDataDictionary', model: [dataDictionaryList: dataDictionaryList])
        } else {
            respond dataDictionaryList
        }
    }

    /*
    * 统计数据字典
    * */

    def countDictionary() {
        def count = 0
        def title = params.title
        if (title) {
            count = cn.edu.cup.dictionary.DataDictionary.countByName(title)
        } else {
            count = DataDictionary.count()
        }
        println("统计结果：${count} ${title}")
        def result = [count: count]
        if (request.xhr) {
            render result as JSON
        } else {
            result
        }
    }

    def index() {}
}
