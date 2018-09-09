package lims2018a

class BootStrap {

    def initService
    def grailsApplication

    def init = { servletContext ->
        environments {
            development {
                def controllers = grailsApplication.controllerClasses
                initService.initSystemData(controllers)
                initService.fillSamples()
                configureForDevelopment(servletContext);
            }
            production {
                configureForDevelopment(servletContext);
            }
        }
    }

    def destroy = {
    }

    /**
     * 初始化代码__开发环境下的初始化代码
     */
    def configureForDevelopment(servletContext) {
        println "这是开发环境..."
        def webRootDir = servletContext.getRealPath("/")
        def scriptPaths = ["${webRootDir}scripts/system", "${webRootDir}scripts/physical"]
        println "BootStrap ${webRootDir}"
        scriptPaths.each { e ->
            initService.loadScripts(e)
        }
    }

    /**
     * 发布后的初始化代码
     */
    def configureForProduction() {
        println "这是发布环境..."
        def webRootDir = servletContext.getRealPath("/")
        def scriptPath = "${webRootDir}scripts/system"
        println "BootStrap ${webRootDir}"
        initService.loadScripts(scriptPath)
    }

}
