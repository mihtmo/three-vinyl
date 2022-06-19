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
        <>
            <mesh
                ref={mesh}
                onPointerOver={(event) => {
                    hover(true);
                    event.stopPropagation();
                }}
                onPointerOut={() => hover(false)}
                position={props.heatPosition}
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
                            <br />
                            Precipication: {props.precip}"
                        </div>
                    </Html>
                )}
                    <cylinderGeometry
                        args={props.heatShape} 
                />
                <meshStandardMaterial
                    roughness={0}
                    opacity={props.opacity}
                    transparent 
                    visible={props.visible}
                    color={hovered ? 'yellow' : '#ffffff' }
                >
                    <GradientTexture 
                        stops={[0, 1]}
                        colors={[props.highColor, props.lowColor]}
                        size={100}
                    />
                </meshStandardMaterial>
            </mesh>
            {props.precip !== 0 && (
                <mesh
                ref={mesh}
                onPointerOver={(event) => {
                    hover(true);
                    event.stopPropagation();
                }}
                onPointerOut={() => hover(false)}
                position={props.rainPosition}
                castShadow={true}
                renderOrder={0}
                scale={hovered ? [2, 1, 2] : 1}
                >
                    <cylinderGeometry
                        args={props.rainShape} 
                />
                <meshStandardMaterial
                    roughness={0}
                    opacity={props.opacity}
                    transparent 
                    visible={props.visible}
                    color={hovered ? 'yellow' : '#227bb6' }
                >
                </meshStandardMaterial>
            </mesh>
        )}
    </>
    )
}

const Weatherblanket = () => {
    const visible = useControl('Visible', { group: blanketGroup, type: 'boolean', value: true});
    const opacity = useControl('Opacity', { group: blanketGroup, type: 'number', max: 1, value: 1 });
    const count = useControl('Days of the Year', { group: blanketGroup, type: 'number', min: 0, max: weatherData.length, value: weatherData.length});
    const arr = [];
    
    for (let i = 0; i < count; i++) {
        const width = 14;
        const low = weatherData[i]["temp_lo"];
        const high= weatherData[i]["temp_hi"];
        const precip = weatherData[i]["rain"];
        const lowColor = heatColorScale(low)
        const highColor = heatColorScale(high)
        const heatHeight = (high-low) * 15
        const rainHeight = precip * 100
        const positionX = (-(count * width) / 2) + (i * width);
        const heatPositionY = (((high-low)/2) + low * 15) - 400;
        const rainPositionY = -500 + (rainHeight / 2)
        const positionZ = -100;
        const date = (weatherData[i]["date"]).toLocaleString('default', { month: 'long' })
 
        
        arr.push(
            <Weatherbar precip={precip} date={date} high={high} low={low} visible={visible} key={weatherData[i]["date"]} highColor={highColor} lowColor={lowColor} opacity={opacity} heatShape={[(width - 5)/2, (width - 5)/2, heatHeight, 16, 1]} rainShape={[(width - 5)/2, (width - 5)/2, rainHeight, 16, 1]} rainPosition={[positionX, rainPositionY, positionZ]} heatPosition={[positionX, heatPositionY, positionZ]}/>
        );
    
    }
    return arr; 
}

export default Weatherblanket