import { PointerLockControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'


const Player = (props) => {
    const { camera } = useThree()

    const ref = useRef(() => ({
        position: [0, 10, 0],
        ...props
    }))

    useFrame(() => {
        camera.position.copy(ref.current.position)
    })

    return (
        <>
            <PointerLockControls />
            <mesh ref={ref}></mesh>
        </>
    )
}

export default Player;