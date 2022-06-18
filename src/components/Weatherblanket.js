import { useRef } from "react"
import { useControl } from "react-three-gui"
import weatherData from '../data/weatherdata.json'
import heatColorScale from "../data/colorscale"
import { GradientTexture } from "@react-three/drei"


const blanketGroup = 'Weatherblanket'

const Weatherbar = (props) => {
    const mesh = useRef()
    return (
        <mesh
            ref={mesh}
            position={props.position}
            castShadow={true}
            renderOrder={0}
        >
            <cylinderGeometry
                args={props.shape} 
            />
            <meshStandardMaterial
                roughness={.7}
                opacity={props.opacity}
                transparent 
                visible={props.visible}
            >
                <GradientTexture 
                    stops={[0, 1]} // As many stops as you want
                    colors={[props.highColor, props.lowColor]} // Colors need to match the number of stops
                    size={100} // Size is optional, default = 1024/
                />
            </meshStandardMaterial>
        </mesh>

    )
}

const Weatherblanket = () => {
    const visible = useControl('Visible', { group: blanketGroup, type: 'boolean', value: false});
    const opacity = useControl('Opacity', { group: blanketGroup, type: 'number', max: 1, value: 1 });
    const count = useControl('Days of the Year', { group: blanketGroup, type: 'number', min: 0, max: weatherData.length, value: weatherData.length});
    const arr = [];
    
    for (let i = 0; i < count; i++) {
        const width = 14;
        const low = weatherData[i]["temp_lo"];
        const high= weatherData[i]["temp_hi"];
        const lowColor = heatColorScale(low)
        const highColor = heatColorScale(high)
        const height = (high-low) * 15
        const positionX = (-(count * width) / 2) + (i * width);
        const positionY = (((high-low)/2) + low * 15) - 400;
        const positionZ = -100;
 
        
        arr.push(
            <Weatherbar visible={visible} key={weatherData[i]["date"]} highColor={highColor} lowColor={lowColor} opacity={opacity} shape={[(width - 5)/2, (width - 5)/2, height, 16, 1]} position={[positionX, positionY, positionZ]}/>
        );
    
    }
    return arr; 
}

export default Weatherblanket