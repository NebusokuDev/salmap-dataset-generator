import {Container, Slider} from "@mantine/core";
import {BubbleView} from "../components/BubbleView.tsx";
import {useState} from "react";
import {MouseStokerCursor, MouseStoker, useMousePosition} from "../components/MouseStoker.tsx";

function Home() {
  const [blur, setBlur] = useState(40);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [items, setItems] = useState([]);
  const mousePosition = useMousePosition();

  return (
    <Container p={50}>
      <MouseStoker x={mousePosition.x} y={mousePosition.y} duration={0}>
        <MouseStokerCursor/>
      </MouseStoker>
      <p>pos x: {x}, pos y: {y}</p>
      <p>{clickCount}</p>
      <BubbleView
        onImageClick={(coordinates) => {
          setX(coordinates.x);
          setY(coordinates.y);
          setClickCount(prevState => prevState + 1)
          // setItems(prev => [...prev, coordinates])
        }}
        blurAmount={blur}
        imageSrc="/img/mayu.png"/>
      <Slider
        onChange={setBlur}
        color="blue"
        value={blur}
        min={20}
        max={100}
      />
      {/*{items.map((item) => ({item}))}*/}
    </Container>
  );
}

export {Home};