import { useRef, useState } from "react"
import { useControl } from "react-three-gui"
import weatherData from '../data/weatherdata.json'
import heatColorScale from "../data/colorscale"
import { GradientTexture, Html } from "@react-three/drei"
import './Weatherblanket.css'


const blanketGroup = 'Weatherblanket'

const Weatherbar = (props) => {
    const mesh = useRef()
    const [hovered, hover] = useState(false)
    return (
        <mesh
            ref={mesh}
            onPointerOver={(event) => {
                hover(true);
                event.stopPropagation();
            }}
            onPointerOut={() => hover(false)}
            position={props.position}
            castShadow={true}
            renderOrder={0}
            scale={hovered ? [2, 1, 2] : 1}
        >
            {hovered && props.visible && (
                <Html scaleFactor={10}>
                    <div className="tooltip">
                        <p className="tooltip-header">Date: {props.date}</p>
                        High Temperature: {props.high}&deg;F
                        <br />
                        Low Temperature: {props.low}&deg;F
                    </div>
                </Html>
            )}
                <cylinderGeometry
                    args={props.shape} 
            />
            <meshStandardMaterial
                roughness={0}
                opacity={props.opacity}
                transparent 
                visible={props.visible}
                color={hovered ? 'yellow' : '#ffffff' }
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
        const date = (weatherData[i]["date"]).toLocaleString('default', { month: 'long' })
 
        
        arr.push(
            <Weatherbar date={date} high={high} low={low} visible={visible} key={weatherData[i]["date"]} highColor={highColor} lowColor={lowColor} opacity={opacity} shape={[(width - 5)/2, (width - 5)/2, height, 16, 1]} position={[positionX, positionY, positionZ]}/>
        );
    
    }
    return arr; 
}

export default Weatherblanket