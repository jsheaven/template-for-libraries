#!/usr/bin/env node
'use strict'

import * as colors from 'kleur/colors'
import yargs from 'yargs-parser'
import { templateName } from './templateName'
import { getOwnVersion } from './version'

export type Arguments = yargs.Arguments

export enum Commands {
  HELP = 'help',
  VERSION = 'version',
  TEMPLATE_NAME = 'templateName',
}

export type Command = 'help' | 'version' | 'templateName'

export interface CLIState {
  cmd: Command
  options: {
    foo?: string
  }
}

/** Determine which action the user requested */
export const resolveArgs = (flags: Arguments): CLIState => {
  const options: CLIState['options'] = {
    foo: typeof flags.foo === 'string' ? flags.foo : undefined,
  }

  if (flags.version) {
    return { cmd: 'version', options }
  } else if (flags.help) {
    return { cmd: 'help', options }
  }

  const cmd: Command = flags._[2] as Command
  switch (cmd) {
    case 'help':
      return { cmd: 'help', options }
    case 'templateName':
      return { cmd: 'templateName', options }
    default:
      return { cmd: 'version', options }
  }
}

/** Display --help flag */
const printHelp = () => {
  console.error(`
  ${colors.bold('template-name')} - does templateName

  ${colors.bold('Commands:')}
    templateName          Does templateName.
    version               Show the program version.
    help                  Show this help message.

  ${colors.bold('Flags:')}
    --foo <string>        A value to use in the CLI
    --version             Show the version number and exit.
    --help                Show this help message.

  ${colors.bold('Example(s):')}
    npx @jsheaven/template-name --foo X
`)
}

/** display --version flag */
const printVersion = async () => {
  console.log((await getOwnVersion()).version)
}

/** The primary CLI action */
export const cli = async (args: string[]) => {
  const flags = yargs(args)
  const state = resolveArgs(flags)
  const options = { ...state.options }

  console.log(
    colors.dim('>'),
    `${colors.bold(colors.yellow('template-name'))} @ ${colors.dim((await getOwnVersion()).version)}: ${colors.magenta(
      colors.bold(state.cmd),
    )}`,
    colors.gray('...'),
  )

  switch (state.cmd) {
    case 'help': {
      printHelp()
      process.exit(0)
    }
    case 'version': {
      await printVersion()
      process.exit(0)
    }
    case 'templateName': {
      try {
        await templateName({
          foo: options.foo,
        })
      } catch (e) {
        throwAndExit(e)
      }
      process.exit(0)
    }
    default: {
      throw new Error(`Error running ${state.cmd}`)
    }
  }
}

const printError = (err: any) => console.error(colors.red(err.toString() || err))

/** Display error and exit */
const throwAndExit = (err: any) => {
  printError(err)
  process.exit(1)
}

try {
  cli(process.argv)
} catch (error) {
  console.error(error)
  process.exit(1)
}
