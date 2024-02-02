import type { ProcessorConfig } from './processorConfig'
import fs from 'fs'
import { assertNotNull } from '@subsquid/substrate-processor'

export const BLACKLIST_CONFIG: IBlackListConfing = getJSON(
  'assets/blacklist-config.json'
)

interface IBlackListConfing {
  blacklistItems: string[]
  argsStringMaxLengthLimit: number
}

function getJSON(filename: string) {
  const data = fs.readFileSync(filename).toString()
  //console.log(data)
  return JSON.parse(data)
}

export function getChainConfig(): ProcessorConfig {
  let processorConfig: ProcessorConfig
  switch (process.env.CHAIN) {
    case 'kusama':
      processorConfig = require('./chains/kusama').default
      break;
    case 'polkadot':
      processorConfig = require('./chains/polkadot').default
      break;
    case 'statemint':
      processorConfig = require('./chains/statemint').default
      break;
    case 'statemine':
      processorConfig = require('./chains/statemine').default
      break;
    case 'acala':
      processorConfig = require('./chains/acala').default
      break;
    case 'karura':
      processorConfig = require('./chains/karura').default
      break;
    case 'moonriver':
      processorConfig = require('./chains/moonriver').default
      break;
    case 'moonbeam':
      processorConfig = require('./chains/moonbeam').default
      break;
    case 'moonbase':
      processorConfig = require('./chains/moonbase').default
      break;
    case 'bifrost':
      processorConfig = require('./chains/bifrost').default
      break;
    case 'phala':
      processorConfig = require('./chains/phala').default
      break;
    case 'khala':
      processorConfig = require('./chains/khala').default
      break;
    case 'gmordie':
      processorConfig = require('./chains/gmordie').default
      break;
    case 'astar':
      processorConfig = require('./chains/astar').default
      break;
    case 'shibuya':
      processorConfig = require('./chains/shibuya').default
      break;
    case 'shiden':
      processorConfig = require('./chains/shiden').default
      break;
    case 'calamari':
      processorConfig = require('./chains/calamari').default
      break;
    case 'subsocial':
      processorConfig = require('./chains/subsocial').default
      break;
    case 'efinity':
      processorConfig = require('./chains/efinity').default
      break;
    case 'rococo':
      processorConfig = require('./chains/rococo').default
      break;
    case 'interlay':
      processorConfig = require('./chains/interlay').default
      break;
    case 'hydradx':
      processorConfig = require('./chains/hydradx').default
      break;
    default:
      throw new Error(`Unsupported chain ${process.env.CHAIN}`)
  }


  const customChainNodeUrl = process.env.CHAIN_NODE_URL
  const customChainArchiveUrl = process.env.CHAIN_ARCHIVE_URL
  if(customChainNodeUrl){
    processorConfig.dataSource = {...processorConfig.dataSource, chain: customChainNodeUrl}
  }

  if(customChainArchiveUrl){
    processorConfig.dataSource = {...processorConfig.dataSource, archive: customChainArchiveUrl}
  }

  return processorConfig
}
