package cn.edu.cup.common

import jxl.Workbook
import jxl.write.WritableSheet
import jxl.write.WritableWorkbook

class ExcelByJxlService {

    /*
    * 对象导出到excel文件
    *
    * objectModel:
    * head
    * data
    * */

    def exportDataTable2ExcelFile(objectModel, fileName) {

        if (objectModel.head && objectModel.data) {
            File file = new File(fileName)
            WritableWorkbook book = WorkBook.createWorkBook(file)
            WritableSheet sheet = book.createSheet("Sheet1", 0)

            objectModel.head.each { e ->
                
            }
        } else {
            println("${objectModel}格式不对！")
        }
    }
}
