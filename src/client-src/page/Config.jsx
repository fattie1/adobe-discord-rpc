/*
 * File: Config.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:23 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Saturday, 25th November 2023 6:09:15 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, {useEffect, useState} from 'react';
import ConfigItem from '../components/ConfigItem'
import { dispatchEvent } from '..';
import { extensionConfigurationTemplate, getConfigurations, resetConfiguration, rpcConfigurationTemplate, setConfiguration } from "../../rpc_client-src/localstorage"
function ResetConfig(){
    dispatchEvent("com.tee.rpc.reset", {})
    window.location.reload()
    resetConfiguration()
}
function SaveConfig(config){    
    dispatchEvent("com.tee.rpc.config", config)
    for (const [key, value] of Object.entries(config)){
        console.log(key)
        setConfiguration(key, value)
    }
    // window.location.reload()
    console.log(config)
}
export default function Config() {

    const [config, setConfig] = useState({})

    useEffect(() => {
        setConfig(getConfigurations())
    }, [])

    return (
        <div className='w-screen'>
            <div className='flex flex-col'>
                <ConfigItem group="rpc" config={config} setConfig={setConfig} title="Rich Presence Configuration" template={rpcConfigurationTemplate} />
                <ConfigItem group="extension" config={config} setConfig={setConfig} title="Extension Configuration" template={extensionConfigurationTemplate} />

                <div className='flex flex-row gap-2 self-center'>
                    <button onClick={() => SaveConfig(config)} className='bg-button p-2 text-xs text-white rounded-sm'>Save Configuration</button>
                    <button onClick={() => ResetConfig()} className='bg-transparent border border-error p-2 text-xs text-white rounded-sm'>Reset Default</button>
                </div>
            </div>
        </div>

    )
}