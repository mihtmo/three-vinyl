import { createContext, useContext, useState } from 'react';
import './GUI.css'

const ScaleContext = createContext();

const GUIframe = (props) => {
  return (
    <div className="gui-frame">
      <h2>hi</h2>
      {props.children}
    </div>
  );
};

const ScaleSlider = (props) => {
  const scaleValue = useContext(ScaleContext);

  return (
    <div className="slidecontainer">
      <label htmlFor="myRange">{props.label}</label>
      <input step={props.step} type="range" min={props.min} max={props.max} value={scaleValue.sliderValue} onChange={(event) => scaleValue.setSliderValue(event.target.value)} className="slider" id="myRange" />
    </div>
  )
}

const RecordGUI = () => {
  return (
    <GUIframe className="record-gui">
      <ScaleSlider step={1} label="Scale" min={1} max={100} />
    </GUIframe>
  )
}

const RecordContextProvider = (props) => {
  const [sliderValue, setSliderValue] = useState(50);
  return (
    <ScaleContext.Provider value={{ sliderValue, setSliderValue }}>
        {props.children}
        <RecordGUI />
    </ScaleContext.Provider>
  )
}


export { RecordContextProvider, RecordGUI, ScaleContext };