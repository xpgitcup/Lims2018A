var operation4DataDiv;

$(function () {
    operation4DataDiv = $("#operation4DataDiv");
    console.info("数据字典维护...");
    var tabList = ["数据字典", "数据模型", "数据项"]
    tabPagesManagerWithPagination("operation4DataDiv", tabList, loadDictionaryData, countDictionaryData);

    var dictionary = readCookie("currentDictionary", 1);
    $("#currentDictionary").html(dictionary);

    var dataKey = readCookie("currentDataKey", 1);
    $("#currentDataKey").html(dataKey);
})

/*
* 显示当前数据字典
* */
function editDataDictionary(id) {
    console.info("编辑数据字典:" + id);
    ajaxRun("operation4Data/editDataTictionary?id=" + id, 0, "list" + "数据字典" + "Div");
}

/*
* 显示当前数据字典
* */
function showDataDictionary(id) {
    console.info("显示数据字典:" + id);
    ajaxRun("operation4Data/showDataTictionary?id=" + id, 0, "list" + "数据字典" + "Div");
}

/*
* 选择当前数据字典
* */
function selectCurrentDictionary(id) {
    $.cookie("currentDictionary", id)
    console.info("记录当前字典：" + id);
    operation4DataDiv.tabs("select", "数据模型");
    document.location.reload();//当前页面
}

/*
* 统计数据
* */
function countDictionaryData(title) {
    console.info("统计数据:" + title + "...");
    var total = 0
    switch (title) {
        case "数据字典":
            total = ajaxCalculate("operation4Data/countDictionary");
            break;
        case "数据模型":
            var dictionary = readCookie("currentDictionary", 1)
            total = ajaxCalculate("operation4Data/countDataKey?id=" + dictionary);
            break;
        case "数据项":
            break;
    }
    console.info("统计结果：" + total);
    return total;
}

/*
* 调取数据
* */
function loadDictionaryData(title, page, pageSize) {
    console.info("调取数据：" + title + " 页码 " + page + "页大小" + pageSize);
    var params = getParams(page, pageSize) + "&title=" + title;    //getParams必须是放在最最前面！！
    console.info(params)
    switch (title) {
        case "数据字典":
            ajaxRun("operation4Data/listDataDictionary" + params, 0, "list" + title + "Div");
            break;
        case "数据模型":
            var dictionary = readCookie("currentDictionary", 1)
            params += ("&id=" + dictionary)
            ajaxRun("operation4Data/listDataKeyA" + params, 0, "list" + title + "Div");
            break;
        case "数据项":
            break;
    }
    $.cookie("currentPage" + title, page);
}

