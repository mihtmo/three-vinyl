import { useRef, useState } from "react"
import { useControl } from "react-three-gui"
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
                position={[props.positionX, (((props.heatMidpoint)/2) + props.low * props.exaggerate) - 300, props.positionZ]}
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
                        args={[props.radius, props.radius, props.heatHeight * props.exaggerate, 16, 1]} 
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
            {props.precip !== "0.00" && (
                <mesh
                ref={mesh}
                onPointerOver={(event) => {
                    hover(true);
                    event.stopPropagation();
                }}
                onPointerOut={() => hover(false)}
                position={[props.positionX, (-500 + (props.rainHeight * props.exaggerate / 2)), props.positionZ]}
                castShadow={true}
                renderOrder={0}
                scale={hovered ? [2, 1, 2] : 1}
                >
                    <cylinderGeometry
                        args={[props.radius, props.radius, props.rainHeight * props.exaggerate, 16, 1]} 
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

const Weatherblanket = (props) => {
    const visible = useControl('Visible', { group: blanketGroup, type: 'boolean', value: true});
    const opacity = useControl('Opacity', { group: blanketGroup, type: 'number', max: 1, value: 1 });
    const exaggerate = useControl('Exaggerate', { group: blanketGroup, type: 'number', max: 20, value: 15 });
    const count = useControl('Days of the Year', { group: blanketGroup, type: 'number', min: 0, max: props.weatherData.length, value: props.weatherData.length});
    const arr = [];
    
    for (let i = 0; i < count; i++) {
        const width = 14;
        const low = props.weatherData[i][2];
        const high= props.weatherData[i][1];
        const precip = props.weatherData[i][3];
        const lowColor = heatColorScale(low)
        const highColor = heatColorScale(high)
        const heatHeight = (high-low)
        const rainHeight = precip * 10
        const positionX = (-(count * width) / 2) + (i * width);
        const positionZ = -100;
        const heatMidpoint = high - low
        const date = (props.weatherData[i][0]).toLocaleString('default', { month: 'long' })
 
        
        arr.push(
            <Weatherbar
                        exaggerate={exaggerate}
                        heatMidpoint={heatMidpoint}
                        precip={precip} 
                        date={date} 
                        high={high} 
                        low={low} 
                        visible={visible} 
                        key={props.weatherData[i][0]} 
                        highColor={highColor} 
                        lowColor={lowColor} 
                        opacity={opacity} 
                        radius={(width - 5)/2}
                        heatHeight={heatHeight}
                        rainHeight={rainHeight}
                        positionX={positionX}
                        positionZ={positionZ} />
        );
    
    }
    return arr; 
}

export default Weatherblanket