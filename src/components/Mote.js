import { useRef } from "react"

const Mote = () => {
    const mesh = useRef()

    return (
        <mesh
            position={[100, 100, 100]}>
            <sphereGeometry
                args={[1, 1, 1]}
            />
            <meshBasicMaterial
                color={"white"}
            />
        </mesh>
    )
}

export default Mote;