<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
<!--meta name="layout" content="main"/-->
<!-- 实现可定制的布局 -->
    <g:if test="${layout}">
        <meta name="layout" content="${layout}"/>
    </g:if>
    <g:else>
        <g:if test="${session.layout}">
            <meta name="layout" content="${session.layout}"/>
        </g:if>
        <g:else>
            <meta name="layout" content="main"/>
        </g:else>
    </g:else>
<!-- end 实现可定制的布局 -->

    <g:set var="entityName" value="Dictionary"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${entityName}维护</title>
    <asset:javascript src="cn/edu/cup/dictionary/${entityName}.js"/>
</head>

<body>

<div class="nav">
    <ul>
        <li>
            <a href="#">
                当前字典：
            </a>
        </li>
        <li>
            <a href="#">
                <div id="currentDictionary"></div>
            </a>
        </li>
        <li>
            <a href="#">
                当前模型：
            </a>
        </li>
        <li>
            <a href="#">
                <div id="currentDataKey"></div>
            </a>
        </li>
    </ul>
</div>

<div id="operation4DataDiv" class="easyui-tabs">
</div>
</body>
</html>
