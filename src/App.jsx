import { useState } from "react";
import "./App.css";
const apiUrl = import.meta.env.VITE_API_URL;


import io from "socket.io-client";
import Chat from "./Chat";
import {
  Card,
  Button,
  Form,
  Icon,
  Container,
  Header,
  Divider,
} from "semantic-ui-react";

const socket = io.connect('http://localhost:3001');
function App() {
  const [username, setUsername] = useState("");
  const room = "general";
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
 



  return (
    <div className="background-container">
    <Container >
          <Header  textAlign="center" as='h1' image='https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/265212056_2654708808007696_6941381469015663112_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeECd7QtBOeHL8x5jfSlZct0O1pyo1OgaBk7WnKjU6BoGT0jJLflagjb0zjHVD6CFeAJ26kFxhGn72HzRiCVdx1Q&_nc_ohc=MhPKiikqUEQQ7kNvgHYfLwE&_nc_ht=scontent-eze1-1.xx&oh=00_AYCXR-nZVBoe30by02KPe9D1g4QlZm5JvtUT1pky3s0MSA&oe=6656CC0A'  content='Caminando con jesus' />
          <Header textAlign="center"sub>una radio de la iglesia vision de futuro (seccional cordoba)</Header>
  <br />
  <br />
          <p> Bienvenidos a la radio con mas fe. Hicimos esta pagina para que nuestros oyentes puedan interactuar con nosotros en tiempo real y contarnos sus historias y/o pedirnos cadenas de oracion</p>
     
      {!showChat ? (
        <Card fluid >
          <Card.Content header="Unirme al chat" />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Nombre..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Field>
              <Button onClick={joinRoom}>Unirme</Button>
            </Form>
          </Card.Content>
        </Card>
      ) : (
       <Chat socket={socket} username={username} room={room} />
      )}
       <Header className="header" textAlign="center" as='h1' image='https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/265212056_2654708808007696_6941381469015663112_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeECd7QtBOeHL8x5jfSlZct0O1pyo1OgaBk7WnKjU6BoGT0jJLflagjb0zjHVD6CFeAJ26kFxhGn72HzRiCVdx1Q&_nc_ohc=MhPKiikqUEQQ7kNvgHYfLwE&_nc_ht=scontent-eze1-1.xx&oh=00_AYCXR-nZVBoe30by02KPe9D1g4QlZm5JvtUT1pky3s0MSA&oe=6656CC0A' content='Dejando legado...'  />
        
        <p>Cuando pases por las aguas, yo estaré contigo; y si por los rios, no te anegarán.Cuando pases por el fuego, no te quemaras, ni la llama arderá en ti. Isaias 43:2</p>
         
         <footer >@Iglesiavisiondefuturo</footer>
    </Container>
    </div>
    );
  
}

export default App;
