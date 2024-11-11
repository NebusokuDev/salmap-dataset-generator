import {Container, Slider} from "@mantine/core";
import {BubbleView} from "../components/BubbleView.tsx";
import {useState} from "react";

function Home() {
  const [blur, setBlur] = useState(40);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [items, setItems] = useState([]);

  return (
    <Container p={50}>
      <p>pos x: {x}, pos y: {y}</p>
      <BubbleView
        onImageClick={(coordinates) => {
          setX(coordinates.x);
          setY(coordinates.y);
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