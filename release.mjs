import { access, rmSync, promises as fs } from 'fs'
import path from 'path'

const exist = async (path) => {
  return new Promise((res) => {
    access(path, (err) => {
      if (!!err) {
        res(false)
      } else {
        res(true)
      }
    })
  })
}

const copyFiles = async (sourceFolder, destinationFolder) => {
  try {
    // Check if the source folder exists
    await fs.access(sourceFolder)

    // Create the destination folder if it doesn't exist
    await fs.mkdir(destinationFolder, { recursive: true })

    // Read all files from the source folder
    const files = await fs.readdir(sourceFolder)

    // Loop through each file and copy it to the destination folder
    for (const file of files) {
      const sourceFile = path.join(sourceFolder, file)
      const destinationFile = path.join(destinationFolder, file)

      // Check if the current item is a file or a folder
      const stat = await fs.stat(sourceFile)
      if (stat.isFile()) {
        await fs.copyFile(sourceFile, destinationFile)
        console.log(`Copied file: ${file}`)
      } else if (stat.isDirectory()) {
        // Recursively copy subdirectory
        await copyFiles(sourceFile, destinationFile)
      }
    }

    console.log(`All files copied from "${sourceFolder}" to "${destinationFolder}"`)
  } catch (error) {
    console.error(`An error occurred: ${error.message}`)
  }
}
const CURRENT_DIR = process.cwd()
const DIST_FOLDER = path.join(CURRENT_DIR, 'dist')
const RELEASE_FOLDER = path.join(CURRENT_DIR, 'release')

//mkdir release && cp -r dist package.json LICENSE README.md release/
const main = async () => {
  if (!(await exist(DIST_FOLDER))) {
    throw Error(`Missing build folder '${DIST_FOLDER}'`)
  }

  //remove folder
  if (await exist(RELEASE_FOLDER)) {
    rmSync(RELEASE_FOLDER, { recursive: true, force: true })
  }

  //create folder
  await copyFiles(DIST_FOLDER, path.join(RELEASE_FOLDER, 'dist'))
  await fs.copyFile(path.join(CURRENT_DIR, 'LICENSE'), path.join(RELEASE_FOLDER, 'LICENSE'))
  await fs.copyFile(path.join(CURRENT_DIR, 'README.md'), path.join(RELEASE_FOLDER, 'README.md'))

  //readin package.json
  const packageJsonRaw = await fs.readFile(path.join(CURRENT_DIR, 'package.json'))
  const packageJson = JSON.parse(packageJsonRaw.toString())
  delete packageJson['scripts']
  delete packageJson['devDependencies']
  delete packageJson['dependencies']

  await fs.writeFile(path.join(RELEASE_FOLDER, 'package.json'), JSON.stringify(packageJson, null, 2))
}
main()
