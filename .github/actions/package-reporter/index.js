

const core = require('@actions/core')
const fs = require('fs')
const path = require('path')

async function run() {
  try {
    // 1. Read package.json from the workspace root
    //    HINT: The workspace root is available as process.env.GITHUB_WORKSPACE
    //    Use path.join() and fs.readFileSync() then JSON.parse()
    const packageJsonPath = path.join(process.env.GITHUB_WORKSPACE, 'package.json')
    const packageJsonContents = JSON.parse(fs.readFileSync(packageJsonPath))

    // 2. Extract name, version, dependencies, devDependencies
    const {name, version, dependencies, devDependencies} = packageJsonContents

    // 3. Count the deps (Object.keys(...).length — handle the case where
    //    dependencies or devDependencies might be undefined/missing)
    const dependenciesLen = Object.keys(dependencies ?? {}).length
    const devDependenciesLen = Object.keys(devDependencies ?? {}).length

    // 4. Log each value with core.info()
    core.info(`App name: ${name}`)
    core.info(`Version: ${version}`)
    core.info(`Dependencies: ${dependenciesLen}`)
    core.info(`Dev dependencies: ${devDependenciesLen}`)

    // 5. Set the app-version output with core.setOutput()
    core.setOutput("app-version", version)

    // 6. Write a summary table with core.summary
    //    Include: App Name, Version, Dependencies count, Dev Dependencies count
    await core.summary.addHeading('Package report').addTable([
        [{data: 'Field', header: true}, {data: 'Value', header:true}],
        ['App Name', name],
        ['Version', version],
        ['Dependencies Count', String(dependenciesLen)],
        ['Dev Dependencies Count', String(devDependenciesLen)]
    ]).write()

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()