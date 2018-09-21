package cn.edu.cup.dictionary

class ChartConfig {

    DataKeyA dataKeyA
    ChartType chartType

    static constraints = {
    }

    String toString() {
        return "${chartType}.${dataKeyA}"
    }
}
