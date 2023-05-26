package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.RetryBuildTrigger
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.retryBuild
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'AllChecks'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("AllChecks")) {
    triggers {
        val trigger1 = find<RetryBuildTrigger> {
            retryBuild {
                delaySeconds = 60
            }
        }
        trigger1.apply {
            attempts = 1

        }
    }

    dependencies {
        expect(RelativeId("QodanaAnalysis")) {
            snapshot {
                onDependencyCancel = FailureAction.ADD_PROBLEM
            }
        }
        update(RelativeId("QodanaAnalysis")) {
            snapshot {
                onDependencyFailure = FailureAction.IGNORE
                onDependencyCancel = FailureAction.ADD_PROBLEM
            }
        }

    }
}
