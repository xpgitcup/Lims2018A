/**
 * Created by LiXiaoping on 2018/8/25.
 */

var pageSize = 10

/*
* 说明：
*     listFunction -- 数据列表函数，用户自定义的
*     countFunction --- 数据统计函数，用户自定义
* */

/*
* 通用的tab页管理函数---不包括翻页控制
* */

function tabPagesManagerWithPagination(tabsName, tabNameList, listFunction, countFunction) {

    // 初始设置
    var defaultTab = tabNameList[0];
    var currentTab = readCookie("current" + tabsName, defaultTab);
    var tabsDiv = $("#" + tabsName);

    var countFunction = eval(countFunction);
    var listFunction = eval(listFunction);

    //动态创建各个标签页
    console.info(tabNameList);
    for (x in tabNameList) {
        console.info("创建：" + x);
        var title = tabNameList[x];

        tabsDiv.tabs('add', {
            title: title,
            closable:false
        })

        //插入到tab中
        tabsDiv.tabs('select', x)
        var tab = tabsDiv.tabs('getSelected');
        //显示页面
        var listDiv = $('<div>' + title + '</div>');
        listDiv.attr('id', 'list' + title + 'Div');
        listDiv.appendTo(tab)
        //分页Div
        var paginationDiv = $('<div class="easyui-pagination"></div>');
        paginationDiv.attr('id', 'pagination' + title + 'Div');
        paginationDiv.appendTo(tab)
        //分页设置
        var total = countFunction(title)
        paginationDiv.pagination({
            pagesize: pageSize,
            total: total,
            onSelectPage: function (pageNumber, pageSize) {
                var ct = tabsDiv.tabs('getSelected').panel('options').title;    //这一句是关键啊
                console.info("翻页：" + ct);
                listFunction(ct, pageNumber, pageSize)
            }
        })
    }

    // 设置标签管理函数
    tabsDiv.tabs({
            onSelect: function (title, index) {
                //记录tabs的缺省页面，所以采用tabsName
                console.info(tabsName + "--选择标签：" + title + "--" + index);
                $.cookie("current" + tabsName, title, {path: '/'});
                //------------------------------------------------------------------------------------------------------
                loadFirstData(title, listFunction);
            }
        }
    );

    // 打开缺省的标签
    tabsDiv.tabs("select", currentTab);
    loadFirstData(currentTab, listFunction);

}

/*
* 通用的tab页管理函数---不包括翻页控制
* */

function tabPagesManager(tabsName, tabNameList, listFunction) {
    // 初始设置
    var defaultTab = tabNameList[0];
    var currentTab = readCookie("current" + tabsName, defaultTab);
    var tabsDiv = $("#" + tabsName);

    // 设置标签管理函数
    tabsDiv.tabs({
            onSelect: function (title, index) {
                //记录tabs的缺省页面，所以采用tabsName
                console.info(tabsName + "--选择标签：" + title + "--" + index);
                $.cookie("current" + tabsName, title, {path: '/'});
                //------------------------------------------------------------------------------------------------------
                loadFirstData(title, listFunction);
            }
        }
    );

    // 打开缺省的标签
    tabsDiv.tabs("select", currentTab);
    loadFirstData(currentTab, listFunction);
}

function loadFirstData(title, listFunction) {
    //var tabPagination = "paginationListAppsDiv" + title;
    //var tp = $("#" + tabPagination);
    //console.info("加载数据..." + tabPagination + tp);
    //tp.pagination('refresh');
    var page = readCookie("curregtPage" + title, 1);
    var listFunction = eval(listFunction);
    listFunction(title, page, pageSize);
}

/*
* 加载页面的数据
* */
function loadTabPageDefaultData(title, listFunction, countFunction) {

    console.info("加载缺省页面数据...");

    var countFunction = eval(countFunction);
    var listFunction = eval(listFunction);

    //首先获取缺省的页面，获取页大小，获取总数
    var currentPage = readCookie("currentPage" + title, 1);
    var cpageSize = readCookie("pageSize" + title, pageSize);
    var totalCount = countFunction(title);
    console.info("当前页：" + title + ":" + currentPage + "总数：" + totalCount);
    listFunction(title, currentPage, cpageSize)
}

